import { Typography } from '@mui/material';
import React from 'react'

const Otsikko : React.FC = () : React.ReactElement => {
  return (
    <>

        <Typography variant="h5">Demo 9: Context API (useContext)</Typography>
        <Typography variant="h6" sx={{marginTop: "10px"}}>Tehtävälista</Typography>

    </>
  )
}

export default Otsikko;