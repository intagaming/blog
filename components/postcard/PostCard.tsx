import Link from "next/link";
import Image from "next/image";
import AuthorAndBrief from "../common/AuthorAndBrief";
import { definitions } from "../../types/supabase";

type Props = {
  post: definitions["posts"];
  author: definitions["authors"];
  blurDataURL?: string;
};

const PostCard = ({ post, author, blurDataURL }: Props): JSX.Element => (
  <article>
    <Link href={`/${post.slug}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <div className="aspect-w-16 aspect-h-9">
          {blurDataURL ? (
            <Image
              className="rounded-sm object-cover"
              src={post.cover}
              alt=""
              layout="fill"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          ) : (
            <Image
              className="rounded-sm object-cover"
              src={post.cover}
              alt=""
              layout="fill"
            />
          )}
        </div>
        <h2 className="mt-6 text-xl font-bold">{post.title}</h2>
        <p className="mt-2 text-gray-500">{post.excerpt}</p>
      </a>
    </Link>
    <AuthorAndBrief postOrPage={post} size="sm" author={author} />
    <hr className="sm:hidden mt-12 border-gray-300" />
  </article>
);

export default PostCard;
