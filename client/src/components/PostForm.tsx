import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import Auth from '../utils/auth';

export default function PostForm() {
    const postAuthor = Auth.getProfile().data.name;
    const [addPost, {data, error}] = useMutation(ADD_POST);
    const [formState, setFormState] = useState({ postAuthor, postText: '' });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
        console.log(formState);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await addPost({
                variables: { input: formState }
            });
            console.log(data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form className="py-3" onSubmit={handleFormSubmit}>
            <textarea className='form-control' name="postText" id="post-textarea" defaultValue="Post something to the callboard..." onChange={handleChange}></textarea>
            <button className="btn btn-light m-1" type="submit">Post</button>
            {data && <p>Posted!</p>}
            {error && <div className="error">{error.message}</div>}
        </form>
    )
}