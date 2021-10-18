import React from 'react';
import Head from 'next/head'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import Link from 'src/components/common/Link';
import handleRegister from 'src/handlers/handleRegister';
import styles from 'src/styles/pages/cadastro.module.scss';

export default function Home() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [nick, setNick] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [createdUser, setCreatedUser] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username: user,
      email: email,
      nickname: nick,
      password: pass,
      confirmationPassword: confPass,
    }

    handleRegister(data);
  }

  return (
    <>
      <Head>
        <title>TimeLess - Cadastro</title>
      </Head>

      <section className={styles.section}>
        <h1>Seja Bem-vindo ao TimeLess!</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <TextField variant="standard" size="small" margin="dense" fullWidth required id="user" label="Nome de Usuário" onChange={e => setUser(e.target.value)} />
            <TextField variant="standard" size="small" margin="dense" fullWidth required id="email" label="Endereço de e-mail" type="email" onChange={e => setEmail(e.target.value)} />
            <TextField variant="standard" size="small" margin="dense" fullWidth required id="displayName" label="Apelido" onChange={e => setNick(e.target.value)} />
            <TextField variant="standard" size="small" margin="dense" fullWidth required id="pass" label="Senha" type="password" onChange={e => setPass(e.target.value)} />
            <TextField variant="standard" size="small" margin="dense" fullWidth required id="confirmPass" label="Confirme sua senha" type="password" onChange={e => setConfPass(e.target.value)} />
            <Button variant="contained" type="submit">Criar conta!</Button>
          </form>

          <Typography variant="caption">Já é cadastrado? </Typography>
          <Link variant="caption" href="/login">Entre →</Link>
        </div>
      </section >
    </>
  )
}
