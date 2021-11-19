import React, { useEffect, useState } from 'react';
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
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TimeLine from '../Timeline';
import { createTask, editTask } from 'src/handlers/tasks';

export default function MainDialog(props) {
  // fixed data
  const [name, setName] = useState('');
  const [cat, setCat] = useState('');
  const [start, setStart] = useState(new Date().toJSON());
  const [taskType, setTaskType] = useState('P');

  //pomodoro
  const [focusTime, setFocusTime] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [cyclesUntilLongBreak, setCyclesUntilLongBreak] = useState(3);
  const [repeats, setRepeats] = useState('');

  // endtime
  const [end, setEnd] = useState(new Date().toJSON());

  function handleSubmit(e) {
    e.preventDefault();
    if (props.role === 'edit') {
      if (taskType === 'E') {
        editTask(props.selected.id, endData).then(() => props.reFetchData());
      } else {
        editTask(props.selected.id, pomoData).then(() => props.reFetchData());
      }
    } else {
      if (taskType === 'E') {
        createTask(endData).then(() => props.reFetchData());
      } else {
        createTask(pomoData).then(() => props.reFetchData());
      }
    }
    close();
  }

  function close() {
    setName('');
    setCat('');
    setStart(new Date().toJSON());
    setEnd(new Date().toJSON());
    setTaskType('P');
    setFocusTime(25);
    setShortBreak(5);
    setLongBreak(15);
    setCyclesUntilLongBreak(3);
    setRepeats('');

    props.handleClose();
  }

  function handleRadio(e) {
    setTaskType(e.target.value);
  }

  const fixedData = {
    name: name,
    categoryId: cat,
    startTime: start,
    taskType: taskType,
  }

  const pomoData = {
    ...fixedData,
    focusTime: focusTime,
    shortBreak: shortBreak,
    longTime: longBreak,
    cyclesUntilLongBreak: cyclesUntilLongBreak,
    repeats: repeats,
  }

  const endData = {
    ...fixedData,
    endTime: end,
  }

  useEffect(() => {
    if (props.role === 'edit' && props.open) {
      const task = props.selected;
      const { name, categoryId, startTime, taskType } = task
      setName(name)
      setCat(categoryId)
      setStart(new Date(startTime).toJSON())
      setTaskType(taskType)

      //
      if (taskType === 'P') {
        const { focusTime, shortBreak, longTime, cyclesUntilLongBreak, repeats } = task;
        setFocusTime(focusTime);
        setShortBreak(shortBreak);
        setLongBreak(longTime);
        setCyclesUntilLongBreak(cyclesUntilLongBreak);
        setRepeats(repeats);
      } else {
        const { endTime } = task;
        setEnd(new Date(endTime).toJSON());
      }
    }
  }, [props.open])

  return (
    <Dialog fullScreen open={props.open} onClose={close} keepMounted>
      <div className={styles.bar}>
        <div>
          <div>
            <IconButton edge="start" color="inherit" onClick={close}>
              <CloseIcon />
            </IconButton>
            <DialogTitle>{props.role === 'add' ? 'Nova Tarefa' : 'Editar Tarefa'}</DialogTitle>
          </div>
          <Button type="submit" form="taskForm">Salvar</Button>
        </div>
      </div>
      <DialogContent>
        <form id="taskForm" onSubmit={handleSubmit} className={styles.form}>
          <div>
            <div className={styles.fixedFields}>
              {/* nome */}
              <TextField label="Nome" required value={name} onChange={e => setName(e.target.value)} />
              {/* categoria */}
              <FormControl>
                <InputLabel id="cat-label">Categoria</InputLabel>
                <Select style={{ minWidth: '200px' }}
                  labelId="cat-label"
                  id="category"
                  label="Categoria"
                  value={cat}
                  onChange={e => setCat(e.target.value)}
                >
                  {
                    props.categories.map(cat => {
                      return (
                        <MenuItem key={`cat-${cat.id}`} value={cat.id}>{cat.name}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
              {/* início */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Início"
                  value={start}
                  inputFormat="dd/MM/yyyy HH:mm"
                  onChange={newValue => setStart(newValue.toJSON())}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              {/* tipo */}
              <hr />
              <h4>Definir a duração desta tarefa por...</h4>
              <RadioGroup row value={taskType}>
                <FormControlLabel onChange={handleRadio} value="P" control={<Radio />} label="Pomodoro" />
                <FormControlLabel onChange={handleRadio} value="E" control={<Radio />} label="Data" />
              </RadioGroup>
            </div>
          </div>

          {
            taskType === 'E' ? (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Término"
                  value={end}
                  inputFormat="dd/MM/yyyy HH:mm"
                  onChange={newValue => setEnd(newValue.toJSON())}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            ) : (
              <div className={`${styles.pomoFields} pomodoros`}>
                <TextField required type="number" label="Tempo de foco (minutos)" value={focusTime} onChange={e => setFocusTime(e.target.valueAsNumber)} />
                <TextField required type="number" label="Pausa curta (minutos)" value={shortBreak} onChange={e => setShortBreak(e.target.valueAsNumber)} />
                <TextField required type="number" label="Pausa longa (minutos)" value={longBreak} onChange={e => setLongBreak(e.target.valueAsNumber)} />
                <TextField required type="number" label="Ciclos até uma pausa longa" value={cyclesUntilLongBreak} onChange={e => setCyclesUntilLongBreak(e.target.valueAsNumber)} />
                <TextField required type="number" label="Número de ciclos (repetições)" value={repeats} onChange={e => setRepeats(e.target.valueAsNumber)} />

                <TimeLine
                  fields={{ focusTime, shortBreak, longBreak, cyclesUntilLongBreak, repeats }}
                />
              </div>
            )
          }
        </form>
      </DialogContent>
    </Dialog>
  )
}
