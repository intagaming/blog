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

  return (
    <div className="aspect-w-3 aspect-h-2">
      <Image className="object-contain" {...node.properties} layout={"fill"} />
    </div>
  );
};

export default NextImage;
