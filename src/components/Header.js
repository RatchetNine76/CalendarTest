import { useState, useEffect } from "react"

function Header() {
    const [date, setDate] = useState(new Date());
  
  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
    
    return (
        <div>
            <h1>{date.toDateString()} - {date.toLocaleTimeString()}</h1>
        </div>
    )
}

export default Header
