import Report from '../components/Report'
import ReportProps from '../interfaces/ReportProps'

const reports: ReportProps[] = [
    {
        date: '2024-06-01',
        rehearsalStart: '18:00',
        breaks: [
            { time: '19:00', length: '5' }, 
            { time: '20:00', length: '5' }
        ],
        rehearsalEnd: '21:00',
        present: [],
        absent: [],
        rehearsalNotes: 'rehearsal notes',
        costumes: 'costume notes',
        lights: 'lighting notes',
        properties: 'props notes',
        sound: 'sound notes',
        scenery: 'scenery notes',
    },
    {
        date: '2024-06-01',
        rehearsalStart: '18:00',
        breaks: [
            { time: '19:00', length: '5' }, 
            { time: '20:00', length: '5' }
        ],
        rehearsalEnd: '21:00',
        present: [],
        absent: [],
        rehearsalNotes: 'rehearsal notes',
        costumes: 'costume notes',
        lights: 'lighting notes',
        properties: 'props notes',
        sound: 'sound notes',
        scenery: 'scenery notes',
    },
    {
        date: '2024-06-01',
        rehearsalStart: '18:00',
        breaks: [
            { time: '19:00', length: '5' }, 
            { time: '20:00', length: '5' }
        ],
        rehearsalEnd: '21:00',
        present: [],
        absent: [],
        rehearsalNotes: 'rehearsal notes',
        costumes: 'costume notes',
        lights: 'lighting notes',
        properties: 'props notes',
        sound: 'sound notes',
        scenery: 'scenery notes',
    },
    {
        date: '2024-06-01',
        rehearsalStart: '18:00',
        breaks: [
            { time: '19:00', length: '5' }, 
            { time: '20:00', length: '5' }
        ],
        rehearsalEnd: '21:00',
        present: [],
        absent: [],
        rehearsalNotes: 'rehearsal notes',
        costumes: 'costume notes',
        lights: 'lighting notes',
        properties: 'props notes',
        sound: 'sound notes',
        scenery: 'scenery notes',
    }
]

export default function Reports() {
    const data: { reports: ReportProps[] } = {
        reports
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