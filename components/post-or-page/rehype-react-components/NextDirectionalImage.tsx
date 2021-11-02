import Image from "next/image";
import { ImageElement } from "../../../types/hast";

type Props = {
  node: ImageElement;
};

/**
 * A Next.js <Image> wrapper that fixes vertical images' styling.
 */
const NextDirectionalImage = ({ node }: Props): JSX.Element => {
  const isVertical = node.imageDimensions.height > node.imageDimensions.width;

  const { src, alt, blurDataURL, placeholder } = node.properties;
  const { width, height } = node.imageDimensions;

  return (
    <>
      {isVertical && (
        <div className="vertical-image-div hidden md:aspect-w-3 md:aspect-h-2 md:block">
          <Image
            src={src}
            alt={alt}
            className="vertical-image"
            layout="fill"
            placeholder={placeholder}
            blurDataURL={blurDataURL}
          />
        </div>
      )}
      <div className={`relative md:static ${isVertical ? "md:hidden" : ""}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          layout="responsive"
          placeholder={placeholder}
          blurDataURL={blurDataURL}
        />
      </div>
    </>
  );
};

export default NextDirectionalImage;
