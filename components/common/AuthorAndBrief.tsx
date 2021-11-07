import Image from "next/image";
import { PostOrPage } from "../../types/postOrPage";
import { base64ImagePlaceholder } from "../../utils/general";
import { definitions } from "../../types/supabase";

type Props = {
  postOrPage: PostOrPage;
  size?: "sm" | "md";
  author: definitions["authors"];
};

const AuthorAndBrief = ({ postOrPage, size, author }: Props): JSX.Element => {
  const date = new Date(postOrPage.published_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const minuteRead = Math.ceil(postOrPage.content.split(/\s+/).length / 145);

  return (
    <div
      className="mt-6 flex items-center gap-4"
      data-testid="author-and-brief"
    >
      <div className={`relative ${size === "sm" ? "w-12 h-12" : "w-14 h-14"}`}>
        <Image
          className="rounded-full"
          src={author.avatar ?? base64ImagePlaceholder}
          alt=""
          layout="fill"
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-black dark:text-white font-semibold">
          {author.fullName ?? "Mysterious Author"}
        </span>
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {date} • {minuteRead} min read
        </span>
      </div>
    </div>
  );
};

AuthorAndBrief.defaultProps = {
  size: "sm",
};

export default AuthorAndBrief;
