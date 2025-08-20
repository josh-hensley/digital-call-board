import Contact from "../components/Contact.js";
import UserProps from "../interfaces/UserProps.js";
import Auth from '../utils/auth.js'
import LoginMessage from "../components/LoginMessage";

export default function Contacts() {
    const users: UserProps[] = [
        {
            _id: '1',
            name: 'John Doe',
            email: 'lkj@lkj.com',
            phone: '123-456-7890',
            roles: ['Actor', 'Director'],
            age: 30
        }
    ]
    return (
        <main>
                ({Auth.loggedIn() ? (
                    <div className="container text-light bg-semi-transparent d-flex flex-column align-items-center">
                        <h1>Contacts</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th className="d-none d-md-table-cell">Role</th>
                                    <th className="d-none d-sm-table-cell">Email</th>
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
                    </div>
                ) : (
                    <LoginMessage />
                )
                })
        </main>
    )
}