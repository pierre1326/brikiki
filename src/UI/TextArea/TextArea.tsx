import React from 'react'

import { makeStyles } from '@material-ui/core'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(103, 179, 70)"
    }
  }
})

interface Props {
  value: string,
  id: string,
  label: string,
  error?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea: React.FC<Props> = ({value, id, label, error, onChange}) => {
  const classes = useStyles()
  return (
    <TextField
      error={error ? true : false}
      helperText={error}
      className={classes.root}
      variant='outlined'
      margin='normal'
      label={label} 
      maxRows={3}
      multiline
      id={id} 
      value={value}
      onChange={onChange}
    />
  )
}

export default TextArea