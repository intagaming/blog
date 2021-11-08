import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { definitions } from "../../../../types/supabase";
import { useAuthUser } from "../../../../hooks/auth/useAuthUser";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import slugify from "slugify";
import useUploadObjectMutation from "../../../../hooks/supabase/storage/useUploadObjectMutation";
import { getObjectUrl } from "../../../../utils/supabase";
import { useRouter } from "next/router";
import Modal from "../../../dialog/Modal";
import useTogglePublishPageMutation from "../../../../hooks/supabase/page/useTogglePublishPageMutation";
import { pagesKey } from "../../../../hooks/supabase/page/usePagesQuery";
import useDeletePageMutation from "../../../../hooks/supabase/page/useDeletePageMutation";
import TitleField from "../../../common/composer/fields/TitleField";
import SlugField from "../../../common/composer/fields/SlugField";
import ContentField from "../../../common/composer/fields/ContentField";

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
    <div className="flex flex-col gap-2 md:px-20 md:py-4">
      <h2 className="text-xl">Composer</h2>

      <div className="form">
        {page && (
          <div className="flex gap-3">
            <button
              className="bg-red-700 text-dark-white p-2"
              onClick={handleDeletePageClick}
            >
              Delete page
            </button>
            <button
              className="bg-indigo-700 text-dark-white p-2"
              onClick={togglePublish}
            >
              {published ? "Hide page" : "Publish"}
            </button>
          </div>
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

        <div className="flex flex-col md:flex-row justify-between gap-3">
          <TitleField register={register} errors={errors} />

          <SlugField
            register={register}
            errors={errors}
            handleGenerateSlug={handleGenerateSlug}
          />
        </div>

        <ContentField
          errors={errors}
          handleUploadImage={handleUploadImage}
          setValue={setValue}
          defaultValue={page?.content}
        />

        <button
          className="bg-indigo-700 text-dark-white p-2"
          onClick={handleSubmit(submit)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PageComposer;
