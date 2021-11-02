import React from "react";
import Dialog from "./Dialog";
import TitleBar from "./TitleBar";

interface Props {
  title: string;
  content: string;
  okString?: string;
  cancelString?: string;
  onCancel?: () => void;
  onOk?: () => void;
  okClassNames?: string;
  cancelClassNames?: string;
}

const Modal = ({
  title,
  content,
  okString,
  cancelString,
  onCancel,
  onOk,
  okClassNames,
  cancelClassNames,
}: Props): JSX.Element => {
  return (
    <Dialog>
      <div className="w-full h-full overflow-hidden bg-white shadow-md">
        <TitleBar title={title} onClose={onCancel} />
        <hr />

        <div className="flex-auto overflow-hidden p-4">
          <p>{content}</p>

          <div className="flex h-12 gap-3">
            <button className={`flex-1 ${okClassNames}`} onClick={() => onOk()}>
              {okString ?? "OK"}
            </button>
            <button
              className={`flex-1 ${cancelClassNames}`}
              onClick={() => onCancel()}
            >
              {cancelString ?? "Cancel"}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
