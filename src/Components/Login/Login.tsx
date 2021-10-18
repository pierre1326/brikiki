import React, { useEffect, useState } from 'react'

import apiUser from '../../api'

import { notificationActions } from '../../Store/notification-slice'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@mui/styles'
import Textfield from '../../UI/Textfield'
import Button from '../../UI/Button'
import Link from '../../UI/Link'
import Checkbox from '../../UI/Checkbox'
import {
  Card,
  CardContent,
  Typography,
  Stack
} from '@mui/material'

interface Data {
  email: string,
  password: string
}

interface Response {
  email: string,
  telephone: string,
  address: string,
  company: string,
  name: string
}

interface Props {
  changeForm: () => void
}

interface Form {
  email: string,
  password: string
}

interface Validations {
  email?: string,
  password?: string
}

const initialState: Form = {
  email: '', 
  password: ''
}

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

const useStyles = makeStyles({
  root: {
    width: '350px',
    margin: 'auto'
  },
  subtitle: {
    paddingBottom: '15px'
  },
  stack: {
    maxWidth: '300px',
  },
  stackLinks: {
    marginTop: '20px'
  }
})

const Login: React.FC<Props> = ({ changeForm }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [showLogin, setShowLogin] = useState(false)
  const [stayLogged, setStayLogged] = useState(false)
  const [form, setForm] = useState(initialState)
  const [validations, setValidations] = useState<Validations>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm(prevState => {
      const newState = { ...prevState }
      newState[e.target.id as keyof Form] = e.target.value.trim()
      return newState
    })
  }

  useEffect(() => {
    if(showLogin) {
      if(form.password.length > 0 && !validations.password && form.email.length > 0 && !validations.email) {
        setIsValid(true)
      }
      else {
        setIsValid(false)
      }
    }
    else {
      if(form.email.length > 0 && !validations.email) {
        setIsValid(true)
      }
      else {
        setIsValid(false)
      }
    }
  }, [validations, showLogin, form])

  useEffect(() => {
    let newValidations: Validations = {}
    if(form.email.length > 0 && !validateEmail(form.email)) {
      newValidations.email = 'The email is not valid'
    }
    if(form.password.length > 0 && form.password.length < 8) {
      newValidations.password = 'The password is not valid'
    }
    setValidations(newValidations)
  }, [form])

  const handlerStayLogged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStayLogged(e.target.checked)
  }

  const handlerReset = () => {
    if(form.email.length > 0 && !validations.email) {
      dispatch(notificationActions.show({message: 'An email has been sent to retrieve the password', severity: 'success'}))
    }
    else {
      setValidations({email: 'The email is not valid'})
    }
  }

  const handlerLogin = () => {
    if(showLogin) {
      setIsLoading(true)
      const data = {email: form.email, password: form.password}
      apiUser.post<Data, Response>('login', data).then(result => {
        console.log(result)
        dispatch(notificationActions.show({ message: 'Login Successful', severity: 'success'}))
      }).catch(error => {
        const response = error.response
        dispatch(notificationActions.show({ message: response.data, severity: 'error'}))
      }).finally(() => {
        setIsLoading(false)
      })
    }
    else {
      setShowLogin(true)
    }
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h4' component='div' className={classes.subtitle}>
          Dashboard Login
        </Typography>
        <Stack className={classes.stack}>
          <Textfield error={validations.email} type={'email'} id={'email'} label={'Email'} value={form.email} onChange={onChange}/>
          {showLogin && <Textfield error={validations.password} type={'password'} id={'password'} label={'Password'} value={form.password} onChange={onChange}/>}
        </Stack>
        <Button disabled={!isValid} loading={isLoading} onClick={handlerLogin}>{showLogin ? 'Log in' : 'Next'}</Button>
        <Checkbox onChange={handlerStayLogged} label={'Stay logged in'} name={'stayLogged'} checked={stayLogged}/>
        <Stack direction='row' className={classes.stackLinks}>
          <Link onClick={handlerReset}>I forgot my password</Link>
          <Link onClick={changeForm}>Create an account</Link>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Login