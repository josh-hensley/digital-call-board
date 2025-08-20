import { ChangeEvent, FormEvent, useState } from 'react';
// import Auth from '../utils/auth';

export default function Login() {
    const [formState, setFormState] = useState({ email: '', password: '' });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name == 'email') {
            setFormState({ ...formState, [name]: value.toLowerCase() })
        }
        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // Here you would typically send the formState to your backend or API
            console.log("Login submitted:", formState);
            localStorage.setItem('user', JSON.stringify(formState));
            window.location.reload();

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <main>

            <form className='container text-light p-3' onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email</label>
                <input className='form-control' placeholder="email" name="email" onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input className='form-control' type="password" placeholder="password" name="password" onChange={handleChange} />
                <button className='btn btn-primary my-1' type="submit">Submit</button>
            </form>
        </main>
    );
}