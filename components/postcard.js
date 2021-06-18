import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import remark from "remark";
import find from "unist-util-find";
import AuthorAndBrief from "./authorAndBrief";

const PostCard = ({ post }) => {
  let excerpt;
  remark()
    .use(() => {
      return (tree) => {
        excerpt = find(tree, { type: "paragraph" }).children[0].value ?? "abc";
      };
    })
    .processSync(post.content);

  return (
    <article>
      <Link href={"/" + post.slug}>
        <div className="cursor-pointer">
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
        </div>
      </Link>
      <AuthorAndBrief post={post} size="sm" />
      <hr className="sm:hidden mt-12" />
    </article>
  );
};

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
