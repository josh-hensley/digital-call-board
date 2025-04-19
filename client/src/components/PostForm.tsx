export default function PostForm() {
    return (
        <form>
            <h2>Callboard</h2>
            <textarea name="post" id="post-textarea" defaultValue="Post something to the callboard..."></textarea>
            <button type="submit">Post</button>
        </form>
    )
}