export default function Callboard() {
  return (
    <>
      <nav>
        <h1>RSM Shrek The Musical</h1>
        <ul>
          <li><a href="/">Callboard</a></li>
          <li><a href="/about">Contacts</a></li>
          <li><a href="/contact">Reports</a></li>
          <li><a href="/downloads">Downloads</a></li>
        </ul>
      </nav>
      <main>
        <form>
          <h2>Callboard</h2>
          <textarea name="post" id="post-textarea" defaultValue="Post something to the callboard..."></textarea>
          <button type="submit">Post</button>
        </form>
        <section id="posts">
          <div className="post">
            <h3>Name</h3>
            <p>Post content goes here...</p>
            <p className="timestamp">Posted on: YYYY-MM-DD</p>
            <button type="button">Edit</button>
            <button type="button">Delete</button>
          </div>
        </section>
      </main>
    </>
  )
}