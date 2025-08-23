import { FC } from "react";
import Contact from "../components/Contact.js";
import ContactProps from "../interfaces/ContactProps.js";

const Contacts: FC = () => {
    const contacts: ContactProps[] = [
        {
            id: '1',
            fullName: 'John Doe',
            email: 'lkj@lkj.com',
            phone: '123-456-7890',
            roles: ['Jim'],
            group: 'cast',
            age: 30
        },
        {
            id: '2',
            fullName: 'John Doe',
            email: 'lkj@lkj.com',
            phone: '123-456-7890',
            roles: ['Pam'],
            group: 'cast',
            age: 30
        },
        {
            id: '3',
            fullName: 'John Doe',
            email: 'lkj@lkj.com',
            phone: '123-456-7890',
            roles: ['Dwight'],
            group: 'cast',
            age: 30
        },
        {
            id: '4',
            fullName: 'John Doe',
            email: 'lkj@lkj.com',
            phone: '123-456-7890',
            roles: ['Michael'],
            group: 'cast',
            age: 30
        },
    ]
    return (
        <main>

            <div className="container text-light bg-semi-transparent d-flex flex-column align-items-center">
                <h1>Contacts</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th className="d-none d-md-table-cell">Role</th>
                            <th className="d-none d-sm-table-cell">Email</th>
                            <th>Phone</th>
                        </tr>
                        {contacts.map((contact: ContactProps) =>
                            <Contact
                                key={contact.id}
                                fullName={contact.fullName}
                                email={contact.email}
                                phone={contact.phone}
                                roles={contact.roles}
                            />
                        )}
                    </thead>
                </table>
            </div>

        </main>
    )
}

export default Contacts;