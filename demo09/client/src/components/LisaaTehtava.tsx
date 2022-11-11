import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useRef } from 'react';
import {useDispatch} from 'react-redux';
import { AppDispatch } from '../redux/store';
import { lisaaTehtava, tallennaTehtavat, Tehtava } from '../redux/tehtavalistaSlice';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  auki : boolean,
  setAuki : (arg0: boolean) => void
}

const LisaaTehtava : React.FC<Props> = (props : Props) : React.ReactElement => {
  
  const nimiRef : React.MutableRefObject<any> = useRef<HTMLInputElement>();
  const dispatch : AppDispatch = useDispatch();

  const kasitteleLisays = () : void => {

    let uusiTehtava : Tehtava = {
      id : uuidv4(),
      nimi : nimiRef.current.value || "(nimetön tehtävä)",
      suoritettu : false
    } 

    dispatch(lisaaTehtava(uusiTehtava));
    dispatch(tallennaTehtavat());

    props.setAuki(false);

  }

  return (
    <Dialog
        open={props.auki}
        onClose={() => props.setAuki(false)}
        fullWidth={true}
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
        <Button onClick={() => props.setAuki(false)}>Peruuta</Button>
      </DialogActions>
    </Dialog>
  )
}

export default LisaaTehtava;