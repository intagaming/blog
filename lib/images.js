import probe from "probe-image-size";

export const getDimensions = async (url) => {
  const test = await probe(url);
  const { width, height } = test;
  return { width, height };
};
