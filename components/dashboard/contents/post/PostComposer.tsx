import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { definitions } from "../../../../types/supabase";
import { useAuthUser } from "../../../../hooks/auth/useAuthUser";
import Editor from "rich-markdown-editor";
import ImagePicker from "./ImagePicker";
import useTogglePublishPostMutation from "../../../../hooks/supabase/post/useTogglePublishPostMutation";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { postsKey } from "../../../../hooks/supabase/post/usePostsQuery";
import slugify from "slugify";
import { RefreshIcon } from "@heroicons/react/solid";
import useUploadObjectMutation from "../../../../hooks/supabase/storage/useUploadObjectMutation";
import { getObjectUrl } from "../../../../utils/supabase";
import useDeletePostMutation from "../../../../hooks/supabase/post/useDeletePostMutation";
import { useRouter } from "next/router";
import Modal from "../../../dialog/Modal";

interface IFormInputs {
  title: string;
  slug: string;
  excerpt: string;
  cover: string;
  content: string;
}

const schema = yup.object({
  title: yup.string().required(),
  slug: yup.string().required(),
  excerpt: yup.string().required(),
  cover: yup.string().required(),
  content: yup.string().required(),
});

export type ComposedPost = Omit<definitions["posts"], "id"> & { id?: number };

interface Props {
  post?: definitions["posts"];
  onCommit: (composedPost: ComposedPost) => void;
}

const PostComposer = ({ post, onCommit }: Props): JSX.Element => {
  const user = useAuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: post?.title,
      slug: post?.slug,
      excerpt: post?.excerpt,
      cover: post?.cover,
      content: post?.content,
    },
  });

  const editorRef = useRef<Editor>();

  const submit: SubmitHandler<IFormInputs> = (data) => {
    const composedPost: ComposedPost = {
      ...(post ?? { user_id: user.id }),
      ...data,
    };
    onCommit(composedPost);
  };

  const uploadObjectMutation = useUploadObjectMutation();
  const handleUploadImage = async (fileToUpload: File) => {
    const uploadPromise = uploadObjectMutation.mutateAsync(fileToUpload);
    await toast.promise(uploadPromise, {
      loading: "Uploading...",
      success: "Upload complete.",
      error: (e) => e.message,
    });
    return getObjectUrl(`${user.id}/${fileToUpload.name}`);
  };

  const published: boolean = !!post?.published_at;
  const togglePublishPostMutation = useTogglePublishPostMutation();
  const queryClient = useQueryClient();
  const togglePublish = () => {
    if (!post) return; // If composing new post

    toast
      .promise(
        togglePublishPostMutation.mutateAsync({
          postId: post.id,
          publish: !published,
        }),
        {
          loading: published ? "Hiding post..." : "Publishing...",
          success: published ? "Post has been taken down." : "Published.",
          error: (e: Error) => e.message,
        }
      )
      .then(() => {
        queryClient.invalidateQueries(postsKey.all);
      });
  };

  const title = watch("title");
  const handleGenerateSlug = () => {
    setValue("slug", slugify(title, { lower: true }));
  };

  const [showDeleteModal, setShowDeleteModel] = useState<boolean>(false);
  const handleDeletePostClick = () => {
    setShowDeleteModel(true);
  };
  const handleDeleteModalCancel = () => {
    setShowDeleteModel(false);
  };

  const deletePostMutation = useDeletePostMutation();
  const router = useRouter();
  const handleDeletePost = () => {
    if (!post) return;
    toast
      .promise(deletePostMutation.mutateAsync(post.id), {
        loading: "Deleting post...",
        success: "Post deleted.",
        error: (e: Error) => e.message,
      })
      .then(() => {
        queryClient.invalidateQueries(postsKey.all);
        router.push("/dashboard/posts");
      });
  };
  const handleDeleteModalOk = () => {
    setShowDeleteModel(false);
    handleDeletePost();
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">Composer</h2>

      <div className="form">
        {post && (
          <button className="bg-red-700 p-2" onClick={handleDeletePostClick}>
            Delete post
          </button>
        )}
        {showDeleteModal && post && (
          <Modal
            title="Delete post"
            content={`Do you really want to delete "${post.title}"?`}
            okString="Delete"
            onCancel={handleDeleteModalCancel}
            onOk={handleDeleteModalOk}
            okClassNames="bg-red-300"
          />
        )}

        <div className="field">
          <label htmlFor="title">Title</label>
          <input type="text" {...register("title")} />
          <p>{errors.title?.message}</p>
        </div>

        {post && (
          <>
            <p>This post is {published ? "published" : "not published"}.</p>
            <button className="bg-indigo-700 p-2" onClick={togglePublish}>
              {published ? "Hide post" : "Publish"}
            </button>
          </>
        )}

        <div className="field">
          <label htmlFor="slug">Slug</label>
          <div className="flex w-full bg-white">
            <input
              className="w-full text-black"
              type="text"
              {...register("slug")}
            />
            <button onClick={handleGenerateSlug} className="w-10 p-2">
              <RefreshIcon className="text-black" />
            </button>
          </div>
          <p>{errors.slug?.message}</p>
        </div>

        <div className="field">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea rows={4} cols={50} {...register("excerpt")} />
          <p>{errors.excerpt?.message}</p>
        </div>

        <div className="field">
          <label>Cover</label>
          <ImagePicker
            initialFile={post?.cover}
            onChange={(fileName) => setValue("cover", fileName)}
          />
          <p>{errors.cover?.message}</p>
        </div>

        <div className="field">
          <label htmlFor="content">Content</label>
          <div
            className="h-[80vh] bg-white overflow-auto"
            onClick={(e) => {
              if (e.target !== e.currentTarget) return;
              // When clicking the background of this div, focus editor at the end.
              editorRef.current.focusAtEnd();
            }}
          >
            <Editor
              ref={editorRef}
              defaultValue={post?.content}
              uploadImage={handleUploadImage}
              onChange={(getFn) => setValue("content", getFn())}
            />
          </div>
          <p>{errors.content?.message}</p>
        </div>

        <button className="bg-indigo-700 p-2" onClick={handleSubmit(submit)}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PostComposer;
