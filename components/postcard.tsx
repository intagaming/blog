import Link from "next/link";
import Image from "next/image";
import remark from "remark";
import find from "unist-util-find";
import AuthorAndBrief from "./authorAndBrief";
import { PostOrPage } from "../types/postOrPage";

type Props = {
  post: PostOrPage;
};

const PostCard = ({ post }: Props): JSX.Element => {
  let excerpt: string;
  remark()
    .use(() => {
      return (tree) => {
        excerpt = find(tree, { type: "paragraph" }).children[0].value ?? "";
      };
    })
    .processSync(post.content);

  if (excerpt.length > 120) {
    excerpt = excerpt.substring(0, 120) + "...";
  }

  return (
    <article>
      <Link href={"/" + post.slug}>
        <a>
          <div className="aspect-w-3 aspect-h-2">
            <Image
              className="rounded-sm object-cover"
              src={post.cover.url}
              alt={post.cover.alternativeText}
              layout={"fill"}
            />
          </div>
          <h2 className="mt-6 text-xl font-bold">{post.title}</h2>
          <p className="mt-2 text-gray-500">{excerpt}</p>
        </a>
      </Link>
      <AuthorAndBrief post={post} size="sm" />
      <hr className="sm:hidden mt-12" />
    </article>
  );
};

export default PostCard;
