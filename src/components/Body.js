/* eslint-disable eqeqeq */
import { useEffect, useState } from "react"
import format from "date-fns/format"
import parse from 'date-fns/parse'
import { parseJSON } from 'date-fns'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { dateFnsLocalizer } from "react-big-calendar"
import DateTimePicker from "react-datetime-picker/dist/DateTimePicker"
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import { Calendar } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import events from "../data/events"
import { parseISO } from "date-fns/esm"
// import EditModal from "./EditModal"


const locales ={
    "en-US" : require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    parseJSON,
    startOfWeek,
    getDay,
    locales
})


function Body() {
    const [ newEvent, setNewEvent ] = useState({ title: "", start: new Date(0), end: new Date(0)})
    // const [ allEvents, setAllEvents ] = useState(events)
    /*const [currentEvent, setCurrentEvent] = useState("")*/
    // console.log(newEvent)

    const [ allEvents, setAllEvents ] = useState(() => {

        const savedEvents = localStorage.getItem("events")

        if (savedEvents) {
            console.log('| parse: ',JSON.parse(localStorage.getItem("events")))
            return JSON.parse(localStorage.getItem("events"))
        } else {
            return events
        }
    })

    useEffect(() => {
        // console.log(allEvents)
        localStorage.setItem("events", JSON.stringify(allEvents))
        // console.log("stringify: "+JSON.stringify(allEvents))
    }, [allEvents])

    // function convert(str) {
    //     var date = new Date(str),
    //         mnth = ("0" + (date.getMonth()+1)).slice(-2),
    //         day  = ("0" + date.getDate()).slice(-2);
    //     var hours  = ("0" + date.getHours()).slice(-2);
    //     var minutes = ("0" + date.getMinutes()).slice(-2);
    //     return [ date.getFullYear(), mnth, day, hours, minutes ].join(", ");
    // }

    function handleAddEvent(e){
        e.preventDefault()
        console.log(newEvent)
        if (newEvent.title !== "") {
            
            setAllEvents([
                ...allEvents,
                newEvent
            ])
        }
        console.log(allEvents)
        setNewEvent({ title: "", start: new Date(0), end: new Date(0)})

    }  
    
    return (
        <div className="cal-body">
            <div className="picker">
                <input 
                    type="text"
                    value={newEvent.title} 
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <DateTimePicker
                    disableClock={true}
                    disableCalendar={true}
                    selected={newEvent.start}
                    format="MM-dd-yyyy hh:mm a"
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    hourPlaceholder="hh"
                    minutePlaceholder="mm"
                    // onChange={(value) => console.log(new Date(value))}
                    onChange={(start) => setNewEvent({...newEvent, start: new Date(start)})}
                />
                <DateTimePicker
                    disableClock={true}
                    disableCalendar={true}
                    style={{
                        background: "white"
                    }}
                    selected={newEvent.end}
                    format="MM-dd-yyyy hh:mm a"
                    dayPlaceholder="dd"
                    monthPlaceholder="MM"
                    yearPlaceholder="yyyy"
                    hourPlaceholder="hh"
                    minutePlaceholder="mm"
                    onChange={(end) => setNewEvent({...newEvent, end: new Date(end)})}
                />
                <button className="button" onClick={handleAddEvent}>Add</button>
            </div>
            
            <div className="calendar">
                <Calendar
                    selectable='ignoreEvents'
                    localizer={localizer}
                    events={allEvents}
                    startAccessor="start"
                    endAccessor="end"
                    popup="true"
                    // onSelectEvent={event => alert(event.title)}
                    // onSelectSlot={handleSelect}
                    style={{ 
                        height: 500, 
                        margin:"50px", 
                        background: "white", 
                        color: "black",
                        border: "2px solid black" }}
                />
            </div>
        </div>
    )
}

export default Body
