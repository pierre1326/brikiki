import React from 'react'

import LinkUI from '@mui/material/Link'
import { makeStyles } from '@mui/styles'

interface Props {
  onClick: () => void
}

const useStyle = makeStyles({
  root: {
    fontSize: '15px',
    paddingRight: '10px',
    userSelect: 'none',
    cursor: 'pointer'
  }
})

const Link: React.FC<Props> = ({ onClick, children }) => {
  const classes = useStyle()
  return (
    <LinkUI className={classes.root} underline='none' onClick={onClick}>
      {children}
    </LinkUI>
  )
}

export default Link