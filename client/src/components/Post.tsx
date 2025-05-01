import '../css/post.css'
import PostProps from "../interfaces/PostProps";

export default function Post({ postAuthor, postText, createdAt, comments }: PostProps) {

    return (
        <div className="post">
            <h3>{postAuthor}</h3>
            <p>{postText}</p>
            <p className="timestamp">Posted on: {createdAt}</p>
            <h4>Comments:</h4>
            <ul className="comments-list">
                {comments.map((comment, index) => (
                    <li key={index}>
                        <strong>{comment.commentAuthor}</strong>: {comment.commentText}
                    </li>
                ))}
            </ul>
            <textarea name="comment">add a comment...</textarea>
            <button type="button">Comment</button>
        </div>
    )
}