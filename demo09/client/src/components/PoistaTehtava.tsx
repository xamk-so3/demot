import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { avaaPoistoDialogi, poistaTehtava, tallennaTehtavat } from '../redux/tehtavalistaSlice';

const PoistaTehtava : React.FC = () : React.ReactElement => {

  const poistoDialogi : any = useSelector((state : RootState) => state.tehtavalista.poistoDialogi );

  const dispatch : AppDispatch = useDispatch();

  const kasittelePoisto = (poistettavaId : string) => {
    
    dispatch(poistaTehtava(poistettavaId));
    dispatch(tallennaTehtavat());
    dispatch(avaaPoistoDialogi({auki : false, tehtava : {}}))

  }

  return (
    <Dialog
      open={poistoDialogi.auki}
      onClose={() => dispatch(avaaPoistoDialogi({auki : false, tehtava : {}}))}
      fullWidth={true}
      PaperProps={{ sx: { position: "fixed", top: 100} }}
    >
    <DialogTitle>
      Poista tehtävä
    </DialogTitle>
    <DialogContent>
      <Typography>
      Haluatko varmasti poistaa tehtävän: "{poistoDialogi.tehtava.nimi}"?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => kasittelePoisto(poistoDialogi.tehtava.id)}>Poista</Button>
      <Button onClick={() => dispatch(avaaPoistoDialogi({auki : false, tehtava : {}}))}>Peruuta</Button>
    </DialogActions>
  </Dialog>
  )
}

export default PoistaTehtava;