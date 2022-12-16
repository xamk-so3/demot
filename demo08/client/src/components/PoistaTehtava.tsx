import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { TehtavaContext } from '../context/TehtavaContext';

const PoistaTehtava : React.FC = () : React.ReactElement => {

  const {poistoDialogi, setPoistoDialogi, poistaTehtava} = useContext(TehtavaContext);

  const kasittelePoisto = () => {
    
    poistaTehtava(poistoDialogi.tehtava.id);

    setPoistoDialogi({...poistoDialogi, auki : false});

  }

  return (
    <Dialog
      open={poistoDialogi.auki}
      onClose={() => setPoistoDialogi({...poistoDialogi, auki : false})}
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
      <Button onClick={kasittelePoisto}>Poista</Button>
      <Button onClick={() => setPoistoDialogi({...poistoDialogi, auki : false})}>Peruuta</Button>
    </DialogActions>
  </Dialog>
  )
}

export default PoistaTehtava;