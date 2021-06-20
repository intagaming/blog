import remark2rehype from "remark-rehype";
import { getDimensions } from "../images";
import visit from "unist-util-visit";
import unified from "unified";
import remarkParse from "remark-parse";
import remarkUnwrapImages from "remark-unwrap-images";
import { fetchAPI } from "./api";
import { Node } from "unist";
import { ImageElement } from "../../types/hast";
import { PostOrPage, PostOrPageWithNode } from "../../types/postOrPage";
import remarkGfm from "remark-gfm";

export const getPostBySlug = async (
  slug: string
): Promise<PostOrPage | null> => {
  const postsJson = await fetchAPI(`/posts?slug=${slug}`);
  return postsJson[0] ?? null;
};

export const getPageBySlug = async (
  slug: string
): Promise<PostOrPage | null> => {
  const pagesJson = await fetchAPI(`/pages?slug=${slug}`);
  return pagesJson[0] ?? null;
};

export const getHtmlNodeFromMarkdown = async (
  markdown: string
): Promise<Node> => {
  // The only way to return a Node object is to get a Node and process it.
  const mdNode = unified().use(remarkParse).use(remarkGfm).parse(markdown);

  // Process the node
  const htmlNode = await unified()
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
export const getPostWithHtmlNodeBySlug = async (
  slug: string
): Promise<PostOrPageWithNode | null> => {
  const json = await getPostBySlug(slug);
  if (!json) return null;
  const node = await getHtmlNodeFromMarkdown(json.content);
  return { node, postOrPage: json };
};

export const getPageWithHtmlNodeBySlug = async (
  slug: string
): Promise<PostOrPageWithNode | null> => {
  const json = await getPageBySlug(slug);
  if (!json) return null;
  const node = await getHtmlNodeFromMarkdown(json.content);
  return { node, postOrPage: json };
};

export const getAllPosts = async (): Promise<PostOrPage[] | null> => {
  return await fetchAPI("/posts");
};

export const getLatestPosts = async (n = 10): Promise<PostOrPage[] | null> => {
  return await fetchAPI(`/posts?_sort=published_at:DESC&_limit=${n}`);
};

export const getAllPages = async (): Promise<PostOrPage[] | null> => {
  return await fetchAPI("/pages");
};

// Converts <img> to <Image> and assign width & height
const optimizeImages = () => {
  return async (tree: Node) => {
    // We need a little trick to do this the async way,
    // although we could change the signature as well.
    // But then await multiple HTTP requests is faster.
    const promises = [];

    visit(tree, { tagName: "img" }, (node: ImageElement) => {
      promises.push(
        (async () => {
          node.tagName = "Image";
          node.imageDimensions = await getDimensions(node.properties.src);
        })()
      );
    });

    await Promise.allSettled(promises);

    return tree;
  };
};
