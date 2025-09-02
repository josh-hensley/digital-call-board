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

    const printReports = () => {
        const printArea = document.getElementById('printArea')?.innerHTML;
        const page = document.body.innerHTML;
        if (printArea) {
            document.body.innerHTML = printArea;
        }
        window.print()
        document.body.innerHTML = page
    }

    return (
        <main>
            <div className="container text-light" id='printArea'>
                {reports.map((report: ReportProps) => {
                    return <Report {...report} />
                })}
            </div>
            <div className="container text-light">
                <button className='btn btn-primary m-1' type="button" onClick={printReports}>Print Reports</button>
            </div>
            
        </main>
    )
}