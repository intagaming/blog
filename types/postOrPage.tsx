import { Element } from "hast";
import { Node } from "unist";
import { StrapiImage } from "./strapiTypes";

export interface PostOrPage {
  title: string;
  slug: string;
  content: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  cover?: StrapiImage;
  author?: {
    avatar: StrapiImage;
    fullName: string;
  };
}

export interface PostOrPageData {
  postOrPage: PostOrPage;
  node: Node;
  toc?: Element;
}
