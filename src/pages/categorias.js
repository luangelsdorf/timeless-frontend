import React, { useState } from 'react';
import Head from 'next/head';
import styles from 'src/styles/pages/categorias.module.scss';
import Paper from '@mui/material/Paper';
import { Button, Collapse, Fab, IconButton, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add, Delete, DeleteOutlined, Edit, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import CategoryItem from 'src/components/category/CategoryItem';

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
        <h1>Categorias</h1>
        <TableContainer component={Paper}>
          <Table>
            {/* <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Cor</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead> */}
            <TableBody>
              {
                rows.map((row, index) => {
                  return (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell className={styles.item} component="th" scope="row">
                        <CategoryItem color={row.color}>{row.name}</CategoryItem>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton color="primary">
                          <EditOutlined />
                        </IconButton>
                        <IconButton color="primary">
                          <DeleteOutlined />
                        </IconButton>
                        <IconButton color="primary">
                          <VisibilityOutlined />
                        </IconButton>
                      </TableCell>
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
        <Fab onClick={handleClick} className={styles.fab} color="secondary" aria-label="add">
          <Add />
        </Fab>
      </section>
    </>
  )
}