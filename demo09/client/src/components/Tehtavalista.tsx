import React from 'react';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBox from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PoistaTehtava from './PoistaTehtava';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { avaaPoistoDialogi, tallennaTehtavat, Tehtava, vaihdaSuoritus } from '../redux/tehtavalistaSlice';
import { useDispatch } from 'react-redux/es/exports';

const Tehtavalista : React.FC = () : React.ReactElement => {

  const tehtavat : Tehtava[] = useSelector((state: RootState) => state.tehtavalista.tehtavat);

  const dispatch : AppDispatch = useDispatch();

  return (
    <>
    <List>
      {tehtavat.map((tehtava : Tehtava, idx : number) => {
        return (<ListItem
                    key={idx}
                    secondaryAction={<IconButton
                                        onClick={() => dispatch(avaaPoistoDialogi({ auki : true, tehtava : tehtava}))}
                                      >
                                        <DeleteIcon />
                                      </IconButton>}
                  >
                  <ListItemIcon>
                  <IconButton
                    onClick={() => {
                      dispatch(vaihdaSuoritus(tehtava.id));
                      dispatch(tallennaTehtavat());
                    }}
                  >
                    {(tehtava.suoritettu) ? <CheckBox/> : <CheckBoxOutlineBlank/>}
                  </IconButton>
                  </ListItemIcon>
                  <ListItemText 
                    primary={tehtava.nimi}
                  />
                </ListItem>)
      })}
    </List>
    <PoistaTehtava />
    </>
  )
}

export default Tehtavalista;