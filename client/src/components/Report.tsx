import ReportProps, { rehearsalBreak } from "../interfaces/ReportProps";

export default function Report(props: ReportProps) {
    const {
        date,
        rehearsalStart,
        breaks,
        rehearsalEnd,
        present,
        absent,
        rehearsalNotes,
        costumes,
        lights,
        properties,
        sound,
        scenery
    } = props;

    const calcRehearsalTime = (start: string, breaks: rehearsalBreak[], end: string) => {
            const endHour = parseInt(end.split(':')[0]);
            const endMinute = parseInt(end.split(':')[1]);
            const startHour = parseInt(start.split(':')[0]);
            const startMinute = parseInt(start.split(':')[1]);
            const totalBreakTime = breaks.reduce((acc, cur) => acc + parseInt(cur.length), 0);
            const totalMinutes = ((endHour * 60) + endMinute) - ((startHour * 60) + startMinute) - totalBreakTime;
            const totalHours = Math.floor(totalMinutes / 60);
            const remainderMinutes = totalMinutes % 60;
            return `${totalHours}h ${remainderMinutes}m`
        }


return (
    <div className="container bg-semi-transparent p-3">
        <div className="row">
            <div className="col-2 border">
                <p>Date: {date}</p>
                <p>Start Time: {rehearsalStart}</p>
                <p>Breaks: {breaks?.map(b => { return `${b.length} mins at ${b.time}` }).join(', ')}</p>
                <p>End Time: {rehearsalEnd}</p>
                <p>Rehearsal Time: {calcRehearsalTime(rehearsalStart, breaks ? breaks : [{time:"00:00", length: "0"}] , rehearsalEnd)}</p>
            </div>
            <div className="col border">
                <p>Present: {present.join(', ')}</p>
                <p>Absent: {absent?.join(', ') || 'None'}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-6 border">
                <p>Rehearsal Notes:</p>
                <p>{rehearsalNotes}</p>
            </div>
            <div className="col-6 border">
                <p>Costume Notes:</p>
                <p>{costumes}</p>
            </div>
            <div className="col-6 border">
                <p>Lighting Notes:</p>
                <p>{lights}</p>
            </div>
            <div className="col-6 border">
                <p>Prop Notes:</p>
                <p>{properties}</p>
            </div>
            <div className="col-6 border">
                <p>Sound Notes:</p>
                <p>{sound}</p>
            </div>
            <div className="col-6 border">
                <p>Scenic Notes:</p>
                <p>{scenery}</p>
            </div>
        </div>
    </div>
)
}