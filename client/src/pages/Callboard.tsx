import PostForm from "../components/PostForm";
// import Auth from "../utils/auth.js";
// import LoginMessage from "../components/LoginMessage.js";

export default function Callboard() {

  return (
    <main>
        <div className="container d-flex flex-column align-items-center">
          <PostForm />
        </div>
    </main>
  )
}