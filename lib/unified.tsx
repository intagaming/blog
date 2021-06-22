import { Node } from "unist";
import visit from "unist-util-visit";
import { Plugin } from "unified";
import { Element } from "hast";

// For the sake of *over*simplifying, I don't care about
//  TypeScript while working with unist (mostly).

export const hastRemoveLiParagraph: Plugin<[]> = () => {
  return (tree: Node) => {
    visit(tree, (node: Element, index, parent) => {
      // console.log(
      //   "tagName: " + node.tagName + "; parent.tagName: " + parent?.tagName
      // );
      if (node.tagName === "p" && parent?.tagName === "li") {
        console.log(node);
        [].splice.call(parent.children, index, 1, ...node.children);
      }
    });

    return tree;
  };
};
