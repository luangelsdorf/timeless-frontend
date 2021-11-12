import React, { useState } from 'react';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function DateForm({ formData, setFormData }) {

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Data de Início"
          value={formData.startTime}
          onChange={(newValue) => {
            setFormData({
              startTime: newValue.toJSON(),
              endTime: formData.endTime,
            });
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  )
}
