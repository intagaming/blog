import { Element } from "hast";
import visit from "unist-util-visit";
import { is } from "unist-util-is";

export type TocMapping = {
  [key: string]: {
    parent: string | undefined;
    last: string | undefined;
  };
};

// Generate ToC mapping (maps id of <h?> tags to their
// parent's id to highlight when they show on the screen)
export const getTocMapping = (toc: Element): TocMapping => {
  const tocMapping = {};

  const getLiId = (li: Element): string | undefined => {
    const child = li.children.find(
      (c) => c.type === "element" && c.tagName === "a");
    if (!child || !is<Element>(child, "element")) {
      return undefined;
    }
    return (child.properties as { href: string }).href.slice(1);
  };

  let lastLiId;

  visit(toc, (node: Element, _, parent) => {
    if (node.tagName === "ul") {
      const id =
        is<Element>(parent, "element") && parent?.tagName === "li" ? getLiId(
          parent as Element) : undefined;
      // We got the parent id. Find all children id and
      // map those to the parent id.
      node.children.forEach((li: Element) => {
        const liId = getLiId(li);
        if (!liId) {
          throw new Error(
            "Cannot find liId. Might be missing an <a/> tag in <li/> tag."
          );
        }
        tocMapping[liId] = {
          parent: id,
          last: tocMapping[liId]?.last ?? undefined
        };
      });
      return;
    }
    if (node.tagName === "li") {
      const liId = getLiId(node);
      tocMapping[liId] = {
        parent: tocMapping[liId]?.parent ?? undefined,
        last: lastLiId
      };
      lastLiId = liId;
    }
  });

  return tocMapping;
};
