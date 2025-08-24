import { FormEvent, FormEventHandler, useState } from "react";

const testLinks = [
    {
        title: "Libretto",
        link: "https://static1.squarespace.com/static/55a52a9be4b080154671d64a/t/59eb65bcd0e6283d8684dfc8/1508599240829/shrek_libretto_1.pdf",
    },
    {
        title: "Vocal Book",
        link: "https://timr.4roberts.us/Shrek-Piano-Score.pdf"
    }
]

const Downloads = () => {
    const [links, setLinks] = useState(testLinks)

    const handleSubmit: FormEventHandler = (e: FormEvent) => {
        e.preventDefault()
        const { link, title } = e.target as unknown as { link: HTMLInputElement, title: HTMLInputElement };
        setLinks([...links, { title: title.value, link: link.value }])
    }

    return (
        <main>
            <div className="container">
                <form onSubmit={handleSubmit} className="form-control">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input className="form-control" type="text" name="title" />
                    <label className="form-label" htmlFor="link">Link</label>
                    <input className="form-control" type="text" name="link" />
                    <button className="btn btn-primary m-1" type="submit">Add Link</button>
                </form>
            </div>

            <div className='container p-3'>
                <h2 className='text-light text-center'>Downloads</h2>
                {links.map((link, i) => {
                    return (
                        <section key={i} className="d-flex justify-content-around m-2">
                            <div className="card p-3 d-flex align-items-center" style={{ width: '18rem' }}>
                                <a href={link.link}>
                                    <h3>{link.title}</h3>
                                </a>
                            </div>
                        </section>
                    )
                })}
            </div>
        </main>
    )
}

export default Downloads;