import { FC, useState, useEffect } from "react";
import Contact from "../components/Contact.js";
import UserProps from "../interfaces/UserProps.js";

const Contacts: FC = () => {
    const [contacts, setContacts] = useState<UserProps[]>([])

    useEffect(()=>{
        const fetchContacts = async ()=>{
            const response = await fetch('/api/users');
            const data = await response.json();
            setContacts(data)
        }
        fetchContacts();
    }, [])
    
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
                        {contacts.map((contact: UserProps) =>
                            <Contact
                                key={contact.id}
                                id={contact.id}
                                firstName={contact.firstName}
                                lastName={contact.lastName}
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