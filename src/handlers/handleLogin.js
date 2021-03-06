import { apiUrl } from "src/util/env";

export default async function handleLogin(data, router) {
  fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password
    })
  })
  .then(res => {
    if (res.ok) {
      window.localStorage.setItem('token', res.headers.get('Authorization'));
      router.push('/categorias');
      return 'ok';
    } else {
      throw new Error(res.status)
    }
  })
  .catch(error => console.log(error))
}