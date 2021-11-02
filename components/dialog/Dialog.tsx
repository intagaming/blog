import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children?: ReactNode;
}

const Dialog = ({ children }: Props): JSX.Element => {
  const dialogRoot = document.getElementById("dialog-root");
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return !dialogRoot || !ready ? (
    <></>
  ) : (
    createPortal(<div className="dialog">{children}</div>, dialogRoot)
  );
};

export default Dialog;
