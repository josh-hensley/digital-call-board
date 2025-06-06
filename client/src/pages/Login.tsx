import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Login() {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name == 'email'){
            setFormState({...formState, [name]: value.toLowerCase()})
        }
        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <main>
            {data ? (
                <p>Success! You may now head <a href="/">back to the homepage</a>.</p>
            ) : (
                <form className='container text-light p-3' onSubmit={handleFormSubmit}>
                    <label htmlFor="email">Email</label>
                    <input className='form-control' placeholder="email" name="email" onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                    <input className='form-control' type="password" placeholder="password" name="password" onChange={handleChange} />
                    <button className='btn btn-primary my-1' type="submit">Submit</button>
                </form>
            )}
            {error && ( <div className="error">{error.message}</div> )}
        </main>
    );
}