import React from 'react'

import Home from '../Home'

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    marginTop: '85px'
  }
})

const Body = () => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Home/>
    </Box>
  )
}

export default Body