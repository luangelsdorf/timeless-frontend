import { apiUrl } from "./env";

export async function fetchData(url) {
  const res = await fetch(`${apiUrl}${url}`, {
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    }
  })
  const data = await res.json();
  return data;
}

export async function makeRequest(url, method, body) {
  const res = await fetch(url, {
    method: method,
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    },
    body: JSON.stringify(body),
  })
  /* const payload = res.ok ? await res.json() : console.error(await res.json()); */
  if (res.ok) {
    if (method !== 'DELETE') return await res.json();
    else return 'ok';
  }
}

const handleChange = () => {
  let inputs = document.querySelectorAll('input[type="number"]');
  for (const element of inputs) {
    if (!element.value) return;
  }

  let minutes = 0;
  let longBreakCounter = 0;
  let isLongBreak = false;
  let timeline = [];
  for (let cycIndex = 0; cycIndex < cycles; cycIndex++) {
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