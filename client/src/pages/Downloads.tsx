import shrekLibretto from '../downloadables/shrek_libretto.pdf'
import shrekCover from '../assets/Shrek_Cover.jpg'
import Auth from '../utils/auth.js'
import LoginMessage from '../components/LoginMessage.js'

export default function Downloads() {
    return (
        <main>
            {Auth.loggedIn() ? (
                <>
                    <h1>Downloads</h1>
                    <section id="downloads">
                        <div className="download-card">
                            <h3>Libretto</h3>
                            <a href={shrekLibretto} download><img src={shrekCover} className='thumbnail' alt="Shrek Libretto Cover" /></a>
                        </div>
                    </section>
                </>
            ) : (
                <LoginMessage />
            )}
        </main>
    )
}