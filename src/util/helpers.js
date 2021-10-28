import { apiUrl } from "./env";

export async function fetchData(url)  {
  const res = await fetch(`${apiUrl}${url}`, {
    headers: {
      'Authorization': localStorage.getItem('token'),
    }
  })
  const data = await res.json();
  return data;
}