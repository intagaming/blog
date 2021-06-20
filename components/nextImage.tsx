import Image from "next/image";
import { ImageElement } from "../types/hast";

type Props = {
  node: ImageElement;
};

const NextImage = ({ node }: Props): JSX.Element => {
  const isVertical = node.imageDimensions.height > node.imageDimensions.width;

  if (isVertical) {
    return (
      <div className={"vertical-image-div md:aspect-w-3 md:aspect-h-2"}>
        <Image className="vertical-image" layout="fill" {...node.properties} />
      </div>
    );
  }

  return <Image {...node.properties} {...node.imageDimensions} />;
};

export default NextImage;
