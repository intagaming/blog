import probe from "probe-image-size";
import { ImageDimension } from "../types/ImageDimension";

export const getDimensions = async (url: string): Promise<ImageDimension> => {
  const { width, height } = await probe(url);
  return { width, height };
};
