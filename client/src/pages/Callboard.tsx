import PostForm from "../components/PostForm";
import Post from "../components/Post";
import PostProps from "../interfaces/PostProps";
import { useEffect, useState } from "react";

export default function Callboard() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    setPosts([
      { id: 1, username: "John Doe", content: "Rehearsal at 5 PM", date: "2023-10-01" },
      { id: 2, username: "Jane Smith", content: "Costume fitting tomorrow", date: "2023-10-02" },
      { id: 3, username: "Alice Johnson", content: "Don't forget to bring your scripts!", date: "2023-10-03" }
    ])
  }, [])


  return (
    <main>
      <PostForm />
      <section id="posts">
        {posts.map((post: PostProps) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.username}
            content={post.content}
            date={post.date}
          />
        ))}
      </section>
    </main>
  )
}