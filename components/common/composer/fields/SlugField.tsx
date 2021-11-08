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
          className="w-full text-black"
          type="text"
          {...register("slug")}
        />
        <button onClick={handleGenerateSlug} className="w-10 p-2 border-2">
          <RefreshIcon className="text-black" />
        </button>
      </div>
      <p>{errors.slug?.message}</p>
    </div>
  );
};

export default SlugField;
