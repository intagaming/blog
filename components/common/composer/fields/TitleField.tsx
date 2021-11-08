import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const TitleField = ({ register, errors }: Props): JSX.Element => {
  return (
    <div className="field flex-1">
      <label htmlFor="title">Title</label>
      <input type="text" {...register("title")} />
      <p>{errors.title?.message}</p>
    </div>
  );
};

export default TitleField;
