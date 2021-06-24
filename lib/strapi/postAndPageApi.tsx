import remark2rehype from "remark-rehype";
import { getDimensions, getPlaceholder } from "../images";
import visit from "unist-util-visit";
import unified from "unified";
import remarkParse from "remark-parse";
import remarkUnwrapImages from "remark-unwrap-images";
import { fetchAPI } from "./api";
import { Node } from "unist";
import { ImageElement } from "../../types/hast";
import {
  PostOrPage,
  PostOrPageData as PostOrPageData,
} from "../../types/postOrPage";
import remarkGfm from "remark-gfm";
import highlight from "rehype-highlight";
import mdastUtilToc from "mdast-util-toc";
import slug from "remark-slug";
import remark from "remark";
import u from "unist-builder";
import rehype from "rehype";
import { hastRemoveLiParagraph, removeTextNewlineNode } from "../unified";
import { Element } from "hast";

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
    .use(slug)
    .use(remark2rehype) // Converts to html processor
    .use(optimizeImages) // Prep the <img> to be "NextJS Image compatible"
    .use(highlight) // Highlight <pre> and <code> tags
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

  return { node, postOrPage: json, toc, coverImagePlaceholder };
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
          node.properties.placeholder = "blur";
          node.properties.blurDataURL = await getPlaceholder(
            node.properties.src
          );
        })()
      );
    });

    await Promise.allSettled(promises);

    return tree;
  };
};
