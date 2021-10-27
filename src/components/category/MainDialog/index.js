import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './MainDialog.module.scss';

export default function MainDialog(props) {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.warn(`SUBMITTED - ${name}, ${e.target[0].value}`);
    setName('');
  }

  useEffect(() => {
    if (props.role === 'edit' && props.open) {
      document.querySelector('#editCat input[type="color"]').value = props.data.color;
      setName(props.data.name);
    }
  }, [props.open])

  return (
    <div className={styles.mainDialog}>
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
            variant="contained"
            form={props.role === 'edit' ? 'editCat' : 'addCat'}
            disabled={name ? false : true}
            onClick={props.handleClose}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}