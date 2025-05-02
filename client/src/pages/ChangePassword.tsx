import { ChangeEvent, FormEvent, useState } from "react";
import { CHANGE_PASSWORD } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import LoginMessage from "../components/LoginMessage";

export default function ChangePassword() {
    const [changePassword, { error, data }] = useMutation(CHANGE_PASSWORD);

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
                const { data } = await changePassword({
                    variables: { newPassword }
                });
                Auth.login(data.token);
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
                <div>
                    <form onSubmit={handlePasswordChange}>
                        <input type="text" name='newPassword' onChange={handleChange} defaultValue='enter a new password' />
                        <input type="text" name='verification' onChange={handleChange} defaultValue='retype new password' />
                        <button type="submit">Change Password</button>
                    </form>
                    <p>{data ? 'Success!' : error ? `${error.message}` : ''}</p>
                </div>
            ) : (
                <LoginMessage />
            )}

        </main>
    )
}