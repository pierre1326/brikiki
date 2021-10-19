import React, {useEffect, useState} from 'react'

import apiUser from '../../api'
import { notificationActions } from '../../Store/notification-slice'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core'
import Textfield from '../../UI/Textfield'
import TextArea from '../../UI/TextArea'
import Button from '../../UI/Button'
import Link from '../../UI/Link'
import {
  Card,
  CardContent,
  Typography,
  Stack
} from '@mui/material'

interface Props {
  changeForm: () => void
}

interface Form {
  email: string,
  name: string,
  password: string,
  confirmPassword: string,
  company: string,
  address: string,
  telephone: string
}

interface Validations {
  email?: string,
  name?: string,
  password?: string,
  confirmPassword?: string,
  company?: string,
  address?: string,
  telephone?: string
}

const initialState: Form = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  company: '',
  address: '',
  telephone: ''
}

const useStyles = makeStyles({
  root: {
    minWidth: '350px',
    width: '50%',
    margin: 'auto'
  },
  subtitle: {
    paddingBottom: '15px'
  },
  stack: {
    width: '65%',
    minWidth: '300px'
  },
  stackLinks: {
    width: '100%',
    marginTop: '20px'
  }
})

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase())
}

const validatePassword = (password: string) => {
  const re = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
  return re.test(password)
}

const validateTelephone = (telephone: string) => {
  const re = /^[0-9]{8}$/
  return re.test(telephone)
}

const Register: React.FC<Props> = ({ changeForm }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [form, setForm] = useState(initialState)
  const [validations, setValidations] = useState<Validations>({})
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const newValidations: Validations = {}
    if(form.email.length > 0 && !validateEmail(form.email)) {
      newValidations.email = 'The email is not valid'
    }
    if(form.password.length > 0 && !validatePassword(form.password)) {
      newValidations.password = 'The password requires at least 8 characters, a lower case, upper case and a number'
    }
    if(form.confirmPassword.length > 0 && form.confirmPassword !== form.password) {
      newValidations.confirmPassword = 'Passwords do not match'
    }
    if(form.name.length > 0 && form.name.length < 2) {
      newValidations.name = 'Must have at least 2 characters'
    }
    if(form.company.length > 0 && form.company.length < 2) {
      newValidations.company = 'Must have at least 2 characters'
    }
    if(form.address.length > 0 && form.address.length < 2) {
      newValidations.address = 'Must have at least 2 characters'
    }
    if(form.telephone.length > 0 && !validateTelephone(form.telephone)) {
      newValidations.telephone = 'Must have 8 characters'
    }
    setValidations(newValidations)
  }, [form])

  useEffect(() => {
    if( form.email.length > 0 && !validations.email &&
        form.name.length > 0 && !validations.name &&
        form.password.length > 0 && !validations.password &&
        form.confirmPassword.length > 0 && !validations.confirmPassword &&
        form.company.length > 0 && !validations.company &&
        form.address.length > 0 && !validations.address &&
        form.telephone.length > 0 && !validations.telephone) {
          setIsValid(true)
    }
    else {
      setIsValid(false)
    }
  }, [form, validations])

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm(prevState => {
      const newState = { ...prevState }
      newState[e.target.id as keyof Form] = e.target.value
      return newState
    })
  }

  const createAccount = () => {
    setIsLoading(true)
    apiUser.post('register', form).then(result => {
      dispatch(notificationActions.show({ message: 'A confirmation email has been sent', severity: 'warning'}))
      changeForm()
    }).catch(error => {
      const response = error.response
      dispatch(notificationActions.show({ message: response.data, severity: 'error'}))
    }).finally(() => {
      setIsLoading(false)
    })
    
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h4' component='div' className={classes.subtitle}>
          Create a new account
        </Typography>
        <Stack className={classes.stack}>
          <Textfield error={validations.email} type={'email'} id={'email'} label={'Email'} value={form.email} onChange={onChange}/>
          <Textfield error={validations.name} type={'text'} id={'name'} label={'Full name'} value={form.name} onChange={onChange}/>
          <Textfield error={validations.password} type={'password'} id={'password'} label={'Password'} value={form.password} onChange={onChange}/>
          <Textfield error={validations.confirmPassword} type={'password'} id={'confirmPassword'} label={'Confirm Password'} value={form.confirmPassword} onChange={onChange}/>
          <Textfield error={validations.company} type={'text'} id={'company'} label={'Organization'} value={form.company} onChange={onChange}/>
          <Textfield error={validations.telephone} type={'text'} id={'telephone'} label={'Telephone'} value={form.telephone} onChange={onChange}/>
          <TextArea error={validations.address} id={'address'} label={'Address'} value={form.address} onChange={onChange}/>
        </Stack>
        <Button disabled={!isValid} loading={isLoading} onClick={createAccount}>{'Create account'}</Button>
        <Stack justifyContent='flex-end' direction='row' className={classes.stackLinks}>
          <Link onClick={changeForm}>Have an account? Log in</Link>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Register