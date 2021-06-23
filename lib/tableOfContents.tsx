import { Element } from "hast";
import visit from "unist-util-visit";

export type TocMapping = {
  [key: string]: {
    parent: string | undefined;
    last: string | undefined;
  };
};

// Generate ToC mapping (maps id of <h?> tags to their
// parent's id to highlight when they show on the screen)
// TODO we need an ordered mapping to activate when we scroll backwards
export const getTocMapping = (toc: Element): TocMapping => {
  const tocMapping = {};

  const getLiId = (li: Element): string | undefined => {
    for (const child of li.children as Element[]) {
      if (child.tagName === "a") {
        return (child.properties.href as string).slice(1);
      }
    }
    return undefined;
  };

  let lastLiId = undefined;

  visit(toc, (node: Element, _, parent) => {
    if (node.tagName === "ul") {
      const id =
        parent?.tagName === "li" ? getLiId(parent as Element) : undefined;
      // We got the parent id. Find all children id and
      // map those to the parent id.
      for (const li of node.children as Element[]) {
        const liId = getLiId(li);
        if (!liId) {
          console.error("Cannot find liId. Skipping.");
          continue;
        }
        tocMapping[liId] = {
          parent: id,
          last: tocMapping[liId]?.last ?? undefined,
        };
      }
      return;
    }
    if (node.tagName === "li") {
      const liId = getLiId(node);
      tocMapping[liId] = {
        parent: tocMapping[liId]?.parent ?? undefined,
        last: lastLiId,
      };
      lastLiId = liId;
    }
  });

  return tocMapping;
};
