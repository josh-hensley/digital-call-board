import Report from '../components/Report'
import Auth from '../utils/auth'
import LoginMessage from '../components/LoginMessage'
import ReportProps from '../interfaces/ReportProps'

export default function Reports() {
    const data: { reports: ReportProps[] } = {
        reports: []
    };
    return (
        <main>
            {Auth.loggedIn() ?
                (
                    <div className="container text-light">
                        {data.reports?.map((report: ReportProps) => {
                            return <Report {...report} />
                        })}
                    </div>
                ) : (<LoginMessage />)}

        </main>
    )
}