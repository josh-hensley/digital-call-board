import { useState, useEffect, FC } from "react"
import ReactCalendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const testData = [
    {
        date: "2025-10-01",
        events: [
            { time: "7pm", description: "Description for Event 1" },
            { time: "8pm", description: "Description for Event 2" },
            { time: "9pm", description: "Description for Event 3" }
        ]
    }
    ,
    {
        date: "2025-10-02",
        events: [
            { time: "6pm", description: "Description for Event A" },
            { time: "7pm", description: "Description for Event B" }
        ]
    },
    {
        date: "2025-09-15",
        events: [
            { time: "1pm", description: "Description for Event M" },
            { time: "3pm", description: "Description for Event N" },
            { time: "4pm", description: "Description for Event O" }
        ]
    },
    {
        date: "2025-08-23",
        events: [
            { time: "10am", description: "Description for Event I" },
            { time: "11am", description: "Description for Event J" },
            { time: "12pm", description: "Description for Event K" },
            { time: "1pm", description: "Description for Event L" }
        ]
    }
]

const Calendar: FC = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([
        { time: "7pm", description: "Description for Event 1" },
        { time: "8pm", description: "Description for Event 2" },
        { time: "9pm", description: "Description for Event 3" }
    ]);

    useEffect(() => {
        const dateString = date.toISOString().split('T')[0];
        const dayData = testData.find(d => d.date === dateString);
        if (dayData) {
            setEvents(dayData.events);
        } else {
            setEvents([]);
        }
    }, [date])

    const handleChange = (value: unknown) => {
        if (value instanceof Date) {
            setDate(value);
            setEvents([...events])
            console.log(value);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const newEvent = {
            time: formData.get("time") as string,
            description: formData.get("description") as string
        }
        setEvents([...events, newEvent]);
        form.reset();
        console.log(newEvent);
    }

    return (
        <main>
            <div className="container d-flex flex-column align-items-center py-4">
                <ReactCalendar calendarType="gregory" showNeighboringMonth={false} onChange={handleChange} />
            </div>
            <form onSubmit={handleSubmit} className="form-control container">
                <label htmlFor="date" className="form-label">Date:</label>
                <input className="form-control" onClick={e => e.preventDefault()} type="date" value={date.toISOString().split('T')[0]} name="date" />
                <label htmlFor="time" className="form-label">Time:</label>
                <input className="form-control" type="time" value={`19:00`} name="time" />
                <label htmlFor="description" className="form-label">Description:</label>
                <input className="form-control" type="text" name="description" />
                <button className="btn btn-primary mt-2" type="submit">Add</button>
            </form>
            <div className="container bg-transparent">
                <h2 className="text-light my-2">{date.toDateString()}</h2>
                <div className="container py-2">
                    {events.map((event, index) => {
                        return (
                            <div key={index} className="card my-2">
                                <div className="card-body">
                                    <h5 className="card-title">{event.time}</h5>
                                    <p className="card-text">{event.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

export default Calendar;