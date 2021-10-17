import React from 'react';
import Head from 'next/head'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import Link from 'src/components/common/Link';

export default function Home() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [nick, setNick] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [createdUser, setCreatedUser] = useState({});

  function toggleVisibility(e) {
    let target = e.target;
    if (target.previousSibling.type === 'password') {
      target.previousSibling.type = 'text';
    } else {
      target.previousSibling.type = 'password';
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username: user,
      email: email,
      nickname: nick,
      password: pass,
      confirmationPassword: confPass,
    }

    fetch('http://168.232.7.161/v1/user/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        fetch('http://168.232.7.161/v1/user/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user,
            password: pass
          })
        })
          .then(res => res.json())
          .then(ponse => {
            setCreatedUser(ponse);
            console.log(createdUser);
          })
      })
  }

  return (
    <>
      <Head>
        <title>TimeLess - Cadastro</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="infinity.svg" type="image/x-icon" />
      </Head>

      <section >
        <h1>Seja Bem-vindo ao TimeLess!</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <TextField variant="standard" size="small" margin="dense" fullWidth required id="user" label="Nome de Usuário" onChange={e => setUser(e.target.value)} />
            <TextField variant="standard" size="small" margin="dense" fullWidth required id="email" label="Endereço de e-mail" type="email" onChange={e => setEmail(e.target.value)} />
            <TextField variant="standard" size="small" margin="dense" fullWidth required id="displayName" label="Apelido" onChange={e => setNick(e.target.value)} />
            <TextField variant="standard" size="small" margin="dense" fullWidth required id="pass" label="Senha" type="password" onChange={e => setPass(e.target.value)} />
            <TextField variant="standard" size="small" margin="dense" fullWidth required id="confirmPass" label="Confirme sua senha" type="password" onChange={e => setConfPass(e.target.value)} />
            <Button variant="contained" type="submit">Criar conta!</Button>
          </form>

          <Typography variant="caption">Já tem conta? </Typography>
          <Link variant="caption" href="/login">Entre →</Link>
        </div>
      </section >
    </>
  )
}
