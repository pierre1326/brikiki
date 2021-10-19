import React from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckboxUI from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core'

interface Props {
  checked: boolean,
  label: string,
  name: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const useStyles = makeStyles({
  root: {
    paddingTop: '15px !important'
  }
})

const Checkbox: React.FC<Props> = ({name, checked, label, onChange}) => {
  const classes = useStyles()
  return (
    <FormControlLabel className={classes.root}
      control={<CheckboxUI color={'primary'} checked={checked} onChange={onChange} name={name} />}
      label={label}
    />
  )
}

export default Checkbox