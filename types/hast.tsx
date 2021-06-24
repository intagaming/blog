import { Element } from "hast";
import { ImageDimensions } from "./ImageDimensions";

export interface ImageElement extends Element {
  tagName: "img" | "Image";
  properties: {
    src: string;
  } & (
    | {
        placeholder?: "empty";
        blurDataURL?: never;
      }
    | {
        placeholder: "blur";
        blurDataURL: string;
      }
  );
  imageDimensions: ImageDimensions;
}
