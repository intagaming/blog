import { render } from "@testing-library/react";
import _ from "lodash";
import { definitions } from "../../types/supabase";
import { screen } from "@testing-library/react";
import Home from "./Home";

describe("Home page", function () {
  let idCounter = 0;
  const generatePost = () => {
    idCounter += 1;
    return {
      id: idCounter,
      title: `Article ${idCounter}`,
      excerpt: `Excerpt ${idCounter}`,
      cover: "https://placekitten.com/300/300",
      slug: `article-${idCounter}`,
      user_id: "uuid",
      content: "# Title",
    };
  };
  const posts: definitions["posts"][] = _.range(10).map(() => generatePost());
  const authors: { [authorId: string]: definitions["authors"] } = {
    uuid: {
      user_id: "uuid",
      avatar: "https://placekitten.com/300/300",
    },
  };

  beforeEach(() => {
    render(<Home posts={posts} authors={authors} />);
  });

  it("shows an initial list of blogs", () => {
    posts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeTruthy();
      expect(screen.getByText(post.excerpt)).toBeTruthy();
    });
  });
});
