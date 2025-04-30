import shrekLibretto from '../downloadables/shrek_libretto.pdf'

export default function Downloads() {
    return (
        <main>
            <h1>Downloads</h1>
            <section id="downloads">
                <div className="download-card">
                    <h2>Libretto</h2>
                    <img src="" alt="" />
                    <a href={shrekLibretto} download>Download</a>
                </div>
            </section>
        </main>
    )
}