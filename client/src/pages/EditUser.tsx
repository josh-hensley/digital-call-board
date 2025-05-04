import { useQuery, useMutation } from "@apollo/client"
import { QUERY_USER } from "../utils/queries"
import { UPDATE_USER } from "../utils/mutations"
import Auth from '../utils/auth'

import { ChangeEvent, useState, FormEvent, useEffect } from "react"
import UserProps from "../interfaces/UserProps";

export default function EditUser() {
    const [updateUser, { data: mutationData, error }] = useMutation(UPDATE_USER)
    const [search, setSearch] = useState('');
    const [formState, setFormState] = useState<UserProps>({
        _id: '',
        name: '',
        email: '',
        phone: '',
        roles: ['none'],
        age: 0
    })
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { search }
    });

    useEffect(() => {
        if (data?.user) {
            const { _id, name, email, phone, roles, age } = data.user;
            setFormState({ _id, name, email, phone, roles, age });
        }
    }, [data]) 

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name == 'search') {
            setSearch(value)
        }
        else if(name == 'age') {
            setFormState({...formState, [name]:parseInt(value)})
        }
        else {
            setFormState({ ...formState, [name]: value })
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (Auth.getProfile().data.name == "Josh Hensley") {
            try {
                await updateUser({
                    variables: { input: formState }
                });

            } catch (error) {
                console.error(error)
            }
        }
    }


    return (
        <main>
            <div className="container text-light p-3">
                <label htmlFor="search">Search For A User</label>
                <input className="form-control" type="text" name="search" style={{ maxWidth: '500px' }} value={search} onChange={handleChange} />
            </div>
            {loading ? <div>Loading...</div> :
                <form className="container text-light p-3" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-sm col-12">
                            <label htmlFor="name">Name:</label>
                            <input className="form-control" type="text" name="name" onChange={handleChange} value={formState.name} />
                        </div>
                        <div className="col-sm col-12">
                            <label htmlFor="email">Email:</label>
                            <input className="form-control" type="email" name="email" onChange={handleChange} value={formState.email} />
                        </div>
                        <div className="col-sm col-12">
                            <label htmlFor="phone">Phone:</label>
                            <input className="form-control" name="phone" type="text" onChange={handleChange} value={formState.phone} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="age">Age</label>
                            <input className="form-control" type="number" name="age" onChange={handleChange} value={formState.age} />
                        </div>
                        <div className="col-sm">
                            <label htmlFor="roles">Roles</label>
                            <ul>
                                {formState.roles?.map((role, index) => {
                                    return (
                                        <li key={index}>
                                            <p>{role}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    {mutationData ? <div>Success!</div> : error ? <div>{error.message}</div> : <button className="btn btn-primary" type="submit">Submit</button>}
                </form>
            }

        </main>
    )
}