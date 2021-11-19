import React, { useEffect, useState } from 'react';
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import styles from 'src/styles/pages/relatorios.module.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { fetchData, makeRequest } from 'src/util/helpers';
import { apiUrl } from 'src/util/env';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ReportDialog from 'src/components/common/ReportDialog';

export default function Relatorios() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [categories, setCategories] = useState([])
  const [cat, setCat] = useState('');
  //
  const [report, setReport] = useState([]);
  const [open, setOpen] = useState(false);

  function formatDate(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const startDate = formatDate(start);
    const endDate = formatDate(end);

    makeRequest(`${apiUrl}/v1/reports?startDate=${startDate}&endTime=${endDate}&category=${cat}`, 'GET')
    .then(res => {
      setReport(res);
    });

    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    async function setData() {
      let categories = await fetchData('/v1/category');
      setCategories(categories);
    }
    setData();
  }, [])

  return (
    <section className={styles.section}>
      <h1>Geração de Relatórios</h1>

      <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Início"
            value={start}
            onChange={newValue => setStart(newValue)}
            renderInput={(params) => <TextField required {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Término"
            value={end}
            onChange={newValue => setEnd(newValue)}
            renderInput={(params) => <TextField required {...params} />}
          />
        </LocalizationProvider>

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

        <Button type="submit" variant="contained">Gerar</Button>
      </form>

      <ReportDialog open={open} handleClose={handleClose} report={report} />
    </section>
  )
}
