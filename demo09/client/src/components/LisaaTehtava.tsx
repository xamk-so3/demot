import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch, RootState } from '../redux/store';
import { avaaLisaysDialogi, lisaaTehtava, tallennaTehtavat, Tehtava } from '../redux/tehtavalistaSlice';

const LisaaTehtava : React.FC = () : React.ReactElement => {
  
  const nimiRef : React.MutableRefObject<HTMLInputElement | undefined> = useRef();

  const lisaysDialogi : boolean = useSelector((state : RootState) => state.tehtavalista.lisaysDialogi);
  const dispatch : AppDispatch = useDispatch();

  const kasitteleLisays = () : void => {

    let uusiTehtava : Tehtava = {
      id : uuidv4(),
      nimi : nimiRef.current!.value || "(nimetön tehtävä)",
      suoritettu : false
    } 

    dispatch(lisaaTehtava(uusiTehtava));
    dispatch(tallennaTehtavat());
    dispatch(avaaLisaysDialogi(false));

  }

  return (
    <Dialog
        open={lisaysDialogi}
        onClose={() => dispatch(avaaLisaysDialogi(false))}
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
        <Button onClick={() => dispatch(avaaLisaysDialogi(false))}>Peruuta</Button>
      </DialogActions>
    </Dialog>
  )
}

export default LisaaTehtava;