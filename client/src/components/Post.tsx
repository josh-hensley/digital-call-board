import '../css/post.css'
import PostProps from "../interfaces/PostProps";

export default function Post({ postAuthor, postText, createdAt, comments }: PostProps) {

    return (
        <div className="post">
            <h3>{postAuthor}</h3>
            <p className="timestamp">Posted on: {createdAt}</p>
            <p>{postText}</p>
            <hr />
            <ul className="comments-list">
                {comments.map((comment, index) => (
                    <li key={index}>
                        <h4>{comment.commentAuthor}</h4>
                        <p>{comment.commentText}</p>
                    </li>
                ))}
            </ul>
            <hr />
            <textarea name="comment">add a comment...</textarea>
            <button type="button">Comment</button>
        </div>
    )
}