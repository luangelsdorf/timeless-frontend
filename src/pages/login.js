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
  const [pass, setPass] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username: user,
      password: pass,
    }

    handleRegister(data);
  }

  return (
    <>
      <Head>
        <title>TimeLess - Login</title>
      </Head>

      <section className={styles.section}>
        <h1>Seja Bem-vindo de volta ao TimeLess!</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <TextField variant="standard" size="small" margin="dense" fullWidth required id="user" label="Nome de Usuário" onChange={e => setUser(e.target.value)} />
            <TextField variant="standard" size="small" margin="dense" fullWidth required id="pass" label="Senha" type="password" onChange={e => setPass(e.target.value)} />
            <Button variant="contained" type="submit">Entrar</Button>
          </form>

          <Typography variant="caption">Não é cadastrado? </Typography>
          <Link variant="caption" href="/cadastro">Crie uma conta →</Link>
        </div>
      </section >
    </>
  )
}
