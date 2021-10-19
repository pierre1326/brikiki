import React from 'react'

import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(103, 179, 70)"
    }
  }
})

interface Props {
  label: string,
  id: string,
  value: string,
  type: 'email' | 'password' | 'text',
  error?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textfield: React.FC<Props> = ({ label, id, value, type, error, onChange }) => {
  const classes = useStyles()
  return (
    <TextField
      error={error ? true : false}
      helperText={error}
      className={classes.root}
      type={type} 
      variant='outlined'
      margin='normal'
      label={label} 
      id={id} 
      value={value}
      onChange={onChange}
    />
  )
}

export default Textfield