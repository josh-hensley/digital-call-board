import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries.js";
import Contact from "../components/Contact.js";
import UserProps from "../interfaces/UserProps.js";

export default function Contacts() {
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];

    return (
        <main>
            <h1>Contacts</h1>
            {loading ? (<div>Loading...</div>) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                        {users.map((user: UserProps) => <Contact
                            key={user._id}
                            fullName={user.name}
                            email={user.email}
                            phone={user.phone}
                            roles={user.roles}
                        />)}
                    </thead>
                </table>
            )}
        </main>
    )
}