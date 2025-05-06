import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

export default function AddUser() {
    const [addUser, { data, error }] = useMutation(ADD_USER)
    const [newRole, setNewRole] = useState('')
    const [roles, setRoles] = useState<string[]>([])
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        age: 18,
        password: 'donkey',
        roles
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name == 'role') {
            setNewRole(value);
        }
        else if (name == 'age') {
            setFormState({...formState, [name]: parseInt(value) })
        }
        else {
            setFormState({ ...formState, [name]: value })
        }
    }

    const addRole = () => {
        if (newRole.trim() !== '') {
            setRoles([...roles, newRole]);
            setNewRole('');
            setFormState({ ...formState, roles });
        }

    }

    const deleteRole = (index: number) => {
        const updatedRoles = roles.filter((_el, i)=> i !== index);
        setRoles(updatedRoles);
        setFormState({ ...formState, roles })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await addUser({
            variables: { input: { ...formState } }
        })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input className="form-control" type="text" name="name" onChange={handleChange} value={formState.name} />
                <label htmlFor="email">Email:</label>
                <input className="form-control" type="email" name="email" onChange={handleChange} value={formState.email}/>
                <label htmlFor="phone">Phone:</label>
                <input className="form-control" type="text" name="phone" onChange={handleChange} value={formState.phone} />
                <label htmlFor="name">Age:</label>
                <input className="form-control" type="number" name="age" onChange={handleChange} value={formState.age} />
                <label htmlFor="name">Add Roles:</label>
                <input className="form-control" type="text" name="role" onChange={handleChange} value={newRole} />
                <button type="button" className="btn btn-secondary m-2" onClick={addRole}>Add Role</button>
                <ul>
                    {roles?.map((role, index) => {
                        return (
                            <li key={index}>
                                <p>{role}</p>
                                <button type="button" className='btn btn-danger m-2' onClick={() => deleteRole(index)}>Delete</button>
                            </li>
                        )
                    })}
                </ul>
                {
                    data ? (
                        <p>Success!</p>
                    ) : (
                        error ? (
                            <p className="text-danger">{error.message}</p>
                        ) : (
                            <button className="btn btn-primary m-2" type="submit" >Submit</button>
                        ))}

            </form>
        </div>
    )
}