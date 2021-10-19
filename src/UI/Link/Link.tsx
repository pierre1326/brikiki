import React from 'react'

import LinkUI from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core'

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