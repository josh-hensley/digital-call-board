import { FC, FormEvent, useState } from "react"

const testVideos = [
    {
        title: "Story of my Life",
        slug: "ONYG95b5_4M"
    },
    {
        title: "Duloc",
        slug: "x1WDnmBFDlk"
    },
    {
        title: "Forever",
        slug: "KYZZS2XeI6g"
    },
    {
        title: "Morning Person",
        slug: "4ydgGZ1nd5w"
    },
    {
        title: "Ballad of Farquaad",
        slug: "T1HC0wZYJSU"
    },
    {
        title: "Make a Move",
        slug: "foOAdbl9tBg"
    },
    {
        title: "Freak Flag",
        slug: "t8RsCwTbILg"
    },
    {
        title: "Finale/ Believer",
        slug: "AoaOK3ePg28"
    },
]

const Videos: FC = () => {
    const [videos, setVideos] = useState(testVideos)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const { title, slug } = e.target as unknown as { title: HTMLInputElement, slug: HTMLInputElement }
        if (slug.value.includes('youtu.be')) {
            const extractedslug = slug.value.split('?')[0].split('/').pop() as string
            const newVideo = {
                title: title.value,
                slug: extractedslug
            }
            setVideos([...videos, newVideo])
        }
        else if (slug.value.includes('watch')) {
            const extractedslug = slug.value.split('=').pop() as string
            const newVideo = {
                title: title.value,
                slug: extractedslug
            }
            setVideos([...videos, newVideo])
        }
        else {
            const newVideo = {
                title: title.value,
                slug: slug.value
            }
            setVideos([...videos, newVideo])
        }
    }

    return (
        <main>
            <div className='container p-3'>
                <form className="form-control" onSubmit={handleSubmit}>
                    <label htmlFor="title" className="form-label">Title</label>
                    <input className="form-control" type="text" name="title" />
                    <label htmlFor="src" className="form-label">Src</label>
                    <input className="form-control" type="text" name="slug" />
                    <button className="btn btn-primary m-1 ">Add Video</button>
                </form>
                <h2 className='text-light text-center'>Videos</h2>
                <section className='d-flex flex-column align-items-center gap-3'>
                    {videos.map(video => {
                        return (
                            <div className="card p-3 d-flex align-items-center">
                                <h3>{video.title}</h3>
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.slug}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen>
                                </iframe>
                            </div>
                        )
                    })}
                </section>
            </div>
        </main>
    )
}

export default Videos;