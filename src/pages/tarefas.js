import React, { useEffect, useState } from 'react';
import styles from 'src/styles/pages/tarefas.module.scss';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Fab from '@mui/material/Fab';
import Check from '@mui/icons-material/Check';
import MainDialog from 'src/components/task/MainDialog';
import CategoryItem from 'src/components/category/CategoryItem';
import { fetchData, getDuration } from 'src/util/helpers';
import { completeTask } from 'src/handlers/tasks';
import DeleteDialog from 'src/components/category/DeleteDialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Tarefas() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  //
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [role, setRole] = useState('');

  function toggleAdd() {
    setRole('add');
    setIsAddOpen(!isAddOpen);
  }

  function toggleEdit(id) {
    setRole('edit');
    setSelected(id)
    setIsAddOpen(!isAddOpen);
  }

  function toggleDelete(id) {
    setSelected(id);
    setIsDelOpen(!isAddOpen);
  }

  function closeDialog() {
    setIsAddOpen(false);
    setIsDelOpen(false);
  }

  async function reFetchData() {
    let response = await fetchData('/v1/task');
    setTasks(response);
  }

  useEffect(() => {
    async function setData() {
      let categories = await fetchData('/v1/category');
      let tasks = await fetchData('/v1/task');
      setCategories(categories);
      setTasks(tasks)
    }
    setData();
  }, [])

  function complete(id) {
    completeTask(id).then(() => reFetchData());
  }

  return (
    <section className={styles.section}>

      <MainDialog
        selected={tasks.find(task => task.id === selected)}
        categories={categories}
        role={role}
        open={isAddOpen}
        handleClose={closeDialog}
        reFetchData={reFetchData}
      />
      <DeleteDialog
        type="task"
        open={isDelOpen}
        handleClose={closeDialog}
        id={selected}
        reFetchData={reFetchData}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {
              tasks.length > 0 ? (
                tasks.map((task, index) => {
                  return (
                    <TableRow key={`row-${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>
                        <IconButton style={{ marginRight: '12px' }} color="secondary" onClick={() => complete(task.id)}>
                          <Check />
                        </IconButton>
                        {task.name}
                      </TableCell>
                      {/* <TableCell>
                        { getDuration(task) }
                      </TableCell> */}
                      <TableCell align="left">
                        <CategoryItem color={categories.find(cat => cat.id === task.categoryId).color}>
                          { categories.find(cat => cat.id === task.categoryId).name }
                        </CategoryItem>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton edge="end" onClick={() => toggleEdit(task.id)}>
                          <EditOutlinedIcon color="primary" />
                        </IconButton>
                        <IconButton edge="end" onClick={() => toggleDelete(task.id)}>
                          <DeleteOutlinedIcon color="primary" />
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

      <Fab onClick={toggleAdd} className={styles.fab} color="secondary" >
        <AddIcon />
      </Fab>
    </section>
  );
}