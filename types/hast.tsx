import { Element } from "hast";
import { ImageDimension } from "./ImageDimension";

export interface ImageElement extends Element {
  tagName: "img" | "Image";
  properties: {
    src: string;
  };
  imageDimensions: ImageDimension;
}
