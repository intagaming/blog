import React, { useRef } from "react";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Editor from "rich-markdown-editor";
import { removeTrailingBackslash } from "../../../../utils/general";
import light, { dark } from "rich-markdown-editor/dist/styles/theme";
import { useTheme } from "next-themes";

interface Props {
  errors: FieldErrors;
  defaultValue?: string;
  handleUploadImage: (fileToUpload: File) => Promise<string>;
  setValue: UseFormSetValue<any>;
}

const ContentField = ({
  errors,
  defaultValue,
  handleUploadImage,
  setValue,
}: Props): JSX.Element => {
  const { theme } = useTheme();
  const editorRef = useRef<Editor>();

  const contentFullScreenHandle = useFullScreenHandle();

  return (
    <div className="field">
      <label htmlFor="content">Content</label>
      <button onClick={contentFullScreenHandle.enter} className="p-2 border">
        <AiOutlineFullscreen />
      </button>
      <FullScreen handle={contentFullScreenHandle}>
        <div
          className={`${
            contentFullScreenHandle.active ? "h-screen" : "h-[80vh]"
          } bg-white dark:bg-surface-gray overflow-auto border`}
          onClick={(e) => {
            if (e.target !== e.currentTarget) return;
            // When clicking the background of this div, focus editor at the end.
            editorRef.current.focusAtEnd();
          }}
        >
          <Editor
            ref={editorRef}
            defaultValue={defaultValue}
            uploadImage={handleUploadImage}
            onChange={(getFn) =>
              setValue("content", removeTrailingBackslash(getFn()))
            }
            theme={theme === "light" ? light : dark}
          />
        </div>
      </FullScreen>
      <p>{errors.content?.message}</p>
    </div>
  );
};

export default ContentField;
