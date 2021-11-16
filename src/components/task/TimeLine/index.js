import React, { useEffect, useState } from 'react';
import styles from './TimeLine.module.scss';

export default function TimeLine({ fields }) {
  const [totalTime, setTotalTime] = useState(0);
  const [times, setTimes] = useState([]);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  let { focusTime, shortBreak, longBreak, cyclesUntilLongBreak, repeats } = fields;

  const handleChange = () => {
    let inputs = document.querySelectorAll('.pomodoros input[type="number"]');
    for (const element of inputs) {
      if (!element.value) return;
    }

    let minutes = 0;
    let longBreakCounter = 0;
    let isLongBreak = false;
    let timeline = [];
    for (let cycIndex = 0; cycIndex < repeats; cycIndex++) {
      for (let index = 0; index < cyclesUntilLongBreak; index++) {
        if (longBreakCounter === cyclesUntilLongBreak - 1) {
          isLongBreak = true;
          longBreakCounter = 0;
        } else {
          isLongBreak = false;
          longBreakCounter += 1;
        }
        minutes += focusTime;
        timeline.push({ type: 'focus', duration: focusTime });

        if (isLongBreak) {
          minutes += longBreak;
          timeline.push({ type: 'longBreak', duration: longBreak });
        } else {
          minutes += shortBreak;
          timeline.push({ type: 'shortBreak', duration: shortBreak });
        }
      }
    }
    setTotalTime(minutes);
    setTotalHours(Math.floor(minutes / 60));
    setTotalMinutes(minutes % 60)
    setTimes(timeline);
  }

  useEffect(() => {
    handleChange();
  }, [fields])

  /* console.log(times); */

  return (
    <section className={styles.section}>
      <div>
        <span>{`Tempo total: ${totalHours} hora`}</span>
        {(totalHours) > 1 ? 's' : ''}
        <span>{!!(totalMinutes) ? (` e ${totalMinutes} minutos`) : null}</span>
      </div>
      <div className={styles.timeline}>
        <div>
          {
            times.map((item, index) => {
              return (
                <div
                  className={`${styles.timeSection} ${item.type}`}
                  key={`timeSection-${index}`}
                  style={{ width: `${(item.duration * 100) / totalTime}%` }}
                />
              )
            })
          }
        </div>
      </div>

      <div className={styles.legend}>
        <div>Foco</div>
        <div>Pausa curta</div>
        <div>Pausa Longa</div>
      </div>
    </section>
  )
}
