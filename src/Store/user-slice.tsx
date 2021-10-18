import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  email: string,
  telephone: string,
  address: string,
  company: string,
  name: string
}

const initialState = {
  email: '',
  telephone: '',
  address: '',
  company: '',
  name: '',
  isLogged: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state = {
        ...action.payload,
        isLogged: true,
      }
    },
    logout(state) {
      state = {...initialState}
    }
  }
})

export const userActions = userSlice.actions

export default userSlice.reducer