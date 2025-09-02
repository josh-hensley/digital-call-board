import PostForm from "../components/PostForm";
import Post from "../components/Post"
import PostProps from "../interfaces/PostProps";
import { useState, useEffect } from "react";
// import Auth from "../utils/auth.js";
// import LoginMessage from "../components/LoginMessage.js";

const Callboard = () => {
  const [posts, setPosts] = useState<PostProps[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json()
      const sortedData = data.sort((a: PostProps, b: PostProps) => {
        const aTime = new Date(a.createdAt).getTime();
        const bTime = new Date(b.createdAt).getTime();
        return bTime - aTime;
      })
      setPosts(sortedData);
    };
    fetchPosts();
  }, [])
  
  return (
    <main>
        <div className="container d-flex flex-column align-items-center">
          <PostForm />
          {posts.map(post=>{
            const { id, content, createdAt, User, Comments } = post
            return (
              <Post key={id} id={id} createdAt={createdAt} content={content} User={User} Comments={Comments} />
            )
          })}
        </div>
    </main>
  )
}

export default Callboard;