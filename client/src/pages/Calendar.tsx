import { useState, useEffect, FC, FormEvent } from "react"
import ReactCalendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const Calendar: FC = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([
        { time: "7pm", description: "Description for Event 1" },
        { time: "8pm", description: "Description for Event 2" },
        { time: "9pm", description: "Description for Event 3" }
    ]);
    const [newEvent, setNewEvent] = useState({
        date: date.toISOString().split('T')[0],
        time: "",
        description: ""
    })

    useEffect(() => {
        const dateString = date.toISOString().split('T')[0];
        const getEvents = async (date: string) => {
            try {
                const response = await fetch(`/api/events?date=${date}`);
                const data = await response.json()
                setEvents(data)
            } catch (error) {
                console.log(error)
            }
        }
        getEvents(dateString)
    }, [date])

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target as HTMLInputElement;
        setNewEvent({ ...newEvent, [name]: value })
    }

    const handleDateChange = (value: unknown) => {
        if (value instanceof Date) {
            setDate(value)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const body = JSON.stringify(newEvent)
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            })
            const data = await response.json();
            console.log('New Event Created: ', data.id)
            setEvents([...events, data])
            setNewEvent({ date: date.toISOString().split('T')[0], time: "", description: "" })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main>
            <div className="container d-flex flex-column align-items-center py-4">
                <ReactCalendar calendarType="gregory" showNeighboringMonth={false} onChange={handleDateChange} />
            </div>
            <form onSubmit={handleSubmit} className="form-control container">
                <label htmlFor="date" className="form-label">Date:</label>
                <input className="form-control" onClick={e => e.preventDefault()} type="date" value={date.toISOString().split('T')[0]} name="date" />
                <label htmlFor="time" className="form-label">Time:</label>
                <input className="form-control" type="time" value={newEvent.time} onChange={handleChange} name="time" />
                <label htmlFor="description" className="form-label">Description:</label>
                <input className="form-control" type="text" name="description" value={newEvent.description} onChange={handleChange} />
                <button className="btn btn-primary mt-2" type="submit">Add</button>
            </form>
            <div className="container bg-transparent">
                <h2 className="text-light my-2">{date.toDateString()}</h2>
                <div className="container py-2">
                    {events?.map((event, index) => {
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