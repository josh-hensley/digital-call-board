import { useQuery, useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react"
import { QUERY_USERS } from "../utils/queries";
import { ADD_REPORT } from "../utils/mutations";
import UserProps from "../interfaces/UserProps";
import Auth from '../utils/auth'

export default function CreateReport() {
    const { loading, data } = useQuery(QUERY_USERS)
    const [addReport, { error, data: mutationData }] = useMutation(ADD_REPORT)
    const users = data?.users || [];
    const [formState, setFormState] = useState({
        date: "",
        rehearsalStart: "",
        break1: "",
        breakLength1: "0",
        break2: "",
        breakLength2: "0",
        rehearsalEnd: "",
        rehearsalTime: '0h 0m',
        attendance: [""],
        rehearsalNotes: "",
        costumes: "",
        lights: "",
        properties: "",
        sound: "",
        scenery: ""
    })

    const calcRehearsalTime = (start: string, break1: string, break2: string, end: string) => {
        const endHour = parseInt(end.split(':')[0]);
        const endMinute = parseInt(end.split(':')[1]);
        const startHour = parseInt(start.split(':')[0]);
        const startMinute = parseInt(start.split(':')[1]);
        const breaks = break1 && break2 ? parseInt(break1) + parseInt(break2) : break1 ? parseInt(break1) : 0;
        const totalMinutes = (endHour * 60) - (startHour * 60) + (endMinute - startMinute) - breaks;
        const totalHours = Math.floor(totalMinutes / 60);
        const remainderMinutes = totalMinutes % 60;
        return `${totalHours}h ${remainderMinutes}m`
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const { rehearsalStart, breakLength1, breakLength2, rehearsalEnd } = formState;
        const rehearsalTime = calcRehearsalTime(rehearsalStart, breakLength1, breakLength2, rehearsalEnd)
        setFormState({ ...formState, rehearsalTime, [name]: value })
    }

    const handleAttendance = ((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const attendance = formState.attendance
        setFormState({ ...formState, attendance: value == "on" ? [...attendance, name] : attendance.splice(attendance.indexOf(name as never), 1) })
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (Auth.getProfile().data.name == "Josh Hensley") {
            try {
                await addReport({
                    variables: { input: formState }
                });

            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <main>
            {Auth.loggedIn() && Auth.getProfile().data.name === 'Josh Hensley' ? (
                <form className="text-light d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                    <h3 className="text-center">Create Report</h3>
                    <div className="container">
                        <div className="row">
                            <fieldset className="col-2 bg-semi-transparent m-1 rounded">
                                <legend>Time Card</legend>
                                <label htmlFor="date">Date: </label>
                                <input className='form-control' type="date" name="date" onChange={handleChange} />
                                <label htmlFor="rehearsalStart">Rehearsal Start: </label>
                                <input className="form-control" type="time" name="rehearsalStart" onChange={handleChange} />
                                <label htmlFor="break1">Break: </label>
                                <input className="form-control" type="time" name="break1" onChange={handleChange} />
                                <label htmlFor="breakLength1">Break Length: {formState.breakLength1}</label>
                                <input className="form-control" type="range" min='0' max='20' name="breakLength1" onChange={handleChange} />
                                <label htmlFor="break2">Break: </label>
                                <input className="form-control" type="time" name="break2" onChange={handleChange} />
                                <label htmlFor="breakLength2">Break Length: {formState.breakLength2}</label>
                                <input className="form-control" type="range" min='0' max='20' name="breakLength2" onChange={handleChange} />
                                <label htmlFor="rehearsalEnd">Rehearsal End: </label>
                                <input className="form-control" type="time" name="rehearsalEnd" onChange={handleChange} />
                                <p>Total Rehearsal Time:</p>
                                <p>{formState.rehearsalTime}</p>
                            </fieldset>
                            <fieldset className="col bg-semi-transparent m-1 rounded">
                                <legend>Attendance</legend>
                                <ul className="d-flex flex-column flex-wrap" style={{ height: '500px' }}>
                                    {loading ? (<div>Loading Cast...</div>) : (
                                        users.length > 0 ?
                                            users.map((user: UserProps) => {
                                                return (
                                                    <li key={user._id}>
                                                        <input className="form-check-input" type="checkbox" name={user.name} onChange={handleAttendance} />
                                                        <label className='form-check-label px-2' htmlFor={user.name}>{user.name}</label>
                                                    </li>
                                                )
                                            }
                                            ) : (
                                                Array.from({ length: 40 }).map((_, i) => (
                                                    <li key={i}>
                                                        <input type="checkbox" name={`test-${i}`} onChange={handleAttendance} />
                                                        <label className='label-reset' htmlFor={`test-${i}`}>Test Name {i + 1}</label>
                                                    </li>
                                                ))

                                            )
                                    )}
                                </ul>
                            </fieldset>
                        </div>
                    </div>
                    <fieldset className="container bg-semi-transparent rounded p-1">
                        <legend>Notes</legend>
                        <label htmlFor="rehearsal-notes">Rehearsal Notes: </label>
                        <textarea className="form-control" name="rehearsalNotes" onChange={handleChange}></textarea>
                        <label htmlFor="costumes">Costumes: </label>
                        <textarea className="form-control" name="costumes" onChange={handleChange}></textarea>
                        <label htmlFor="lights">Lights: </label>
                        <textarea className="form-control" name="lights" onChange={handleChange}></textarea>
                        <label htmlFor="properties">Properties: </label>
                        <textarea className="form-control" name="properties" onChange={handleChange}></textarea>
                        <label htmlFor="sound">Sound: </label>
                        <textarea className="form-control" name="sound" onChange={handleChange}></textarea>
                        <label htmlFor="scenery">Scenery: </label>
                        <textarea className="form-control" name="scenery" onChange={handleChange}></textarea>
                    </fieldset>
                    {
                        error ? (<div className="text-light">An Error has occured</div>) :
                            mutationData ? (<div className="text-light">Success</div>) :
                                (
                                    <button className="btn btn-primary w-10 m-3" style={{width: '100px'}} type="submit">Submit</button>
                                )}

                </form>
            ) : (
                <p>Must be SM to view page.</p>
            )}

        </main>
    )
}