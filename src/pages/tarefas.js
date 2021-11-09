import React, { useState } from 'react';
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

export default function Tarefas() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  function toggleAdd() {
    setIsAddOpen(!isAddOpen);
  }

  return (
    <section className={styles.section}>

      <MainDialog title="Nova tarefa" open={isAddOpen} handleClose={toggleAdd} />

      <List sx={{ bgcolor: 'background.paper' }}>
        {
          [0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                secondaryAction={
                  <div className="asdasd">
                    <IconButton edge="end">
                      <EditOutlinedIcon color="primary" />
                    </IconButton>
                    <IconButton edge="end">
                      <DeleteOutlinedIcon color="primary" />
                    </IconButton>
                  </div>
                }
                disablePadding
              >
                <ListItemButton dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`Item ${value + 1}`} />
                </ListItemButton>
              </ListItem>
            );
          })
        }
      </List>
      <Fab onClick={toggleAdd} className={styles.fab} color="secondary" >
        <AddIcon />
      </Fab>
    </section>
  );
}