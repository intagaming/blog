import Image from "next/image";
import { ImageElement } from "../types/hast";

type Props = {
  node: ImageElement;
};

const NextImage = ({ node }: Props): JSX.Element => {
  const isVertical = node.imageDimensions.height > node.imageDimensions.width;

  const { src, alt, blurDataURL, placeholder } = node.properties;
  const { width, height } = node.imageDimensions;

  if (isVertical) {
    return (
      <div className="vertical-image-div md:aspect-w-3 md:aspect-h-2">
        <Image
          src={src}
          alt={alt}
          className="vertical-image"
          layout="fill"
          placeholder={placeholder}
          blurDataURL={blurDataURL}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout="responsive"
      placeholder={placeholder}
      blurDataURL={blurDataURL}
    />
  );
};

export default NextImage;
