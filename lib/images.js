import probe from "probe-image-size";
import fs from "fs";
import { join } from "path";

const httpMatch = /^http/;
const publicFolder = join(process.cwd(), "/public");

export function getDimensions(url) {
  if (!url.match(httpMatch)) {
    return getDimensionsFromFile(url);
  }
  const { width, height } = probe.sync(url);
  return { width, height };
}

// Maybe should only expose one function?
export function getDimensionsFromFile(file) {
  if (file.match(httpMatch)) {
    return getDimensions(file);
  }
  if (file.startsWith("/")) {
    file = join(publicFolder, file);
  }
  const { width, height } = probe.sync(fs.readFileSync(file));
  return { width, height };
}
