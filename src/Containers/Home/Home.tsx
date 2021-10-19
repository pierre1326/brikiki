import React, { useState } from 'react'

import Login from '../../Components/Login'
import Register from '../../Components/Register'

import { Box } from '@material-ui/core'

const Home = () => {
  const [showLogin, setShowLogin] = useState(true)

  const handlerShowLogin = () => {
    setShowLogin(prevState => !prevState)
  }

  return (
    <Box>
      {showLogin && <Login changeForm={handlerShowLogin}/>}
      {!showLogin && <Register changeForm={handlerShowLogin}/>}
    </Box>
  )
}

export default Home