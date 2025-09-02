import { ChangeEvent, useState, useEffect, FormEvent, MouseEvent } from "react"

type group = 'production' | 'cast' | 'crew';

interface NewUserProps {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone?: string;
    age?: number;
    roles?: string[];
    groups: group[]
}

const EditUser = () => {
    const [formState, setFormState] = useState<NewUserProps>({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        phone: '',
        age: 18,
        roles: [],
        groups: []
    })

    useEffect(() => {
        if (localStorage.getItem('newUser')) {
            setFormState(JSON.parse(localStorage.getItem('newUser') as string))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('newUser', JSON.stringify(formState))
    }, [formState])

    const addRole = (e: MouseEvent) => {
        e.preventDefault()
        const { roles } = formState;
        const roleElement = document.getElementById('newRole') as HTMLInputElement | null;
        if (roleElement && roleElement.value) {
            roles?.push(roleElement.value);
            setFormState({ ...formState, roles });
        }
    }

    const deleteRole = (index: number) => {
        const updatedRoles = formState.roles?.filter((_item, i) => i !== index);
        setFormState({ ...formState, roles: updatedRoles });
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name == 'age') {
            setFormState({ ...formState, [name]: parseInt(value) })
        }
        else {
            setFormState({ ...formState, [name]: value })
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            
            const body = JSON.stringify({...formState, password:'password123'})
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            })
            const data = await response.json()
            if (data) {
                localStorage.removeItem('newUser')
            }
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <main>
            <form className="container text-light p-3" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm col-12">
                        <label htmlFor="name">First:</label>
                        <input className="form-control" type="text" name="firstName" onChange={handleChange} value={formState.firstName} />
                        <label htmlFor="name">Last:</label>
                        <input className="form-control" type="text" name="lastName" onChange={handleChange} value={formState.lastName} />
                    </div>
                    <div className="col-sm col-12">
                        <label htmlFor="email">Email:</label>
                        <input className="form-control" type="email" name="email" onChange={handleChange} value={formState.email} />
                        <label htmlFor="email">Password:</label>
                        <input className="form-control" type="password" name="password" onChange={handleChange} value={formState.password} />
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
                    <div className="col-sm col-2">
                        <label htmlFor="newRole">Add Role:</label>
                        <input className="form-control" name="newRole" id='newRole' onChange={handleChange} type="text" />
                        <button className="btn btn-primary m-1" type="button" onClick={addRole}>Add Role</button>
                        <ul>
                            {formState.roles?.map((role, index) => {
                                return (
                                    <li className='list-style-none' key={index}>
                                        {role}
                                        <button className="btn btn-danger m-1" type="button" onClick={() => { deleteRole(index) }} >Delete</button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="col-sm col-2">
                        <label htmlFor="groups">Groups:</label>
                        <button type="button" className="btn btn-primary m-1" onClick={
                            () => {
                                const groups = formState.groups;
                                groups?.push('production')
                                setFormState({ ...formState, groups })
                            }}>Add to Production</button>
                        <button type="button" className="btn btn-primary m-1" onClick={
                            () => {
                                const groups = formState.groups;
                                groups?.push('crew')
                                setFormState({ ...formState, groups })
                            }}>Add to Crew</button>
                        <button type="button" className="btn btn-primary m-1" onClick={
                            () => {
                                const groups = formState.groups;
                                groups?.push('cast')
                                setFormState({ ...formState, groups })
                            }}>Add to Cast</button>
                        <ul>
                            {formState.groups?.map((group, index) => {
                                return (
                                    <li className='list-style-none' key={index}>
                                        {group}
                                        <button className='btn btn-danger m-1' type="button" onClick={() => {
                                            const groups = formState.groups?.filter((_g, i) => index !== i);
                                            setFormState({ ...formState, groups })
                                        }}>Remove</button></li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">Create User</button>
            </form>
        </main>
    )
}

export default EditUser