import { ChangeEvent, useState } from "react";
import PostProps from "../interfaces/PostProps";
// import Auth from '../utils/auth'

export default function Post({ id, createdAt, content, User, Comments }: PostProps) {
    const [newComment, setNewComment] = useState({
        content: "",
        PostId: id,
        UserId: 1
    })

    const date = new Date(createdAt).toUTCString()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setNewComment({...newComment, content: value})
    }

    const handleAddComment = async () => {
        await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
        window.location.reload()
    }

    return (
        <div className="card p-3 my-2 w-100">
            <h3 className='m-1'>{User.firstName} {User.lastName}</h3>
            <p>{date}</p>
            <p>{content}</p>
            <ul className="list-unstyled m-3">
                {Comments.map((comment) => {
                    const commentDate = new Date(comment.createdAt).toUTCString();
                    return (
                        <li key={comment.id}>
                            <p><strong>{comment.User.firstName} {comment.User.lastName}</strong></p>
                            <p>{commentDate}</p>
                            <p>{comment.content}</p>
                        </li>
                    );
                })}
            </ul>
            <hr />
            <input className="form-control p-1" name="comment" value={newComment.content} onChange={handleChange} />
            <div>
                <button type="button" className="btn btn-primary m-1" onClick={handleAddComment}>Comment</button>
            </div>
        </div>
    )
}