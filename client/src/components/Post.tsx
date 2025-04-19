import PostProps from "../interfaces/PostProps";

export default function Post({ username, content, date }: PostProps) {
    return (
        <div className="post">
            <h3>{username}</h3>
            <p>{content}</p>
            <p className="timestamp">Posted on: {date}</p>
            {username === "admin" ? (
                <div>
                    <button type="button">Edit</button>
                    <button type="button">Delete</button>
                </div>):(<></>)}
            
        </div>
    )
}