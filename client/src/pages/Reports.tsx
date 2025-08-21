import Report from '../components/Report'
import ReportProps from '../interfaces/ReportProps'

export default function Reports() {
    const data: { reports: ReportProps[] } = {
        reports: []
    };
    return (
        <main>
            <div className="container text-light">
                {data.reports?.map((report: ReportProps) => {
                    return <Report {...report} />
                })}
            </div>
        </main>
    )
}