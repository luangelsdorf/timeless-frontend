import React, { useState } from 'react';
import Head from 'next/head';
import styles from 'src/styles/pages/categorias.module.scss';
import Paper from '@mui/material/Paper';
import { Fab, IconButton, Table, TableBody, TableCell, TableContainer,TableRow } from '@mui/material';
import { Add, DeleteOutlined, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import CategoryItem from 'src/components/category/CategoryItem';
import AddDialog from 'src/components/category/dialogs/AddDialog';

export default function Categorias() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  function createData(name, color, actions) {
    return { name, color, actions };
  }

  const rows = [
    createData('Lazer', '#aa751b',),
    createData('Trabalho', '#facada',),
    createData('Escola', '#df8b52',),
    createData('Um', '#ffde87',),
    createData('Dois', '#0a0a0a',),
  ];

  const fabStyle = {
    position: 'relative',
    bottom: '0px',
    right: '0px',
  }

  function toggleAdd() {
    setShow(!show);
  }

  function openAdd() {
    setIsAddOpen(true);
  }

  function closeAdd() {
    setIsAddOpen(false)
  }

  return (
    <>
      <Head>
        <title>TimeLess - Categorias</title>
      </Head>

      <AddDialog role="add" open={isAddOpen} handleClose={closeAdd} />

      <section className={styles.section}>
        <h1>Categorias</h1>
        <TableContainer component={Paper}>
          <Table>
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
        <Fab onClick={openAdd} className={styles.fab} color="secondary" aria-label="add">
          <Add />
        </Fab>
      </section>
    </>
  )
}