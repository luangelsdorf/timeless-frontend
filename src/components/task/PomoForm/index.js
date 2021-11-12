import React from 'react'

export default function PomoForm({ pomoConfig, setPomoConfig }) {
  const [focusTime, setFocusTime] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [cyclesUntilLongBreak, setCyclesUntilLongBreak] = useState(3);
  const [cycles, setCycles] = useState(0);
  //
  const [pomodoro, setPomodoro] = useState(pomoConfig);

  return (
    <div>
      jooj
    </div>
  )
}
