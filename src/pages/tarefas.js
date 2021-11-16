import React, { useEffect, useState } from 'react';
import styles from 'src/styles/pages/tarefas.module.scss';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Fab from '@mui/material/Fab';
import MainDialog from 'src/components/task/MainDialog';
import CategoryItem from 'src/components/category/CategoryItem';
import { fetchData } from 'src/util/helpers';

export default function Tarefas() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  //
  const [isAddOpen, setIsAddOpen] = useState(false);
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
    setSelected(id)
  }

  function closeDialog() {
    setIsAddOpen(false);
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

      <List sx={{ bgcolor: 'background.paper' }}>
        {
          tasks.length > 0 ? (
            tasks.map((task, index) => {
              const labelId = `checkbox-list-label-${index}`;;
              return (
                <ListItem
                  key={`item-${index}`}
                  secondaryAction={
                    <div>
                      <IconButton edge="end" onClick={() => toggleEdit(task.id)}>
                        <EditOutlinedIcon color="primary" />
                      </IconButton>
                      <IconButton edge="end">
                        <DeleteOutlinedIcon color="primary" />
                      </IconButton>
                    </div>
                  }
                  disablePadding
                >
                  <ListItemButton dense style={{ flex: 'initial' }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={task.name} />
                    <div className={styles.taskItems}>
                      <CategoryItem color={categories.find(cat => cat.id === task.categoryId).color}>
                        {categories.find(cat => cat.id === task.categoryId).name}
                      </CategoryItem>
                    </div>
                  </ListItemButton>
                </ListItem>
              );
            })
          ) : null
        }
      </List>
      <Fab onClick={toggleAdd} className={styles.fab} color="secondary" >
        <AddIcon />
      </Fab>
    </section>
  );
}