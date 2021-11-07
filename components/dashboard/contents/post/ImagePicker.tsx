import React, { useEffect, useRef, useState } from "react";
import StorageBrowser from "../../../common/dialog/StorageBrowser";
import { FileObject } from "@supabase/storage-js";
import useUploadObjectMutation from "../../../../hooks/supabase/storage/useUploadObjectMutation";
import Image from "next/image";
import { getObjectUrl } from "../../../../utils/supabase";
import { toast } from "react-hot-toast";
import { useAuthUser } from "../../../../hooks/auth/useAuthUser";

interface Props {
  initialFile?: string;
  onChange?: (file: string) => void;
}

const ImagePicker = ({ initialFile, onChange }: Props): JSX.Element => {
  const [file, setFile] = useState<string>(initialFile);
  useEffect(() => {
    onChange(file);
  }, [file, onChange]);
  const [showBrowser, setShowBrowser] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>();
  const uploadObjectMutation = useUploadObjectMutation();
  const user = useAuthUser();

  const handleUploadClick = () => {
    inputFileRef.current.click();
  };

  const handleUpload = (fileToUpload: File) => {
    toast
      .promise(uploadObjectMutation.mutateAsync(fileToUpload), {
        loading: "Uploading...",
        success: "Upload complete.",
        error: (e) => e.message,
      })
      .then(() => {
        setFile(`${user.id}/${fileToUpload.name}`);
      });
  };

  const handleOpenStorageBrowser = () => {
    setShowBrowser(true);
  };

  const handleStorageBrowserClose = () => {
    setShowBrowser(false);
  };

  const handleImageChosen = (chosenFile: FileObject) => {
    setFile(`${user.id}/${chosenFile.name}`);
    setShowBrowser(false);
  };

  return (
    <>
      <input
        ref={inputFileRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleUpload(e.currentTarget.files[0]);
          e.currentTarget.value = "";
        }}
      />

      <div className={`relative aspect-h-9 aspect-w-16`}>
        {file && (
          <Image
            src={getObjectUrl(file)}
            alt="Cover image"
            className="bg-white"
            layout="fill"
            priority={true}
          />
        )}

        <div className="absolute flex h-full divide-x-2">
          <button
            className="flex-1 flex justify-center items-center bg-opacity-20 bg-black hover:bg-opacity-50 text-dark-white"
            onClick={handleUploadClick}
          >
            Upload new image
          </button>

          <button
            className="flex-1 flex justify-center items-center bg-opacity-20 bg-black hover:bg-opacity-50 text-dark-white"
            onClick={handleOpenStorageBrowser}
          >
            Choose from Storage
          </button>
        </div>
      </div>

      {showBrowser && (
        <StorageBrowser
          onClose={handleStorageBrowserClose}
          onChosen={handleImageChosen}
        />
      )}
    </>
  );
};

export default ImagePicker;
