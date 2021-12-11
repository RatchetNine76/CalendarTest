/* eslint-disable eqeqeq */
import { useEffect, useState } from "react"
import format from "date-fns/format"
import parse from 'date-fns/parse'
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
import EditModal from "./EditModal"


const locales ={
    "en-US" : require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})


function Body() {
    const [ newEvent, setNewEvent ] = useState({ title: "", start: "", end: ""})
    /*const [ allEvents, setAllEvents ] = useState(events)*/
    const [openModal, setOpenModal] = useState(false)
    /*const [currentEvent, setCurrentEvent] = useState("")*/

    // const [ allEvents, setAllEvents ] = useState(() => {

    //     const savedEvents = localStorage.getItem("events")

    //     if (savedEvents) {
    //         return JSON.parse(savedEvents)
    //     } else {
    //         return events
    //     }
    // })

    const [allEvents, setAllEvents] = useState(events);

    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(allEvents))
    }, [allEvents])

    ///to edit the event
    /*
    function handleEditInputChange(e) {
        setCurrentEvent({...currentEvent, title: e.target.value})
    }

    function handleClickEvent(newEvent){
        setOpenModal(true)
        setCurrentEvent({...newEvent})
    }

    function handleEditFormSubmit(e) {
        e.preventDefault()
        handleUpdateEvent(currentEvent.title, currentEvent)
    }

    function handleUpdateEvent(title, updatedEvent) {
        const updatedItem = allEvents.map((event) => {
            return event.title === title ? updatedEvent : event
        })
        setAllEvents(updatedItem)
    }*/

    // function handleAddEvent(e){
    //     e.preventDefault()
        
    //     if (newEvent !== "") {
    //         setAllEvents([
    //             ...allEvents,
    //             newEvent
    //         ])
    //     }
        
    //     console.log(newEvent)
    //     setNewEvent({ title: "", start: "", end: "" })
    // }  

    function handleAddEvent() {
        console.log(newEvent)
        setAllEvents([...allEvents, newEvent]);
    }
    
    return (
        <div className="cal-body">
            {/* <div className="picker">
                <input 
                    type="text"
                    value={newEvent.title} 
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <DateTimePicker
                    disableClock={true}
                    disableCalendar={true}
                    selected={newEvent.start}
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    hourPlaceholder="hh"
                    minutePlaceholder="mm"
                    onChange={(start) => setNewEvent({...newEvent, start})}
                />
                <DateTimePicker
                    disableClock={true}
                    disableCalendar={true}
                    style={{
                        background: "white"
                    }}
                    selected={newEvent.end}
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    hourPlaceholder="hh"
                    minutePlaceholder="mm"
                    onChange={(end) => setNewEvent({...newEvent, end})}
                />
                <button className="button" onClick={handleAddEvent}>Add</button>
            </div> */}
            
            {openModal && 
                <EditModal 
                    closeModal={setOpenModal}
                    /*onEditInputChange={handleEditInputChange}
                    onEditFormSubmit={handleEditFormSubmit} *//>}
            <div className="calendar">
                <Calendar
                    selectable
                    localizer={localizer}
                    events={allEvents}
                    startAccessor="start"
                    endAccessor="end"
                    popup="true"
                    onSelectEvent={() => setOpenModal(true)}
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
