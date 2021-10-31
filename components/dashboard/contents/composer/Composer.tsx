import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { definitions } from "../../../../types/supabase";
import { useAuthUser } from "../../../../hooks/auth/useAuthUser";
import Editor from "rich-markdown-editor";
import ImagePicker from "./ImagePicker";

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

const Composer = ({ post, onCommit }: Props): JSX.Element => {
  const user = useAuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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

  const handleUploadImage = async () => {
    // TODO
    return "https://placekitten.com/300/200";
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">Composer</h2>

      <div className="form">
        <label htmlFor="title">Title</label>
        <input type="text" {...register("title")} />
        <p>{errors.title?.message}</p>

        <label htmlFor="slug">Slug</label>
        <input type="text" {...register("slug")} />
        <p>{errors.slug?.message}</p>

        <label htmlFor="excerpt">Excerpt</label>
        <textarea rows={4} cols={50} {...register("excerpt")} />
        <p>{errors.excerpt?.message}</p>

        <label htmlFor="cover">Cover</label>
        <ImagePicker
          initialFile={post?.cover}
          onChange={(fileName) => setValue("cover", fileName)}
        />
        <p>{errors.cover?.message}</p>

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

        <button onClick={handleSubmit(submit)}> Submit</button>
      </div>
    </div>
  );
};

export default Composer;
