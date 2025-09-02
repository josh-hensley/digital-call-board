import { useState } from 'react';

export default function PostForm() {
    const [formState, setFormState] = useState({ UserId: 1, content: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            })
            window.location.reload()
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error(error);
            }
        }
    };
    return (
        <div className="container">
            <form className="py-3 d-flex flex-column align-items-center" onSubmit={handleFormSubmit}>
                <input className='form-control' name="content" value={formState.content} onChange={handleChange} />
                <button className="btn btn-light m-1" type="submit">Post</button>
            </form>
        </div>
    )
}