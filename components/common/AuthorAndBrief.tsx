import Image from "next/image";
import { PostOrPage } from "../../types/postOrPage";
import useAuthorQuery from "../../hooks/supabase/author/useAuthorQuery";
import { getObjectUrl } from "../../utils/supabase";
import { base64ImagePlaceholder } from "../../utils/general";
import Skeleton from "react-loading-skeleton";

type Props = {
  postOrPage: PostOrPage;
  size?: "sm" | "md";
};

const AuthorAndBrief = ({ postOrPage, size }: Props): JSX.Element => {
  const { data: author, isLoading } = useAuthorQuery(postOrPage.user_id);

  const date = new Date(postOrPage.published_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const minuteRead = Math.ceil(postOrPage.content.split(/\s+/).length / 145);

  return (
    <div className="mt-6 flex gap-4">
      <div className={`relative ${size === "sm" ? "w-12 h-12" : "w-14 h-14"}`}>
        {!author && isLoading && <Skeleton className="rounded-full" />}
        {author && (
          <Image
            className="rounded-full"
            src={
              author.avatar
                ? getObjectUrl(author.avatar)
                : base64ImagePlaceholder
            }
            alt=""
            layout="fill"
          />
        )}
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-semibold">
          {!author && isLoading && <Skeleton />}
          {author && (author.fullName ?? "Mysterious Author")}
        </span>
        <span className="text-gray-400 text-sm">
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
