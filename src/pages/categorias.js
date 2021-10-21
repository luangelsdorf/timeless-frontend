import React, { useState } from 'react';
import Head from 'next/head';
import styles from 'src/styles/pages/categorias.module.scss';
import Paper from '@mui/material/Paper';
import { Collapse, Fab, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function Categorias() {
  const [show, setShow] = useState(false)

  function createData(name, color, actions) {
    return { name, color, actions };
  }

  const rows = [
    createData('Lazer', '#aa751b', 'asdads'),
    createData('Trabalho', '#facada', 'asdads'),
    createData('Escola', '#df8b52', 'asdads'),
    createData('Etc', '#ffde87', 'asdads'),
    createData('Asd', '#0a0a0a', 'asdads'),
  ];

  const fabStyle = {
    position: 'relative',
    bottom: '0px',
    right: '0px',
  }

  function handleClick() {
    setShow(!show);
  }

  return (
    <>
      <Head>
        <title>TimeLess - Categorias</title>
      </Head>

      {/* <section className={styles.section}>
        <List>
          <ListItem button>
            <Typography variant="h6" className={styles.item}>Trabalho</Typography>
          </ListItem>
          <ListItem button>
            <Typography variant="h6" className={styles.item}>Lazer</Typography>
          </ListItem>
        </List>
      </section> */}

      <section className={styles.section}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Cor</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rows.map((row) => {
                  return (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell>{row.color}</TableCell>
                      <TableCell>{row.actions}</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Collapse in={show}>
          <Typography variant="h3">Ola</Typography>
        </Collapse>
        <Fab onClick={handleClick} className={styles.fab} color="primary" aria-label="add">
          <Add />
        </Fab>
      </section>
    </>
  )
}