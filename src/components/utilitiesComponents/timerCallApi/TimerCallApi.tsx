import { useState } from 'react'

const TimerCallApi = () => {

    const [time, setTime] = useState(0);
    const [isTimerOn, setIsTimerOn] = useState(false);

    const increment = () => {
        if (!isTimerOn) {
            setTime(prevTime => prevTime + 1)
            setIsTimerOn(true);
        } else {
            setTime(0);
        }
    }

    return { increment, time, setTime, isTimerOn, setIsTimerOn }
}

export default TimerCallApi