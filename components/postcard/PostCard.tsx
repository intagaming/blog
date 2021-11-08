import Link from "next/link";
import Image from "next/image";
import AuthorAndBrief from "../common/AuthorAndBrief";
import { definitions } from "../../types/supabase";

type Props = {
  post: definitions["posts"];
  author: definitions["authors"];
  blurDataURL?: string;
  isLatestBlog?: boolean;
};

const PostCard = ({
  post,
  author,
  blurDataURL,
  isLatestBlog,
}: Props): JSX.Element => (
  <>
    {isLatestBlog ? (
      <article className="shadow-md rounded-md dark:bg-dark-level-1 col-span-full flex flex-col justify-between sm:flex-row">
        <div className="sm:flex-1 lg:flex-[2]">
          <Link href={`/${post.slug}`}>
            <a>
              <div className="relative aspect-w-16 aspect-h-9 sm:aspect-w-3 sm:aspect-h-4 md:aspect-w-1 md:aspect-h-1 lg:aspect-w-16 lg:aspect-h-9">
                {blurDataURL ? (
                  <Image
                    className="rounded-md object-cover"
                    src={post.cover}
                    alt=""
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                ) : (
                  <Image
                    className="rounded-md object-cover"
                    src={post.cover}
                    alt=""
                    layout="fill"
                  />
                )}
              </div>
            </a>
          </Link>
        </div>

        <div className="px-6 pt-6 sm:pt-0 sm:flex-1 sm:flex sm:flex-col sm:justify-center sm:gap-6">
          <Link href={`/${post.slug}`}>
            <a>
              <span className="text-sm px-2 py-1 bg-primary text-dark-white rounded-sm">
                New
              </span>
              <h2 className="mt-3 text-xl font-bold text-black dark:text-white lg:text-2xl">
                {post.title}
              </h2>
              <p className="mt-3 text-gray-500 dark:text-gray-400">
                {post.excerpt}
              </p>
            </a>
          </Link>
          <div className="mt-6 pb-6 sm:mt-0 sm:pb-0">
            <AuthorAndBrief postOrPage={post} size="sm" author={author} />
          </div>
        </div>
      </article>
    ) : (
      <article className="shadow-md rounded-md dark:bg-dark-level-1 flex flex-col justify-between">
        <Link href={`/${post.slug}`}>
          <a>
            <div className="relative aspect-w-16 aspect-h-9">
              {blurDataURL ? (
                <Image
                  className="rounded-md object-cover"
                  src={post.cover}
                  alt=""
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              ) : (
                <Image
                  className="rounded-md object-cover"
                  src={post.cover}
                  alt=""
                  layout="fill"
                />
              )}
            </div>
            <div className="px-6 mt-6">
              <h2 className="text-xl font-bold text-black dark:text-white">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {post.excerpt}
              </p>
            </div>
          </a>
        </Link>
        <div className="mt-6 px-6 pb-6">
          <AuthorAndBrief postOrPage={post} size="sm" author={author} />
        </div>
      </article>
    )}
  </>
);

export default PostCard;
