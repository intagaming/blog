import Image from "next/image";
import PropTypes from "prop-types";

const AuthorAndBrief = ({ post, size }) => {
  const dateOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const date = new Date(post.published_at).toLocaleDateString(
    "en-US",
    dateOptions
  );
  const minuteRead = Math.ceil(post.content.split(/\s+/).length / 225);

  return (
    <div className="mt-6 flex gap-4">
      <div className={size == "sm" ? "w-12 h-12" : "w-14 h-14"}>
        {post.author && (
          <Image
            className="rounded-full"
            src={post.author.avatar.url}
            alt={post.author.avatar.alternativeText}
            width={post.author.avatar.width}
            height={post.author.avatar.height}
            layout={"responsive"}
          />
        )}
      </div>
      <div className="flex flex-col justify-center">
        <span className={"font-semibold"}>
          {post.author && post.author.fullName}
        </span>
        <span className={"text-gray-400 text-sm"}>
          {date} • {minuteRead} min read
        </span>
      </div>
    </div>
  );
};

AuthorAndBrief.propTypes = {
  post: PropTypes.object,
  size: PropTypes.oneOf(["sm", "md"]),
};

export default AuthorAndBrief;
