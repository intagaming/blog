import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { definitions } from "../../../../types/supabase";
import { useAuthUser } from "../../../../hooks/auth/useAuthUser";
import Editor from "rich-markdown-editor";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import slugify from "slugify";
import { RefreshIcon } from "@heroicons/react/solid";
import useUploadObjectMutation from "../../../../hooks/supabase/storage/useUploadObjectMutation";
import { getObjectUrl } from "../../../../utils/supabase";
import { useRouter } from "next/router";
import Modal from "../../../dialog/Modal";
import useTogglePublishPageMutation from "../../../../hooks/supabase/page/useTogglePublishPageMutation";
import { pagesKey } from "../../../../hooks/supabase/page/usePagesQuery";
import useDeletePageMutation from "../../../../hooks/supabase/page/useDeletePageMutation";

interface IFormInputs {
  title: string;
  slug: string;
  content: string;
}

const schema = yup.object({
  title: yup.string().required(),
  slug: yup.string().required(),
  content: yup.string().required(),
});

export type ComposedPage = Omit<definitions["pages"], "id"> & { id?: number };

interface Props {
  page?: definitions["pages"];
  onCommit: (composedPage: ComposedPage) => void;
}

const PageComposer = ({ page, onCommit }: Props): JSX.Element => {
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
      title: page?.title,
      slug: page?.slug,
      content: page?.content,
    },
  });

  const editorRef = useRef<Editor>();

  const submit: SubmitHandler<IFormInputs> = (data) => {
    const composedPage: ComposedPage = {
      ...(page ?? { user_id: user.id }),
      ...data,
    };
    onCommit(composedPage);
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

  const published: boolean = !!page?.published_at;
  const togglePublishPageMutation = useTogglePublishPageMutation();
  const queryClient = useQueryClient();
  const togglePublish = () => {
    if (!page) return; // If composing new page

    toast
      .promise(
        togglePublishPageMutation.mutateAsync({
          pageId: page.id,
          publish: !published,
        }),
        {
          loading: published ? "Hiding page..." : "Publishing...",
          success: published ? "Page has been taken down." : "Published.",
          error: (e: Error) => e.message,
        }
      )
      .then(() => {
        queryClient.invalidateQueries(pagesKey.all);
      });
  };

  const title = watch("title");
  const handleGenerateSlug = () => {
    setValue("slug", slugify(title, { lower: true }));
  };

  const [showDeleteModal, setShowDeleteModel] = useState<boolean>(false);
  const handleDeletePageClick = () => {
    setShowDeleteModel(true);
  };
  const handleDeleteModalCancel = () => {
    setShowDeleteModel(false);
  };

  const deletePageMutation = useDeletePageMutation();
  const router = useRouter();
  const handleDeletePage = () => {
    if (!page) return;
    toast
      .promise(deletePageMutation.mutateAsync(page.id), {
        loading: "Deleting page...",
        success: "Page deleted.",
        error: (e: Error) => e.message,
      })
      .then(() => {
        queryClient.invalidateQueries(pagesKey.all);
        router.push("/dashboard/pages");
      });
  };
  const handleDeleteModalOk = () => {
    setShowDeleteModel(false);
    handleDeletePage();
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">Composer</h2>

      <div className="form">
        {page && (
          <button className="bg-red-700 p-2" onClick={handleDeletePageClick}>
            Delete page
          </button>
        )}
        {showDeleteModal && page && (
          <Modal
            title="Delete page"
            content={`Do you really want to delete "${page.title}"?`}
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

        {page && (
          <>
            <p>This page is {published ? "published" : "not published"}.</p>
            <button className="bg-indigo-700 p-2" onClick={togglePublish}>
              {published ? "Hide page" : "Publish"}
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
              defaultValue={page?.content}
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

export default PageComposer;
