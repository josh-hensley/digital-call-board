import { FC } from "react";
import Contact from "../components/Contact.js";
import ContactProps from "../interfaces/ContactProps.js";

const contacts: ContactProps[] = [
        {
            id: '1',
            fullName: 'John Krasinsky',
            email: 'john@email.com',
            phone: '123-456-7890',
            roles: ['Jim'],
            groups: ['cast', 'production'],
            age: 30
        },
        {
            id: '2',
            fullName: 'Jenna Fischer',
            email: 'jenna@email.com',
            phone: '123-456-7890',
            roles: ['Pam'],
            groups: ['cast'],
            age: 30
        },
        {
            id: '3',
            fullName: 'Rainn Wilson',
            email: 'rainn@email.com',
            phone: '123-456-7890',
            roles: ['Dwight'],
            groups: ['crew'],
            age: 30
        },
        {
            id: '4',
            fullName: 'Steve Carell',
            email: 'steve@email.com',
            phone: '123-456-7890',
            roles: ['Michael'],
            groups: ['production', 'crew'],
            age: 30
        },
    ]

const Contacts: FC = () => {
    
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
            <div className="container">
                <a className="btn btn-primary m-2" href={`mailto:${contacts.map(c=>c.email).join(', ')}`}>Email All</a>
                <a className="btn btn-primary m-2" href={`mailto:${contacts.filter(c=>c.groups?.includes('cast')).map(c=>c.email).join(', ')}`}>Email Cast</a>
                <a className="btn btn-primary m-2" href={`mailto:${contacts.filter(c=>c.groups?.includes('crew')).map(c=>c.email).join(', ')}`}>Email Crew</a>
                <a className="btn btn-primary m-2" href={`mailto:${contacts.filter(c=>c.groups?.includes('production')).map(c=>c.email).join(', ')}`}>Email Production Team</a>
            </div>

        </main>
    )
}

export default Contacts;