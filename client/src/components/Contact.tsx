import ContactProps from "../interfaces/ContactProps"

export default function Contact({ fullName, email, phone, roles }: ContactProps) {
    return (
        <tr>
            <td>{fullName}</td>
            <td>{roles.join(', ')}</td>
            <td><a href={`mailto:${email}`}>{email}</a></td>
            <td><a href={`tel:${phone}`}>{phone}</a></td>
        </tr>
    )
}