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
  const payload = res.ok ? await res.json() : console.error(await res.json());
  return payload;
}