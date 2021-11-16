import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './MainDialog.module.scss';
import { createCategory, editCategory } from 'src/handlers/category';

export default function MainDialog(props) {
  const [name, setName] = useState('');
  const [id, setId] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    let color = e.target[0].value;

    if (props.role === 'edit') {
      editCategory(id, {name, color}).then(() => props.reFetchData());
    } else {
      createCategory({name, color}).then(() => props.reFetchData());
    }

    setName('');
    setId(0);
  }

  useEffect(() => {
    if (props.role === 'edit' && props.open) {
      document.querySelector('#editCat input[type="color"]').value = props.data.color;
      setName(props.data.name);
      setId(props.data.id);
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