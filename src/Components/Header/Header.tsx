import React from 'react'

import { AppBar, makeStyles, Toolbar } from '@material-ui/core'
import Logo from '../Logo'

const useStyles = makeStyles({
  header: {
    height: '64px',
    backgroundColor: '#FFFFFF',
    color: 'rgb(103, 179, 70)',
    userSelect: 'none'
  }
})

const Header = () => {
  const classes = useStyles()
  return (
    <header>
      <AppBar className={classes.header}>
        <Toolbar>
          <Logo/>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header