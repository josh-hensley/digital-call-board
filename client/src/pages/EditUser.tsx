// import { useQuery, useMutation } from "@apollo/client"
// import { QUERY_USER } from "../utils/queries"

import { ChangeEvent, useState } from "react"

export default function EditUser() {
    // const { loading, data } = useQuery(QUERY_USER);
    // const [updateUser, { data: mutationData, error }] = useMutation()
    const [search, setSearch] = useState('');
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        roles: [''],
        age: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name == 'search') {
            setSearch(value)
        }
        else {
            setFormState({ ...formState, [name]: value })
        }
    }


    return (
        <main>
            <div className="container text-light p-3">
                <label htmlFor="searchUser">Search For A User</label>
                <input className="form-control" type="text" name="searchUser" style={{ maxWidth: '500px' }} value={search} onChange={handleChange} />
                <button className="btn btn-primary m-1">Search</button>
            </div>
            <form className="container text-light p-3">
                <div className="row">
                    <div className="col-sm col-12">
                        <label htmlFor="name">Name:</label>
                        <input className="form-control" type="text" name="name" />
                    </div>
                    <div className="col-sm col-12">
                        <label htmlFor="email">Email:</label>
                        <input className="form-control" type="email" name="email" />
                    </div>
                    <div className="col-sm col-12">
                        <label htmlFor="phone">Phone:</label>
                        <input className="form-control" name="phone" type="text" />
                    </div>
                </div>
            </form>
        </main>
    )
}