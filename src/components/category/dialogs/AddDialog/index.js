import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './AddDialog.module.scss';

export default function AddDialog(props) {
  const [color, setColor] = useState('');
  const [name, setName] = useState('');

  let title;
  if (props.role === 'add') title = 'Nova categoria';

  function handleSubmit(e) {
    e.target.reset();
    e.preventDefault();
    console.log(`${name}, ${color}`);
  }

  return (
    <div className={styles.addDialog}>
      <Dialog open={props.open} onClose={props.handleClose} keepMounted>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent className={styles.content}>
          <form onSubmit={handleSubmit} id="colorForm">
            <div className={styles.inputWrapper}>
              <label>
                <input
                  className={styles.input}
                  type="color"
                  required
                  onChange={e => setColor(e.target.value)}
                  id="taskColor"
                />
              </label>
            </div>
            <TextField
              autoFocus
              required
              margin="dense"
              id="color"
              label="Nome"
              type="text"
              fullWidth
              variant="standard"
              onChange={e => setName(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancelar</Button>
          <Button type="submit" form="colorForm" disabled={name && color ? false : true} onClick={props.handleClose}>Criar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}