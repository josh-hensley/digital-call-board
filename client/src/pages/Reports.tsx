import { useEffect, useState } from 'react'
import Report from '../components/Report'
import ReportProps from '../interfaces/ReportProps'

export default function Reports() {
    const [reports, setReports] = useState<ReportProps[]>([])

    useEffect(()=>{
        const getReports = async ()=>{
            try {
                const response = await fetch('/api/reports');
                const data = await response.json()
                setReports(data)
            } catch (error) {
                console.log(error)
            }
        }
        getReports()
    }, [])

    return (
        <main>
            <div className="container text-light">
                {reports.map((report: ReportProps) => {
                    return <Report {...report} />
                })}
            </div>
        </main>
    )
}