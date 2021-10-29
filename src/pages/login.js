import React from 'react';
import Head from 'next/head'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'src/components/common/Link';
import styles from 'src/styles/pages/cadastro.module.scss';
import handleLogin from 'src/handlers/handleLogin';
import PassWordToggle from 'src/components/common/PassWordToggle';

export default function Home() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false)

  const handleShowPass = () => setShowPass(!showPass);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username: user,
      password: pass,
    }
    handleLogin(data);
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
            <PassWordToggle handleShowPass={handleShowPass} showPass={showPass} onChange={e => setPass(e.target.value)} id="pass" />
            <Button variant="contained" type="submit">Entrar</Button>
          </form>
          <Typography variant="caption">Não é cadastrado? </Typography>
          <Link variant="caption" href="/cadastro">Crie uma conta →</Link>
        </div>
      </section >
    </>
  )
}
