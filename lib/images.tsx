import probe from "probe-image-size";
import { ImageDimensions } from "../types/ImageDimensions";
import { getPlaiceholder } from "plaiceholder";

export const getDimensions = async (url: string): Promise<ImageDimensions> => {
  const { width, height } = await probe(url);
  return { width, height };
};

export const getPlaceholder = async (url: string): Promise<string> => {
  const { base64 } = await getPlaiceholder(url);
  return base64;
};
