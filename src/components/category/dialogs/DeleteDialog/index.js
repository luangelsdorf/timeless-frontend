import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react'
import styles from './DeleteDialog.module.scss';

export default function DeleteDialog({open, handleClose}) {
  return (
    <div className={styles.deleteDialog}>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Excluir categoria?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem certeza que deseja excluir esta categoria da lista?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={handleClose} autoFocus>Excluir</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
