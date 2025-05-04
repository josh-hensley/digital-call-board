import ReportProps from "../interfaces/ReportProps";

export default function Report(props: ReportProps) {
    const {
        date,
        rehearsalStart,
        break1,
        break2,
        rehearsalEnd,
        rehearsalTime,
        attendance,
        rehearsalNotes,
        costumes,
        lights,
        properties,
        sound,
        scenery
    } = props;
    return (
        <div className="container bg-semi-transparent p-3">
            <div className="row">
                <div className="col-2 border">
                    <p>Date: {date}</p>
                    <p>Start Time: {rehearsalStart}</p>
                    <p>Breaks: {`${break1}${break2 ? `, ${break2}` : '.'}`}</p>
                    <p>End Time: {rehearsalEnd}</p>
                    <p>Rehearsal Time: {rehearsalTime}</p>
                </div>
                <div className="col border">
                    <p>Present: {attendance.join(', ')}</p>
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