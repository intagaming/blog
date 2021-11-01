import React from "react";
import FullScreenDialog from "../../dialog/FullScreenDialog";
import useListObjectsQuery from "../../../hooks/supabase/useListObjectsQuery";
import Image from "next/image";
import { getObjectUrl } from "../../../utils/supabase";
import { FileObject } from "@supabase/storage-js";
import { useAuthUser } from "../../../hooks/auth/useAuthUser";

interface Props {
  onClose?: () => void;
  onChosen: (file: FileObject) => void;
}

const StorageBrowser = ({ onClose, onChosen }: Props): JSX.Element => {
  const { data, isLoading, error } = useListObjectsQuery();
  const user = useAuthUser();

  const handleChooseImage = (file: FileObject) => {
    onChosen(file);
  };

  return (
    <FullScreenDialog title="Storage Browser" onClose={onClose}>
      <p>Choose an image</p>

      {isLoading && <p>Please wait...</p>}
      {error && <p>{error}</p>}

      {data && data.length === 0 && <p>There is nothing to choose.</p>}

      {data && data.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {data.map((file) => {
            return (
              <button
                key={file.id}
                className="aspect-h-9 aspect-w-16 bg-black"
                onClick={() => handleChooseImage(file)}
              >
                <Image
                  src={getObjectUrl(`${user.id}/${file.name}`)}
                  alt=""
                  layout="fill"
                />
              </button>
            );
          })}
        </div>
      )}
    </FullScreenDialog>
  );
};

export default StorageBrowser;
