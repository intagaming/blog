import React, { ReactNode } from "react";
import Dialog from "./Dialog";
import TitleBar from "./TitleBar";

interface Props {
  title: string;
  onClose?: () => void;
  children?: ReactNode;
}

const FullScreenDialog = ({ title, onClose, children }: Props): JSX.Element => (
  <Dialog>
    <div className="flex flex-col w-full h-full overflow-hidden bg-white shadow-md text-black dark:bg-surface-gray dark:text-dark-white">
      <TitleBar title={title} onClose={onClose} />
      <hr />

      {/* Take all the spaces, but no more than that, so it can be scrolled. */}
      <div className="flex-auto overflow-auto p-4 overscroll-contain">
        {children}
      </div>
    </div>
  </Dialog>
);

export default FullScreenDialog;
