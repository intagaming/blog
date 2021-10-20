import remark2rehype from "remark-rehype";
import unified from "unified";
import remarkParse from "remark-parse";
import remarkUnwrapImages from "remark-unwrap-images";
import { Node } from "unist";
import remarkGfm from "remark-gfm";
import highlight from "rehype-highlight";
import mdastUtilToc from "mdast-util-toc";
import remarkSlug from "remark-slug";
import remark from "remark";
import u from "unist-builder";
import rehype from "rehype";
import { Element } from "hast";
import {
  imageCaptionParagraphToDiv,
  hastRemoveLiParagraph,
  optimizeImages,
  removeTextNewlineNode
} from "../unified";
import { PostOrPage, PostOrPageData } from "../../types/postOrPage";
import { fetchAPI } from "./api";
import { getPlaceholder } from "../images";

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
    .use(remarkSlug)
    .use(remark2rehype) // Converts to html processor
    .use(optimizeImages) // Prep the <img> to be "NextJS Image compatible"
    .use(highlight) // Highlight <pre> and <code> tags
    .use(imageCaptionParagraphToDiv) // Convert <p> to <div> if it has an <Image> inside
    .run(mdNode); // Mdast -> Hast

  return htmlNode;
};

/**
 * @param markdown Markdown string
 * @returns Table of Contents
 */
const getTocHastFromMarkdown = async (markdown: string): Promise<Element> => {
  const mdNode = unified().use(remarkParse).use(remarkGfm).parse(markdown);
  const tocResult = mdastUtilToc(mdNode);
  const newMdast = await remark().run(u("root", tocResult.map));
  const toc = rehype()
    .data("settings", {
      fragment: true,
    })
    .use(remark2rehype)
    .use(hastRemoveLiParagraph)
    .use(removeTextNewlineNode)
    .runSync(newMdast) as Element;

  return toc;
};

/*
 * This converts the *content* field from markdown to html node (hast).
 * Also returns the post data json.
 */
export const getPostDataBySlug = async (
  slug: string
): Promise<PostOrPageData | null> => {
  const json = await getPostBySlug(slug);
  if (!json) return null;
  const node = await getHtmlNodeFromMarkdown(json.content);
  const toc = await getTocHastFromMarkdown(json.content);
  const coverImagePlaceholder = await getPlaceholder(json.cover.url);

  return {
    node,
    postOrPage: json,
    toc,
    coverImagePlaceholder,
  };
};

export const getPageDataBySlug = async (
  slug: string
): Promise<PostOrPageData | null> => {
  const json = await getPageBySlug(slug);
  if (!json) return null;
  const node = await getHtmlNodeFromMarkdown(json.content);
  const toc = await getTocHastFromMarkdown(json.content);

  return { node, postOrPage: json, toc };
};

export const getAllPosts = async (): Promise<PostOrPage[] | null> =>
  fetchAPI("/posts");

export const getLatestPosts = async (n = 10): Promise<PostOrPage[] | null> =>
  fetchAPI(`/posts?_sort=published_at:DESC&_limit=${n}`);

export const getAllPages = async (): Promise<PostOrPage[] | null> =>
  fetchAPI("/pages");
