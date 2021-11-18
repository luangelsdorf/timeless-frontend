import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react'
import { deleteCategory } from 'src/handlers/category';
import { deleteTask } from 'src/handlers/tasks';
import styles from './DeleteDialog.module.scss';

export default function DeleteDialog({ type, open, handleClose, id, reFetchData }) {

  function handleDelete() {
    if (type === 'cat') {
      deleteCategory(id).then(() => reFetchData());
    } else {
      deleteTask(id).then(() => reFetchData());
    }
    handleClose();
  }

  return (
    <div className={styles.deleteDialog}>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{`Excluir ${type === 'cat' ? 'categoria' : 'tarefa'}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Você tem certeza que deseja excluir esta  ${type === 'cat' ? 'categoria' : 'tarefa'} da lista?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={handleDelete} autoFocus>Excluir</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
