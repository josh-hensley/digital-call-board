import Auth from '../utils/auth.js'
import LoginMessage from '../components/LoginMessage.js'

export default function Downloads() {
    return (
        <main>
            {Auth.loggedIn() ? (
                <div className='container p-3'>
                    <h2 className='text-light text-center'>Videos</h2>
                    <section className='d-flex justify-content-around m-2 flex-wrap'>
                        <div className="card p-3 d-flex align-items-center">
                            <h3>Story of My Life</h3>
                            <iframe  
                            src="https://www.youtube.com/embed/ONYG95b5_4M?si=7IVKb0qWEBiZYEOy" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen>
                            </iframe>
                        </div>
                        <div className="card p-3 d-flex align-items-center">
                            <h3>Duloc</h3>
                            <iframe 
                            src="https://www.youtube.com/embed/x1WDnmBFDlk?si=GbD3OFUv8d0sNobY" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen>
                            </iframe>
                        </div>
                        <div className="card p-3 d-flex align-items-center">
                            <h3>Forever</h3>
                            <iframe 
                            src="https://www.youtube.com/embed/KYZZS2XeI6g?si=yiwaW0r1Zy_CFOsR" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen>
                            </iframe>
                        </div>
                        <div className="card p-3 d-flex align-items-center">
                            <h3>Morning Person / Rats Part One</h3>
                            <iframe 
                            src="https://www.youtube.com/embed/Vr1SFuVaPQU?si=eR0dOzelsJ3ntf17" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen>
                            </iframe>
                        </div>
                        <div className="card p-3 d-flex align-items-center">
                            <h3>Morning Person / Rats Part Two</h3>
                            <iframe 
                            src="" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen>
                            </iframe>
                        </div>
                    </section>
                </div>
            ) : (
                <LoginMessage />
            )}
        </main>
    )
}