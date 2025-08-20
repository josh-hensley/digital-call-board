import { useState } from 'react';
import Auth from '../utils/auth';

export default function PostForm() {
    const postAuthor = Auth.getProfile().data.name;
    const [formState, setFormState] = useState({ postAuthor, postText: '' });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
        console.log(formState);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // const { data } = await addPost({
            //     variables: { input: formState }
            // });
            // console.log(data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="container">
            <form className="py-3 d-flex flex-column align-items-center" onSubmit={handleFormSubmit}>
                <textarea className='form-control' name="postText" id="post-textarea" value={formState.postText} onChange={handleChange}></textarea>
                <button className="btn btn-light m-1" type="submit">Post</button>
            </form>
        </div>
    )
}