import Image from "next/image";
import { ImageElement } from "../types/hast";

type Props = {
  node: ImageElement;
};

const NextImage = ({ node }: Props): JSX.Element => {
  const imageProps = {
    ...node.properties, // img tag attribute
    ...node.imageDimensions, // width and height
  };
  return <Image {...imageProps} />;
};

export default NextImage;
