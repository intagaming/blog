import PropTypes from "prop-types";
import Link from "next/link";
import { getAllPosts } from "../lib/posts";
import Layout from "../components/layout";

const Home = ({ posts }) => {
  return (
    <Layout>
      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={"/" + post.slug}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

Home.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

export default Home;

export async function getStaticProps() {
  const posts = await getAllPosts();

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
