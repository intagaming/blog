import { Element } from "hast";
import { ImageDimensions } from "./ImageDimensions";

export interface ImageElement extends Element {
  tagName: "img" | "Image";
  properties: {
    src: string;
    alt: string;
    placeholder: "blur";
    blurDataURL: string;
  };
  imageDimensions: ImageDimensions;
}
