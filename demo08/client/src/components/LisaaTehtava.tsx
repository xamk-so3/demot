import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tehtava, TehtavaContext } from '../context/TehtavaContext';

const LisaaTehtava : React.FC = () : React.ReactElement => {
  
  const { lisaysDialogi, setLisaysDialogi, lisaaTehtava } = useContext(TehtavaContext);

  const nimiRef : React.MutableRefObject<HTMLInputElement | undefined> = useRef();

  const kasitteleLisays = () : void => {

    let uusiTehtava : Tehtava = {
      id : uuidv4(),
      nimi : nimiRef.current!.value || "(nimetön tehtävä)",
      suoritettu : false
    } 

    lisaaTehtava(uusiTehtava);

    setLisaysDialogi(false);

  }

  return (
    <Dialog
        open={lisaysDialogi}
        onClose={() => setLisaysDialogi(false)}
        fullWidth={true}
        PaperProps={{ sx: { position: "fixed", top: 100} }}
      >
      <DialogTitle>
        Lisää uusi tehtävä
      </DialogTitle>
      <DialogContent>
        <TextField
          inputRef={nimiRef} 
          variant='outlined'
          label="Tehtävän nimi"
          fullWidth={true}
          sx={{marginTop : "10px"}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={kasitteleLisays}>Lisää</Button>
        <Button onClick={() => setLisaysDialogi(false)}>Peruuta</Button>
      </DialogActions>
    </Dialog>
  )
}

export default LisaaTehtava;