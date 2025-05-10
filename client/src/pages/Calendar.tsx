import { useState } from "react"
import "../css/calendar.css"
import Auth from '../utils/auth.js'
import LoginMessage from "../components/LoginMessage.js";

export default function Calendar() {
    const date = new Date();
    const month = date.getMonth();
    const today = date.getDate();

    const [calendarInfo, setCalendarInfo] = useState({
        months: ["May", "June"],
        currentMonth: month - 4,
        daysInMonth: [31, 30],
        startingDay: [4, 0],
        events: [
            [
                [''],
                [''],
                [''],
                [''],
                [''],
                ['7pm @ 305 S Fanin', 'First Rehearsal!', 'all called'],
                ['7pm @ 305 S Fanin', 'Music', 'all called'],
                ['7pm @ 305 S Fanin', 'Read/Sing Thru', 'all called'],
                ['7:30pm @ 305 S Fanin', "Story of My Life", "Fairytale Creatures Called"],
                [''],
                ['NO REHEARSAL', `HAPPY MOTHER'S DAY`],
                ['7pm @ 305 S Fanin', 'ACT 1, Scene 1-4'],
                ['7pm @ 305 S Fanin'],
                [''],
                ['7pm @ 305 S Fanin'],
                ['7pm @ 305 S Fanin'],
                [''],
                ['1pm @ 305 S Fanin'],
                ['7pm @ 305 S Fanin'],
                ['7pm @ 305 S Fanin'],
                [''],
                ['7pm @ 305 S Fanin'],
                ['7pm @ 305 S Fanin'],
                [''],
                ['1pm @ 305 S Fanin'],
                ['7pm @ 305 S Fanin'],
                ['7pm @ 305 S Fanin'],
                [''],
                ['7pm @ 305 S Fanin'],
                ['7pm @ 305 S Fanin'],
                [''],
            ],
            [
                ['1pm @ Rockwall HS'],
                ['7pm @ Rockwall HS'],
                ['7pm @ Rockwall HS'],
                [''],
                ['7pm @ Rockwall HS'],
                ['7pm @ Rockwall HS'],
                [''],
                ['1pm @ Rockwall HS'],
                ['7pm @ Rockwall HS'],
                ['7pm @ Rockwall HS'],
                [''],
                ['7pm @ Rockwall HS'],
                ['7pm @ Rockwall HS'],
                [''],
                ['1pm @ Rockwall HS'],
                ['7pm @ Rockwall HS'],
                ['7pm @ Rockwall HS'],
                ['7pm @ Rockwall HS'],
                ['7pm @ Rockwall HS'],
                ['Show', 'Cast Called @ 6pm'],
                ['Show', 'Cast Called @ 6pm'],
                ['Show', 'Cast Called @ 1pm'],
                [''],
                [''],
                [''],
                ['7pm @ Rockwall HS', 'Brush up'],
                ['Show', 'Cast Called @ 6pm'],
                ['Show', 'Cast Called @ 6pm'],
                ['Show', 'Cast Called @ 1pm'],
                [''],
            ]
        ]
    });

    

    const handleClick = () => {
        setCalendarInfo({ ...calendarInfo, currentMonth: calendarInfo.currentMonth == 0 ? calendarInfo.currentMonth + 1 : calendarInfo.currentMonth - 1 })
    }

    return (
        <main>
            {Auth.loggedIn() ? (
                <>
                    <div className="month">
                        <ul>
                            <li className="prev" onClick={handleClick}>&#10094;</li>
                            <li className="next" onClick={handleClick}>&#10095;</li>
                            <li>{calendarInfo.months[calendarInfo.currentMonth]}<br /><span>2025</span></li>
                        </ul>
                    </div>

                    <ul className="weekdays">
                        <li>Su</li>
                        <li>Mo</li>
                        <li>Tu</li>
                        <li>We</li>
                        <li>Th</li>
                        <li>Fr</li>
                        <li>Sa</li>
                    </ul>

                    <ul className="days">
                        {Array.from<number>({ length: calendarInfo.startingDay[calendarInfo.currentMonth] }).map((_day, index) => {
                            return (
                                <li className="null-day" key={`nullday${index}`}></li>
                            )
                        })}
                        {Array.from<number>({ length: calendarInfo.daysInMonth[calendarInfo.currentMonth] }).map((_day, index) => {
                            return (
                                <li key={`day${index + 1}`}>
                                    <div className={`day-number ${today - 1 == index && month == calendarInfo.currentMonth + 4 && "active"}`}>
                                        {`${index + 1}`}
                                    </div>
                                    <ul className="events">
                                        {calendarInfo.events[calendarInfo.currentMonth][index].map(item => {
                                            return (
                                                <li>{item}</li>
                                            )
                                        })}
                                    </ul>
                                </li>
                            )
                        })}
                    </ul>
                </>
            ) : (
                <LoginMessage />
            )}

        </main>
    )
}