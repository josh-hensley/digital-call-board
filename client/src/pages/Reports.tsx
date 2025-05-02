import Auth from '../utils/auth'
import LoginMessage from '../components/LoginMessage'

export default function Reports() {
    return (
        <main>
            {Auth.loggedIn() ? (
                <>
                    <h1>Reports</h1>
                    <section id="reports">
                        <div className="report-card">
                            <h2>Report Title</h2>
                            <p>Description of the report.</p>
                            <p>Generated on: 2023-10-01</p>
                        </div>
                    </section>
                </>
            ) : (
                <LoginMessage />
            )}

        </main>
    )
}