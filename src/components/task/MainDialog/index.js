import React, { useState } from 'react';
import styles from './MainDialog.module.scss'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function MainDialog(props) {
  const [value, setValue] = useState(new Date());

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }

  function handleChange(e) {
    console.log(e.target.value);
  }

  return (
    <Dialog fullScreen open={props.open} onClose={props.handleClose} keepMounted>
      <div className={styles.bar}>
        <IconButton edge="start" color="inherit" onClick={props.handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle>{props.title}</DialogTitle>
      </div>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div>
            <h4>Definir a duração desta tarefa por...</h4>
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
              <FormControlLabel defaultChecked={true} onChange={handleChange} value="pomodoro" control={<Radio />} label="Pomodoro" />
              <FormControlLabel onChange={handleChange} value="date" control={<Radio />} label="Data" />
            </RadioGroup>
          </div>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            
          </LocalizationProvider>
        </form>
      </DialogContent>
    </Dialog>
  )
}
