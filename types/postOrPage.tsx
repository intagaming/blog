import { Element } from "hast";
import { Node } from "unist";
import { definitions } from "./supabase";

export type PostOrPage = definitions["posts"] | definitions["pages"];

export interface PostOrPageData {
  postOrPage: PostOrPage;
  node: Node;
  toc: Element;
  coverImagePlaceholder?: string;
  author?: definitions["authors"];
}
