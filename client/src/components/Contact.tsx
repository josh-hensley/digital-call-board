import { FC } from "react";
import UserProps from "../interfaces/UserProps";

const Contact: FC<UserProps> = ({ firstName, lastName, email, phone, roles }: UserProps) => {
    return (
        <tr className="text-white">
            <td>{`${firstName} ${lastName}`}</td>
            <td className="d-none d-md-table-cell">{roles?.join(', ')}</td>
            <td className="d-none d-sm-table-cell"><a href={`mailto:${email}`}>{email}</a></td>
            <td><a href={`tel:${phone}`}>{phone}</a></td>
        </tr>
    )
}

export default Contact;