import React from "react";

interface Props {
  title: string;
  onClose?: () => void;
}

const TitleBar = ({ title, onClose }: Props): JSX.Element => (
  <div className="flex p-2 pl-3 justify-between items-center gap-4">
    <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
      {title}
    </span>
    <button onClick={onClose}>X</button>
  </div>
);

export default TitleBar;
