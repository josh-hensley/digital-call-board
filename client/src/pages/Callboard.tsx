import PostForm from "../components/PostForm";
import Post from "../components/Post";
import PostProps from "../interfaces/PostProps";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries.js";
import Auth from "../utils/auth.js";
import LoginMessage from "../components/LoginMessage.js";
import shrekTShirt from '../assets/Shrek_cast_and_crew_t_shirt.png'

export default function Callboard() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main>
      {Auth.loggedIn() ? (
        <div className="container d-flex flex-column align-items-center">
          <img className="img img-fluid m-3" style={{maxWidth: "500px"}} src={shrekTShirt} alt="shrek t-shirt info" />
          <PostForm />
          <div className="container">
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
          </div>
        </div>
      ) : (
        <LoginMessage />
      )}

    </main>
  )
}