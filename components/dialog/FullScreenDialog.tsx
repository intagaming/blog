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
    <div className="w-full h-full overflow-hidden bg-white shadow-md">
      <TitleBar title={title} onClose={onClose} />
      <hr />

      {/* Take all the spaces, but no more than that, so it can be scrolled. */}
      <div className="flex-auto overflow-hidden p-4">{children}</div>
    </div>
  </Dialog>
);

export default FullScreenDialog;
