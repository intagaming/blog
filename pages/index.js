import Link from "next/link";
import TopNavigation from "../components/navbar";
import { getAllPosts } from "../lib/posts";
import Layout from "../components/layout";

export default function Home({ posts }) {
  return (
    <Layout>
      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={"/" + post.slug}>{post.data.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const posts = getAllPosts();

  if (!posts) {
    return {
      // FIXME
      //  This notFound here does not make sense. If there's
      //  no posts available, it should shows empty. But this
      //  works for now.
      notFound: true,
    };
  }

  return {
    props: { posts },
  };
}
