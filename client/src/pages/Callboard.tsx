import PostForm from "../components/PostForm";
import Auth from "../utils/auth.js";
import LoginMessage from "../components/LoginMessage.js";
import shrekTShirt from '../assets/Shrek_cast_and_crew_t_shirt.png'

export default function Callboard() {

  return (
    <main>
      {Auth.loggedIn() ? (
        <div className="container d-flex flex-column align-items-center">
          <img className="img img-fluid m-3" style={{maxWidth: "500px"}} src={shrekTShirt} alt="shrek t-shirt info" />
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