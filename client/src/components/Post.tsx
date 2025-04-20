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
                        <strong>{comment.commentAuthor}</strong>: {comment.commentText} <span className="timestamp">{comment.createdAt}</span>
                    </li>
                ))}
            </ul>
            {postAuthor === "me" ? (
                <div>
                    <button type="button">Edit</button>
                    <button type="button">Delete</button>
                </div>):(<></>)}
            
        </div>
    )
}