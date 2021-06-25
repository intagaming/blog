/* eslint-disable no-param-reassign */
import { Node } from "unist";
import visit from "unist-util-visit";
import { Plugin } from "unified";
import { Element } from "hast";
import { getDimensions, getPlaceholder } from "./images";
import { ImageElement } from "../types/hast";

// For the sake of *over*simplifying, I don't care about
//  TypeScript while working with unist (mostly).

export const hastRemoveLiParagraph: Plugin<[]> = () => (tree: Node) => {
  visit(tree, (node, index, parent) => {
    // console.log(
    //   "tagName: " + node.tagName + "; parent.tagName: " + parent?.tagName
    // );
    if (node.tagName === "p" && parent?.tagName === "li") {
      [].splice.call(parent.children, index, 1, ...(node as Element).children);
    }
  });

  return tree;
};

export const removeTextNewlineNode: Plugin<[]> = () => (tree: Node) => {
  visit(tree, (node, index, parent) => {
    if (node.type === "text" && node.value === "\n") {
      [].splice.call(parent.children, index, 1);
      return index;
    }
    return visit.CONTINUE; // For typescript sake
  });

  return tree;
};

// Converts <img> to <Image> and assign width & height
export const optimizeImages = () => async (tree: Node) => {
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
