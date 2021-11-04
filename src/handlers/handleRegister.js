import { apiUrl } from "src/util/env";
import handleLogin from "./handleLogin";

export default function handleRegister(data, router) {
  fetch(`${apiUrl}/v1/user/create`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (res.ok) {
        handleLogin(data, router);
      } else {
        res.json().then(res => {
          throw new Error(res.erros[0].message)
        })
      }
    })
    .catch(error => console.log(error))
}