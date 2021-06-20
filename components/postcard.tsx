import Link from "next/link";
import Image from "next/image";
import AuthorAndBrief from "./authorAndBrief";
import { PostOrPage } from "../types/postOrPage";
import { getPostExcerpt } from "../lib/postOrPage";

type Props = {
  post: PostOrPage;
};

const PostCard = ({ post }: Props): JSX.Element => {
  const excerpt = getPostExcerpt(post);

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
