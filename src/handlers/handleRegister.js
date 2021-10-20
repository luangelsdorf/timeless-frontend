import handleLogin from "./handleLogin";

export default function handleRegister(data) {
  fetch('http://168.232.7.161/v1/user/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      handleLogin(data);
    })
}