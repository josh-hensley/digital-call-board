import { ChangeEvent, FormEvent, useState } from "react";
import Auth from "../utils/auth";
import LoginMessage from "../components/LoginMessage";

export default function ChangePassword() {

    const [input, setInput] = useState({
        newPassword: '',
        verification: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { newPassword, verification } = input;
        if (newPassword == verification) {
            try {
                location.replace('/');

            } catch (error) {
                console.error(error)
            }
        }
        else {
            throw new Error('passwords do not match')
        }

    }

    return (
        <main>
            {Auth.loggedIn() ? (
                <div className="container w-50">
                    <form className="py-3" onSubmit={handlePasswordChange}>
                        <label className="text-light" htmlFor="newPpassword">New Password</label>
                        <input className="form-control my-3" type="password" name='newPassword' onChange={handleChange} />
                        <label className="text-light" htmlFor="verification">Retype New Password</label>
                        <input className="form-control my-3" type="password" name='verification' onChange={handleChange} />
                        <button className="btn btn-primary" type="submit">Change Password</button>
                    </form>
                    <p></p>
                </div>
            ) : (
                <LoginMessage />
            )}

        </main>
    )
}