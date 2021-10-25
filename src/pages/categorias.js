import React, { useState } from 'react';
import Head from 'next/head';
import styles from 'src/styles/pages/categorias.module.scss';
import Paper from '@mui/material/Paper';
import { Fab, IconButton, Table, TableBody, TableCell, TableContainer,TableRow } from '@mui/material';
import { Add, DeleteOutlined, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import CategoryItem from 'src/components/category/CategoryItem';
import MainDialog from 'src/components/category/dialogs/MainDialog';
import DeleteDialog from 'src/components/category/dialogs/DeleteDialog';

export default function Categorias() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [editData, setEditData] = useState({});

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

  function toggleAdd() {
    setIsAddOpen(!isAddOpen);
  }

  function toggleDelete() {
    setIsDelOpen(!isDelOpen);
  }

  function toggleEdit(name, color) {
    isEditOpen ? setEditData({}) : setEditData({name, color});
    setIsEditOpen(!isEditOpen);
  }

  return (
    <>
      <Head>
        <title>TimeLess - Categorias</title>
      </Head>

      <MainDialog role="add" title="Nova categoria" open={isAddOpen} handleClose={toggleAdd} />
      <MainDialog role="edit" title="Editar categoria" data={editData} open={isEditOpen} handleClose={toggleEdit} />
      <DeleteDialog open={isDelOpen} handleClose={toggleDelete} />

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
                        <IconButton title="Editar" color="primary" onClick={() => toggleEdit(row.name, row.color)}>
                          <EditOutlined />
                        </IconButton>
                        <IconButton color="primary" onClick={toggleDelete}>
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
        <Fab onClick={toggleAdd} className={styles.fab} color="secondary" aria-label="add">
          <Add />
        </Fab>
      </section>
    </>
  )
}