import remark from "remark";
import find from "unist-util-find";
import { PostOrPage } from "../types/postOrPage";

export const getPostExcerpt = (post: PostOrPage): string | null => {
  let excerpt: string = null;

  remark()
    .use(() => {
      return (tree) => {
        excerpt = find(tree, { type: "paragraph" }).children[0].value ?? "";
      };
    })
    .processSync(post.content);

  if (!excerpt) return null;

  if (excerpt.length > 120) {
    excerpt = excerpt.substring(0, 120) + "...";
  }

  return excerpt;
};
