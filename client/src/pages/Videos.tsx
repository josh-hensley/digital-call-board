import Auth from '../utils/auth.js'
import LoginMessage from '../components/LoginMessage.js'

export default function Downloads() {
    return (
        <main>
            {Auth.loggedIn() ? (
                <div className='container p-3'>
                    <h2 className='text-light text-center'>Videos</h2>
                    <section className='d-flex flex-column align-items-center gap-3'>
                        <div className="card p-3 d-flex align-items-center">
                            <h3>Story of My Life</h3>
                            <iframe
                                src="https://www.youtube.com/embed/ONYG95b5_4M?si=7IVKb0qWEBiZYEOy"
                                title="YouTube video player"
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
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="card p-3 d-flex align-items-center">
                            <h3>Morning Person</h3>
                            <iframe
                                src="https://www.youtube.com/embed/4ydgGZ1nd5w?si=u2WXdLl8vbHnwQ3-"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="card p-3 d-flex align-items-center">
                            <h3>Ballad of Farquaad</h3>
                            <iframe
                                src="https://www.youtube.com/embed/T1HC0wZYJSU?si=VYoDc_FIPXdxyjBO"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="card p-3 d-flex align-items-center">
                            <h3>Make a Move</h3>
                            <iframe
                                src="https://www.youtube.com/embed/foOAdbl9tBg?si=h5tYeAFMfCzaqn3P"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="card p-3 d-flex align-items-center">
                            <h3>Freak Flag</h3>
                            <iframe
                                src="https://www.youtube.com/embed/t8RsCwTbILg?si=a6b98xLF-G2uZ8Ro"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="card p-3 d-flex align-items-center">
                            <h3>Finale/ Believer</h3>
                            <iframe
                                src="https://www.youtube.com/embed/AoaOK3ePg28?si=pYKxcYd44VS-gsao"
                                title="YouTube video player"
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