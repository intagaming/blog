import Link from "next/link";
import TopNavigation from "../components/navbar";

export default function Home({ posts }) {
  return (
    <>
      <TopNavigation />
      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={"/" + post.slug}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps(ctx) {
  // const posts = await getPosts();
  const posts = [];

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts, revalidate: 20 },
  };
}
