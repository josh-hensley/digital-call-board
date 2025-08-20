import PostForm from "../components/PostForm";
import Auth from "../utils/auth.js";
import LoginMessage from "../components/LoginMessage.js";

export default function Callboard() {

  return (
    <main>
      {Auth.loggedIn() ? (
        <div className="container d-flex flex-column align-items-center">
          <PostForm />
          <div className="container">
            
          </div>
        </div>
      ) : (
        <LoginMessage />
      )}

    </main>
  )
}