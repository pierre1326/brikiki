import React from 'react';
import Header from '../../Components/Header'
import Body from '../Body'

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store/store';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

import { notificationActions } from '../../Store/notification-slice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(103, 179, 70)'
    }
  }
})

const App = () => {
  const notification = useSelector((state: RootState) => state.notification)
  const dispatch = useDispatch()
  return (
    <MuiThemeProvider theme={theme}>
        <div className="App">
          <Header/>
          <Body/>
          <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={notification.show} autoHideDuration={6000} onClose={() => dispatch(notificationActions.hide())}>
            <Alert onClose={() => dispatch(notificationActions.hide())} severity={notification.severity} sx={{ width: '100%' }}>
              {notification.message}
            </Alert>
          </Snackbar>
        </div>
    </MuiThemeProvider>
  )
}

export default App;
