import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from 'src/styles/pages/categorias.module.scss';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Add from '@mui/icons-material/Add';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import CategoryItem from 'src/components/category/CategoryItem';
import MainDialog from 'src/components/category/MainDialog';
import DeleteDialog from 'src/components/category/DeleteDialog';
import { fetchData } from 'src/util/helpers';
import Typography from '@mui/material/Typography';

export default function Categorias() {
  const [categories, setCategories] = useState([]);
  //
  const [isAddOpen, setIsAddOpen] = useState(false);
  //
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({});
  //
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  function toggleAdd() {
    setIsAddOpen(!isAddOpen);
  }

  function toggleDelete(deleteId) {
    isDelOpen ? setDeleteId(null) : setDeleteId(deleteId);
    setIsDelOpen(!isDelOpen);
  }

  function toggleEdit(id, name, color) {
    isEditOpen ? setEditData({}) : setEditData({ id, name, color });
    setIsEditOpen(!isEditOpen);
  }

  async function reFetchData() {
    let response = await fetchData('/v1/category');
    setCategories(response);
  }

  useEffect(() => {
    async function setData() {
      let response = await fetchData('/v1/category');
      setCategories(response);
    }
    setData();

    /* document.addEventListener('dataChange', reFetchData);
    return () => document.removeEventListener('dataChange', reFetchData); */
  }, [])

  return (
    <>
      <Head>
        <title>TimeLess - Categorias</title>
      </Head>
      <section className={styles.section} id="cat-sect">

        <MainDialog role="add" title="Nova categoria" open={isAddOpen} handleClose={toggleAdd} reFetchData={reFetchData} />
        <MainDialog role="edit" title="Editar categoria" data={editData} open={isEditOpen} handleClose={toggleEdit} reFetchData={reFetchData} />
        <DeleteDialog open={isDelOpen} handleClose={toggleDelete} id={deleteId} reFetchData={reFetchData} />


        <h1>Categorias</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {
                categories.length > 0 ? (
                  categories.map(row => {
                    return (
                      <TableRow key={`row-${row.id}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell className={styles.item} component="th" scope="row">
                          <CategoryItem color={row.color}>{row.name}</CategoryItem>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton title="Editar" color="primary" onClick={() => toggleEdit(row.id, row.name, row.color)}>
                            <EditOutlined />
                          </IconButton>
                          <IconButton color="primary" onClick={() => toggleDelete(row.id)}>
                            <DeleteOutlined />
                          </IconButton>
                          <IconButton color="primary">
                            <VisibilityOutlined />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : null
              }
            </TableBody>
          </Table>
        </TableContainer>
        {
          categories.length === 0 ? (
            <Typography color="primary" variant="h5" style={{ background: '#121212' }}>Nenhuma categoria para mostrar...</Typography>
          ) : null
        }
        <Fab onClick={toggleAdd} className={styles.fab} color="secondary" aria-label="add">
          <Add />
        </Fab>
      </section>
    </>
  )
}