import visit from "unist-util-visit";
import { Plugin } from "unified";
import { Element, Text } from "hast";
import { getDimensions, getPlaceholder } from "./images";
import { ImageElement } from "../types/hast";
import { is } from "unist-util-is";

export const hastRemoveLiParagraph: Plugin<[]> = () => (tree) => {
  visit<Element>(tree, "element", (node, index, parent) => {
    if (node.tagName === "p" && is<Element>(parent, "element") &&
      parent?.tagName === "li") {
      parent.children.splice(index, 1, ...(node as Element).children);
    }
  });

  return tree;
};

export const removeTextNewlineNode: Plugin<[]> = () => (tree) => {
  visit<Text>(tree, "text", (node, index, parent) => {
    if (node.value === "\n") {
      parent.children.splice(index, 1);
      return index;
    }
    return visit.CONTINUE; // For typescript sake
  });

  return tree;
};

// Converts <img> to <Image> and assign width & height
export const optimizeImages: Plugin<[]> = () => async (tree) => {
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
        node.properties.blurDataURL = await getPlaceholder(node.properties.src);
      })()
    );
  });

  await Promise.allSettled(promises);

  return tree;
};

/**
 * This converts any <p> that has an <Image> inside to a <div>.
 */
export const imageCaptionParagraphToDiv: Plugin<[]> = () => async (tree) => {
  visit<Element>(tree, { tagName: "p" }, (node) => {
    const hasDiv = node.children.some(
      (c) => c.type === "element" && c.tagName === "Image");

    if (hasDiv) { // If <p> tag has a div
      // Convert this <p> tag to a div
      node.tagName = "div";
    }
  });

  return tree;
};
