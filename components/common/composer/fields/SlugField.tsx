import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RefreshIcon } from "@heroicons/react/solid";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  handleGenerateSlug: () => void;
}

const SlugField = ({
  register,
  errors,
  handleGenerateSlug,
}: Props): JSX.Element => {
  return (
    <div className="field flex-1">
      <label htmlFor="slug">Slug</label>
      <div className="flex w-full bg-white">
        <input
          className="w-full text-black field-input"
          type="text"
          {...register("slug")}
        />
        <button
          onClick={handleGenerateSlug}
          className="w-10 p-2 border dark:bg-surface-gray dark:text-dark-white"
        >
          <RefreshIcon />
        </button>
      </div>
      <p>{errors.slug?.message}</p>
    </div>
  );
};

export default SlugField;
