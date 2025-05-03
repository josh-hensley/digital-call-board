import PostProps from "../interfaces/PostProps";

export default function Post({ postAuthor, postText, comments }: PostProps) {

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
            <textarea className="form-control p-1" name="comment" defaultValue='add a comment...'></textarea>
            <button className="btn btn-primary my-1 mx-auto" type="button">Comment</button>
        </div>
    )
}