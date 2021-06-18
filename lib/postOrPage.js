import remark2rehype from "remark-rehype";
import { getDimensions } from "./images";
import visit from "unist-util-visit";
import unified from "unified";
import remarkParse from "remark-parse";
import remarkUnwrapImages from "remark-unwrap-images";
import { fetchAPI } from "./api";

export const getPostBySlug = async (slug) => {
  const postsJson = await fetchAPI(`/posts?slug=${slug}`);
  return postsJson[0] ?? null;
};

export const getPageBySlug = async (slug) => {
  const pagesJson = await fetchAPI(`/pages?slug=${slug}`);
  return pagesJson[0] ?? null;
};

export const getHtmlNodeFromMarkdown = async (markdown) => {
  // The only way to return a Node object is to get a Node and process it.
  let mdNode = unified().use(remarkParse).parse(markdown);

  // Process the node
  let htmlNode = await unified()
    .use(remarkUnwrapImages) // Unwrap the paragraph around the <img>
    .use(remark2rehype) // Converts to html processor
    .use(optimizeImages) // Prep the <img> to be "NextJS Image compatible"
    .run(mdNode); // Mdast -> Hast

  return htmlNode;
};

/*
 * This converts the *content* field from markdown to html node (hast).
 * Also returns the post data json.
 */
export const getPostNodeBySlug = async (slug) => {
  const json = await getPostBySlug(slug);
  if (!json) return null;
  const htmlNode = await getHtmlNodeFromMarkdown(json.content);
  return { slug, htmlNode, json };
};

export const getPageNodeBySlug = async (slug) => {
  const json = await getPageBySlug(slug);
  if (!json) return null;
  const htmlNode = await getHtmlNodeFromMarkdown(json.content);
  return { slug, htmlNode, json };
};

export const getAllPosts = async () => {
  return await fetchAPI("/posts");
};

export const getLatestPosts = async (n = 10) => {
  return await fetchAPI(`/posts?_sort=published_at:DESC&_limit=${n}`);
};

export const getAllPages = async () => {
  return await fetchAPI("/pages");
};

// Converts <img> to <Image> and assign width & height
const optimizeImages = () => {
  return async (tree) => {
    // We need a little trick to do this the async way,
    // although we could change the signature as well.
    // But then await multiple HTTP requests is faster.
    const promises = [];

    visit(tree, { tagName: "img" }, async (node) => {
      node.tagName = "Image";
      const getDimensionsPromise = getDimensions(node.properties.src);
      promises.push(getDimensionsPromise);
      node.imageDimensions = await getDimensionsPromise;
    });

    await Promise.allSettled(promises);

    return tree;
  };
};
