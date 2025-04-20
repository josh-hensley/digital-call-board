import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries.js";
import UserProps from "../interfaces/UserProps.js";

export default function Contacts() {
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];
    
    return (
        <main>
        <h1>Contacts</h1>
        <section id="contacts">
            {loading ? (<div>Loading...</div>) : (users.map((user: UserProps) => (
            <div key={user._id} className="contact-card">
                <h2>{user.username}</h2>
                <p>Email: {user.email}</p>
            </div>
            )))}
        </section>
        </main>
    )
}