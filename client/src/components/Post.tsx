import { ChangeEvent, useState } from "react";
import PostProps from "../interfaces/PostProps";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations";
import Auth from '../utils/auth'

export default function Post({ _id, postAuthor, postText, comments }: PostProps) {
    const [addComment, { data, error }] = useMutation(ADD_COMMENT)
    const [newComment, setNewComment] = useState('')

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target
        setNewComment(value)
    }

    const handleAddComment = async () => {
        await addComment({
            variables: {
                postId: _id,
                commentAuthor: Auth.getProfile().data.name,
                commentText: newComment
            }
        })
        window.location.reload();
    }

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
            {data ?
                (<p>Comment Posted</p>) :
                error ?
                    (<p>Error: {error.message}</p>) :
                    (<button className="btn btn-primary my-1 mx-auto" type="button" onClick={handleAddComment} >Comment</button>)
            }
        </div>
    )
}