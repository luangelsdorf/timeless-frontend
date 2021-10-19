export default function handleRegister(data) {
  fetch('http://168.232.7.161/v1/user/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(() => {
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
        .then(res => res.json())
        .then(ponse => {
          console.log(ponse);
        })
    })
    .catch(() => {
      console.log('Ocorreu um erro.');
    })
}