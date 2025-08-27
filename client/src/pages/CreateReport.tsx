import { ChangeEvent, MouseEvent, FormEvent, useState, useEffect } from "react"
import ReportProps, { rehearsalBreak } from "../interfaces/ReportProps";
import UserProps from "../interfaces/UserProps";

const contacts: UserProps[] = [
    {
        id: '1',
        firstName: '',
        lastName: '', 
        email: 'john@email.com',
        phone: '123-456-7890',
        roles: ['Jim'],
        groups: ['cast', 'production'],
        age: 30
    },
    {
        id: '2',
        firstName: '',
        lastName: '', 
        email: 'jenna@email.com',
        phone: '123-456-7890',
        roles: ['Pam'],
        groups: ['cast'],
        age: 30
    },
    {
        id: '3',
        firstName: '',
        lastName: '', 
        email: 'rainn@email.com',
        phone: '123-456-7890',
        roles: ['Dwight'],
        groups: ['crew'],
        age: 30
    },
    {
        id: '4',
        firstName: '',
        lastName: '', 
        email: 'steve@email.com',
        phone: '123-456-7890',
        roles: ['Michael'],
        groups: ['production', 'crew'],
        age: 30
    },
]

export default function CreateReport() {
    const [formState, setFormState] = useState<ReportProps>({
        date: new Date().toISOString().split('T')[0],
        rehearsalStart: "",
        breaks: [],
        rehearsalEnd: "",
        present: [],
        absent: [],
        rehearsalNotes: "",
        costumes: "",
        lights: "",
        properties: "",
        sound: "",
        scenery: ""
    })

    useEffect(() => {
        if (localStorage.getItem('report')) {
            const report = JSON.parse(localStorage.getItem('report') || '{}')
            setFormState(report)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('report', JSON.stringify(formState))
    }, [formState])

    const addBreak = (e: MouseEvent) => {
        e.preventDefault();
        const { breaks } = formState;
        breaks?.push({ time: '', length: '5' })
        setFormState({ ...formState, breaks })
    }

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

    const handleAttendance = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const textContent = target.textContent;
        const fullName = target.getAttribute('data-fullname') || '';
        if (textContent === "Present") {
            const { present } = formState;
            present.push(fullName);
            setFormState({ ...formState, present });
        }
        else {
            const { absent } = formState;
            absent?.push(fullName);
            setFormState({ ...formState, absent });
        }
        setFormState({ ...formState });
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value })
    }
    
    const handleBreaks = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const index = parseInt(e.target.getAttribute("data-index") as string);
        const breaks = formState.breaks ? formState.breaks : []
        const currentBreak = { ...breaks[index], [name]: value }
        breaks[index] = currentBreak;
        setFormState({ ...formState, breaks })
    }

    const deleteBreak = (e: MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLInputElement
        const index = parseInt(target.getAttribute("data-index") as string);
        const currentBreaks = formState.breaks ? formState.breaks : []
        const breaks = currentBreaks.filter((_b, i) => { return i != index })
        setFormState({ ...formState, breaks })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // Here you would typically send the formState to your backend or API
            console.log("Report submitted:", formState);
            localStorage.removeItem('report');
            window.location.reload();

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main>
            <form className="text-light d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                <h3 className="text-center">Create Report</h3>
                <div className="container">
                    <div className="row">
                        <fieldset className="col-2 bg-semi-transparent m-1 rounded">
                            <legend>Time Card</legend>
                            <label htmlFor="date">Date: </label>
                            <input className='form-control' type="date" name="date" onChange={handleChange} value={formState.date} />
                            <label htmlFor="rehearsalStart">Rehearsal Start: </label>
                            <input className="form-control" type="time" name="rehearsalStart" onChange={handleChange} value={formState.rehearsalStart} />
                            <label>Breaks: </label>
                            <button className="btn btn-primary m-2" onClick={addBreak}>Add Break</button>
                            <div className="container" id="breaksDiv">
                                {formState.breaks && (formState.breaks.map((b, i) => {
                                    return (
                                        <div key={i} className="form-group">
                                            <p>Break {i + 1}</p>
                                            <input className="form-control m-1" type="time" name="time" onChange={handleBreaks} data-index={i} value={b.time} />
                                            <input className="form-control m-1" type="number" name="length" onChange={handleBreaks} data-index={i} value={b.length} />
                                            <button className="btn btn-danger" onClick={deleteBreak} data-index={i}>Delete</button>
                                        </div>
                                    )
                                }))}
                            </div>
                            <label htmlFor="rehearsalEnd">Rehearsal End: </label>
                            <input className="form-control" type="time" name="rehearsalEnd" onChange={handleChange} value={formState.rehearsalEnd} />
                            <p>Total Rehearsal Time:</p>
                            <p>{calcRehearsalTime(formState.rehearsalStart, formState.breaks || [{ time: '00:00', length: '0' }], formState.rehearsalEnd)}</p>
                        </fieldset>
                        <fieldset className="col bg-semi-transparent m-1 rounded">
                            <legend>Attendance</legend>
                            <h4>Called</h4>
                            <ul className="d-flex flex-column flex-wrap" style={{ height: '500px' }}>
                                {contacts.map(c => {
                                    const fullName = `${c.firstName} ${c.lastName}`
                                    if (!formState.present.includes(fullName) && !formState.absent?.includes(fullName)) {
                                        return (
                                        <div className="container" key={c.id}>
                                            <p>{fullName}</p>
                                            <button className="btn btn-primary m-1" type="button" data-fullname={fullName} onClick={handleAttendance}>Present</button>
                                            <button className="btn btn-primary m-1" type="button" data-fullname={fullName} onClick={handleAttendance}>Absent</button>
                                        </div>
                                    )}
                                })}
                            </ul>
                            <h4>Present</h4>
                            <p>{formState.present.join(', ')}</p>
                            <h4>Absent</h4>
                            <p>{formState.absent?.join(', ')}</p>
                        </fieldset>
                    </div>
                </div>
                <fieldset className="container bg-semi-transparent rounded p-1">
                    <legend>Notes</legend>
                    <label htmlFor="rehearsal-notes">Rehearsal Notes: </label>
                    <textarea className="form-control" name="rehearsalNotes" onChange={handleChange} value={formState.rehearsalNotes}></textarea>
                    <label htmlFor="costumes">Costumes: </label>
                    <textarea className="form-control" name="costumes" onChange={handleChange} value={formState.costumes}></textarea>
                    <label htmlFor="lights">Lights: </label>
                    <textarea className="form-control" name="lights" onChange={handleChange} value={formState.lights}></textarea>
                    <label htmlFor="properties">Properties: </label>
                    <textarea className="form-control" name="properties" onChange={handleChange} value={formState.properties}></textarea>
                    <label htmlFor="sound">Sound: </label>
                    <textarea className="form-control" name="sound" onChange={handleChange} value={formState.sound}></textarea>
                    <label htmlFor="scenery">Scenery: </label>
                    <textarea className="form-control" name="scenery" onChange={handleChange} value={formState.scenery}></textarea>
                </fieldset>
                {
                    (
                        <div>
                            <button className="btn btn-primary w-10 m-3" style={{ width: '100px' }} type="submit">Submit</button>
                            <button
                                className="btn btn-primary w-10 m-3"
                                type="button"
                                style={{ width: '150px' }}
                                onClick={() => {
                                    localStorage.removeItem('report');
                                    window.location.reload()
                                }}
                            >Reset Form</button>
                        </div>
                    )}

            </form>
        </main>
    )
}