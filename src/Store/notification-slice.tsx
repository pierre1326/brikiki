import { AlertColor } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Notification {
  message: string,
  severity: AlertColor,
  show: boolean
}

const initialState: Notification = {
  message: '',
  severity: 'success',
  show: false
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    hide(state) {
      state.show = false
    },
    show(state, action: PayloadAction<{message: string, severity: AlertColor}>) {
      state.message = action.payload.message
      state.severity = action.payload.severity
      state.show = true
    }
  }
})

export const notificationActions = notificationSlice.actions

export default notificationSlice.reducer