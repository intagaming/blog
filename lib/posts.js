import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import remark from "remark";
import remark2rehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { getDimensionsFromFile } from "./images";

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
 * This converts the *content* field from markdown to html.
 */
export function getPostHtmlBySlug(slug) {
  const { content: mdContent, data } = getPostBySlug(slug);
  const html = remark()
    .use(remark2rehype)
    .use(rehypeStringify)
    .processSync(mdContent)
    .toString();
  return { slug, html, data };
}

export function getAllPosts() {
  return getPostSlugs().map((slug) => getPostBySlug(slug));
}
