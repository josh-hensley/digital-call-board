import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Login() {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
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
                <form onSubmit={handleFormSubmit}>
                    <input placeholder="username" name="username" onChange={handleChange}/>
                    <input placeholder="password" name="password" onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
            )}
            {error && ( <div className="error">{error.message}</div> )}
        </main>
    );
}