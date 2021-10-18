import React from 'react'

import LoadingButton from '@mui/lab/LoadingButton'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  disabled: {
    marginTop: '15px !important',
    marginRight: '20px !important',
    backgroundColor: 'white !important',
    color: 'rgb(103, 179, 70) !important',
    borderColor: 'rgb(103, 179, 70) !important',
  },
  enabled: {
    marginTop: '15px !important',
    marginRight: '20px !important',
    backgroundColor: 'rgb(103, 179, 70) !important'
  },
  loading: {
    marginTop: '15px !important',
    marginRight: '20px !important'
  }
})

interface Props {
  loading: boolean,
  disabled?: boolean,
  onClick: () => void
}

const Button: React.FC<Props> = ({ onClick, children, loading, disabled }) => {
  const classes = useStyles(disabled)
  return (
    <LoadingButton 
      loading={loading}
      size='large' 
      variant={disabled || loading ? 'outlined' : 'contained'}
      onClick={onClick}
      className={loading ? classes.loading : disabled ? classes.disabled : classes.enabled}
      disabled={disabled}
    >
      {children}
    </LoadingButton>
  )
}

export default Button