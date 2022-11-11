import { AppBar, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';
import React, { useContext } from 'react'
import { UutinenContext } from '../context/UutinenContext';

const Valikko : React.FC = () : React.ReactElement => {
  
  const {apiKutsu} = useContext(UutinenContext);
  
  return (
    <>
    <CssBaseline />
    <AppBar position='static'>
      <Toolbar>
          <Typography 
            variant='h6'
            component="div"
            sx={{flexGrow : 1}} 
          >Demo 8: Context API</Typography>
          <IconButton
            color='inherit'
            onClick={apiKutsu}
          >
            <RefreshIcon />
          </IconButton>
      </Toolbar>
    </AppBar>
    </>
  )
}


export default Valikko;