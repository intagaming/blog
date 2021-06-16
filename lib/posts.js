import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import remark2rehype from "remark-rehype";
import { getDimensions, getDimensionsFromFile } from "./images";
import visit from "unist-util-visit";
import unified from "unified";
import remarkParse from "remark-parse";
import remarkUnwrapImages from "remark-unwrap-images";

const postDir = join(process.cwd(), "_posts/blog");

export function getPostSlugs() {
  return fs.readdirSync(postDir).map((s) => s.replace(/\.md/, ""));
}

/*
 * Returns Markdown as content.
 */
export function getPostBySlug(slug) {
  const postPath = join(postDir, `${slug}.md`);
  const fileContents = fs.readFileSync(postPath);
  const { data, content } = matter(fileContents);

  // get image dimensions for NextJS image optimizations
  // TODO test the optimization on production. Currently
  //  can't get the download image size down on smaller
  //  viewport.
  // FIXME this if check doesn't make sense; the *data*
  //  is cached somehow. The NextJS calls this function twice.
  if (typeof data.thumbnail !== "object") {
    const thumbnailDimensions = getDimensionsFromFile(data.thumbnail);
    data.thumbnail = {
      url: data.thumbnail,
      dimensions: thumbnailDimensions,
    };
  }

  // Might parse the content of _data_, but works for now.
  return {
    slug,
    content,
    data,
  };
}

/*
 * This converts the *content* field from markdown to html node (hast).
 */
export function getPostNodeBySlug(slug) {
  const { content: mdContent, data } = getPostBySlug(slug);

  // The only way to return a Node object is to get a Node and process it.
  let mdNode = unified().use(remarkParse).parse(mdContent);

  // Process the node
  let htmlNode = unified()
    .use(remarkUnwrapImages) // Unwrap the paragraph around the <img>
    .use(remark2rehype) // Converts to html processor
    .use(optimizeImages) // Prep the <img> to be "NextJS Image compatible"
    .runSync(mdNode); // Mdast -> Hast

  return { slug, htmlNode, data };
}

export function getAllPosts() {
  return getPostSlugs().map((slug) => getPostBySlug(slug));
}

// Converts <img> to <Image> and assign width & height
const optimizeImages = () => {
  return (tree) => {
    visit(tree, { tagName: "img" }, (node) => {
      node.tagName = "Image";
      node.imageDimensions = getDimensions(node.properties.src);
    });

    return tree;
  };
};
