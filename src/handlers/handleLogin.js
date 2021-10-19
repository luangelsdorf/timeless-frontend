export default function handleLogin(data) {
  fetch('http://168.232.7.161/login', {
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
  .then(res => console.log(res.headers.get('Authorization')));
}