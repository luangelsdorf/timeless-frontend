import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './AddDialog.module.scss';

export default function AddDialog(props) {
  const [color, setColor] = useState('#708090');
  const [name, setName] = useState('');
  console.info(`%cState: ${name}, ${color}`, 'color: lightblue');

  if (props.data) console.log(props.data);

  let title = props.role === 'add' ? 'Nova categoria' : 'Editar categoria';

  function handleSubmit(e) {
    e.preventDefault();
    console.warn(`SUBMITTED - ${name}, ${color}`);
    setColor('#708090');
    setName('');
  }

  useEffect(() => {
    if (props.role === 'edit' && props.open) {
      setColor(props.data.color);
      setName(props.data.name);
    }
  }, [props.open])

  return (
    <div className={styles.addDialog}>
      <Dialog open={props.open} onClose={props.handleClose} keepMounted>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent className={styles.content}>
          <form onSubmit={handleSubmit} id={props.role === 'edit' ? 'editCat' : 'addCat'}>
            <div className={styles.inputWrapper}>
              <label>
                <input
                  className={styles.input}
                  type="color"
                  required
                  onChange={e => setColor(e.target.value)}
                  key={color}
                  value={color}
                />
              </label>
            </div>
            <TextField
              autoFocus
              required
              margin="dense"
              label="Nome"
              type="text"
              fullWidth
              variant="standard"
              onChange={e => setName(e.target.value)}
              key={name}
              value={name}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancelar</Button>
          <Button
            type="submit"
            form={props.role === 'edit' ? 'editCat' : 'addCat'}
            disabled={name && color ? false : true}
            onClick={props.handleClose}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}