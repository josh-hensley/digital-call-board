import { ChangeEvent, useState } from "react";
import PostProps from "../interfaces/PostProps";
// import Auth from '../utils/auth'

export default function Post({ postAuthor, postText, comments }: PostProps) {
    const [newComment, setNewComment] = useState('')

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target
        setNewComment(value)
    }

    // const handleAddComment = async () => {
    //     return;
    // }

    return (
        <div className="card p-3 my-2">
            <h3 className='m-1'>{postAuthor}</h3>
            <p>{postText}</p>
            <ul className="comments-list">
                {comments.map((comment, index) => (
                    <li key={index}>
                        <p><strong>{comment.commentAuthor}</strong></p>
                        <p>{comment.commentText}</p>
                    </li>
                ))}
            </ul>
            <hr />
            <textarea className="form-control p-1" name="comment" value={newComment} onChange={handleChange} ></textarea>
        </div>
    )
}