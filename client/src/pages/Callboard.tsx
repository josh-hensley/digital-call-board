import PostForm from "../components/PostForm";
import Post from "../components/Post";
import PostProps from "../interfaces/PostProps";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries.js";
import Auth from "../utils/auth.js";

export default function Callboard() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main>
      {Auth.loggedIn() ? (
        <div>
          <PostForm />
          <section id="posts">
            {loading ? (<div>Loading...</div>) : (posts.map((post: PostProps) => (
              <Post
                key={post._id} 
                _id={post._id}
                postAuthor={post.postAuthor}
                postText={post.postText}
                createdAt={post.createdAt}
                comments={post.comments}
              />
            )))}
          </section>
        </div>
      ) : (
        <div className="no-auth">
          <h2>Please log in to view the callboard.</h2>
        </div>
      )}

    </main>
  )
}