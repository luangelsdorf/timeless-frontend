import React from 'react';
import Head from 'next/head'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import Link from 'src/components/common/Link';
import handleRegister from 'src/handlers/handleRegister';
import styles from 'src/styles/pages/cadastro.module.scss';
import PassWordToggle from 'src/components/common/PassWordToggle';

export default function Home() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [nick, setNick] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [createdUser, setCreatedUser] = useState({});
  const [showPass, setShowPass] = useState(false)

  const handleShowPass = () => setShowPass(!showPass);

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username: user,
      email: email,
      displayName: nick,
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
            <PassWordToggle handleShowPass={handleShowPass} showPass={showPass} onChange={e => setPass(e.target.value)} id="pass" />
            <PassWordToggle handleShowPass={handleShowPass} showPass={showPass} onChange={e => setConfPass(e.target.value)} id="confPass" />
            <Button variant="contained" type="submit">Criar conta!</Button>
          </form>

          <Typography variant="caption">Já é cadastrado? </Typography>
          <Link variant="caption" href="/login">Entre →</Link>
        </div>
      </section >
    </>
  )
}
