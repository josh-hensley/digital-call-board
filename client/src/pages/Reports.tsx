import Report from '../components/Report'
import { QUERY_REPORTS } from '../utils/queries'
import Auth from '../utils/auth'
import LoginMessage from '../components/LoginMessage'
import { useQuery } from '@apollo/client'
import ReportProps from '../interfaces/ReportProps'

export default function Reports() {
    const {loading, data}= useQuery(QUERY_REPORTS)
    return (
        <main>
            {Auth.loggedIn() ?
            loading ? 
            (
                <div className="info">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="container text-light">
                    {data.reports?.map((report: ReportProps)=>{
                        return <Report {...report} />
                    })}
                </div>
            ) : (<LoginMessage />)}

        </main>
    )
}