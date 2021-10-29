import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React from 'react';

export default function PassWordToggle(props) {
  return (
    <TextField
      variant="standard"
      size="small"
      margin="dense"
      fullWidth
      required
      id={props.id}
      label="Senha"
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            <IconButton onClick={props.handleShowPass}>
              {props.showPass ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
      }}
      type={props.showPass ? 'text' : 'password'}
      onChange={props.onChange}
    />
  )
}