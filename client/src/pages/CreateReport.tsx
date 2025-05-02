import { useQuery } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react"
import { QUERY_USERS } from "../utils/queries";
import UserProps from "../interfaces/UserProps";
import Auth from '../utils/auth'

export default function CreateReport() {
    const { loading, data } = useQuery(QUERY_USERS)
    const users = data?.users || [];
    const [formState, setFormState] = useState({
        date: "",
        rehearsalStart: "",
        break1: "",
        rehearsalStart2: "",
        break2: "",
        rehearsalEnd: "",
        rehearsalTime: "",
        attendance: [""],
        rehearsalNotes: "",
        costumes: "",
        lights: "",
        properties: "",
        sound: "",
        scenery: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value })
    }

    const handleAttendance = ((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const attendance = formState.attendance
        setFormState({ ...formState, attendance: value == "on" ? [...attendance, name] : attendance.splice(attendance.indexOf(name as never), 1) })
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formState)
    }

    return (
        <main>
            {Auth.loggedIn() && Auth.getProfile().data.username === 'JoshH' ? (
                <form onSubmit={handleSubmit}>
                <h3>Create Report</h3>
                <div className="flex">
                    <fieldset>
                        <legend>Time Card</legend>
                        <label htmlFor="date">Date: </label>
                        <input type="date" name="date" onChange={handleChange} />
                        <label htmlFor="rehearsal-start">Rehearsal Start: </label>
                        <input type="time" name="rehearsal-start" onChange={handleChange} />
                        <label htmlFor="break1">Break: </label>
                        <input type="time" name="break1" onChange={handleChange} />
                        <label htmlFor="rehearsal-start2">Rehearsal Start: </label>
                        <input type="time" name="rehearsal-start2" onChange={handleChange} />
                        <label htmlFor="break2">Break: </label>
                        <input type="time" name="break2" onChange={handleChange} />
                        <label htmlFor="rehearsal-end">Rehearsal End: </label>
                        <input type="time" name="rehearsal-end" onChange={handleChange} />
                        <label htmlFor="rehearsal-time">Total Rehearsal Time: </label>
                        <input type="time" name="rehearsal-time" onChange={handleChange} />
                    </fieldset>
                    <fieldset id="attendance">
                        <legend>Attendance</legend>
                        <ul className="flex">
                            {loading ? (<div>Loading Cast...</div>) : (
                                users.length > 0 ?
                                    users.map((user: UserProps) => {
                                        return (
                                            <li key={user._id}>
                                                <input type="checkbox" name={user.name} onChange={handleAttendance} />
                                                <label className='label-reset' htmlFor={user.name}>{user.name}</label>
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
                <fieldset>
                    <legend>Notes</legend>
                    <label htmlFor="rehearsal-notes">Rehearsal Notes: </label>
                    <textarea name="rehearsal-notes" onChange={handleChange}></textarea>
                    <label htmlFor="costumes">Costumes: </label>
                    <textarea name="costumes" onChange={handleChange}></textarea>
                    <label htmlFor="lights">Lights: </label>
                    <textarea name="lights" onChange={handleChange}></textarea>
                    <label htmlFor="properties">Properties: </label>
                    <textarea name="properties" onChange={handleChange}></textarea>
                    <label htmlFor="sound">Sound: </label>
                    <textarea name="sound" onChange={handleChange}></textarea>
                    <label htmlFor="scenery">Scenery: </label>
                    <textarea name="scenery" onChange={handleChange}></textarea>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        ):(
            <p>Must be SM to view page.</p>
        )}
            
        </main>
    )
}