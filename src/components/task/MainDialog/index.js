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
import SaveIcon from '@mui/icons-material/Save';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { fetchData } from 'src/util/helpers';
import TimeLine from '../Timeline';

export default function MainDialog(props) {
  // fixed data
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('');
  const [cat, setCat] = useState('');
  const [start, setStart] = useState(new Date());
  const [taskType, setTaskType] = useState('P');

  //pomodoro
  const [focusTime, setFocusTime] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [cyclesUntilLongBreak, setCyclesUntilLongBreak] = useState(3);
  const [repeats, setRepeats] = useState('');

  // endtime
  const [end, setEnd] = useState(new Date());
  //
  const [categories, setCategories] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    
  }

  function handleRadio(e) {
    setTaskType(e.target.value);
  }

  // pegar categorias
  useEffect(() => {
    async function setData() {
      let response = await fetchData('/v1/category');
      setCategories(response);
    }
    setData();
  }, [])

  const data = {
    name: name,
    description: desc,
    priority: priority,
    categoryId: cat,
    startTime: start,
    taskType: taskType,
    //
    endTime: end,
  }
  console.log(data);

  return (
    <Dialog fullScreen open={props.open} onClose={props.handleClose} keepMounted>
      <div className={styles.bar}>
        <div>
          <div>
            <IconButton edge="start" color="inherit" onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
            <DialogTitle>{props.title}</DialogTitle>
          </div>
          <Button startIcon={<SaveIcon />} type="submit" form="taskForm">Salvar</Button>
        </div>
      </div>
      <DialogContent>
        <form id="taskForm" onSubmit={handleSubmit} className={styles.form}>
          <div>
            <div className={styles.fixedFields}>
              {/* nome */}
              <TextField label="Nome" required value={name} onChange={e => setName(e.target.value)} />
              {/* descrição */}
              <TextField label="Descrição" required multiline value={desc} onChange={e => setDesc(e.target.value)} />
              {/* prioridade */}
              <TextField label="Prioridade (1 a 3)" required type="number" inputProps={{ min: '1', max: '3' }} value={priority} onChange={e => setPriority(e.target.value)} />
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
                    categories.map(cat => {
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
              <div className={styles.pomoFields}>
                <TextField required type="number" label="Tempo de foco (minutos)" value={focusTime} onChange={e => setFocusTime(e.target.value)} />
                <TextField required type="number" label="Pausa curta (minutos)" value={shortBreak} onChange={e => setShortBreak(e.target.value)} />
                <TextField required type="number" label="Pausa longa (minutos)" value={longBreak} onChange={e => setLongBreak(e.target.value)} />
                <TextField required type="number" label="Ciclos até uma pausa longa" value={cyclesUntilLongBreak} onChange={e => setCyclesUntilLongBreak(e.target.value)} />
                <TextField required type="number" label="Número de ciclos (repetições)" value={repeats} onChange={e => setRepeats(e.target.value)} />

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
