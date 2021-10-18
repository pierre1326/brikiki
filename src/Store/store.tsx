import { configureStore } from '@reduxjs/toolkit'

import notificationReduce from './notification-slice'
import userReduce from './user-slice'

const store = configureStore({
  reducer: {
    notification: notificationReduce,
    user: userReduce
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store