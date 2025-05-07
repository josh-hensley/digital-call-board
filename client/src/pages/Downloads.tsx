import shrekLibretto from '../downloadables/shrek_libretto.pdf'
import shrekCover from '../assets/Shrek_Cover.jpg'
import shrekMusicCover from '../assets/shrek_score_screengrab.png'
import Auth from '../utils/auth.js'
import LoginMessage from '../components/LoginMessage.js'

export default function Downloads() {
    return (
        <main>
            {Auth.loggedIn() ? (
                <div className='container p-3'>
                    <h2 className='text-light text-center'>Downloads</h2>
                    <section className='d-flex justify-content-around m-2'>
                        <div className="card p-3 d-flex align-items-center" style={{ width: '18rem' }}>
                            <h3>Libretto</h3>
                            <a href={shrekLibretto} download><img src={shrekCover} className='img-thumbnail img-fluid' style={{ maxWidth:'200px' }} alt="Shrek Libretto Cover" /></a>
                        </div>
                    </section>
                    <section className='d-flex justify-content-around m-2'>
                        <div className="card p-3 d-flex align-items-center" style={{ width: '18rem' }}>
                            <h3>Music</h3>
                            <a href="https://timr.4roberts.us/Shrek-Piano-Score.pdf" download><img src={shrekMusicCover} className='img-thumbnail img-fluid' style={{ maxWidth:'200px' }} alt="Shrek Libretto Cover" /></a>
                        </div>
                    </section>
                </div>
            ) : (
                <LoginMessage />
            )}
        </main>
    )
}