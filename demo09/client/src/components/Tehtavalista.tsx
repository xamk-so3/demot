import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBox from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AppDispatch, RootState } from '../redux/store';
import { haeTehtavat, tallennaTehtavat, Tehtava, vaihdaSuoritettu } from '../redux/tehtavalistaSlice';
import PoistaTehtava from './PoistaTehtava';
import { hasUncaughtExceptionCaptureCallback } from 'process';

const Tehtavalista : React.FC = () : React.ReactElement => {

  const haettu : React.MutableRefObject<boolean> = useRef<boolean>(false);

  const [poistoDialogi, setPoistoDialogi] = useState<any>({
                                                            tehtava : {},
                                                            auki : false
                                                          });

  const tehtavat = useSelector((state : RootState) => state.tehtavalista.tehtavat);

  const dispatch : AppDispatch = useDispatch();

  useEffect(() => {

    if (!haettu.current) {

      dispatch(haeTehtavat());

    }

    return () => { haettu.current = true }

  }, [dispatch]);

  return (
    <>
    <List>
      {tehtavat.map((tehtava : Tehtava, idx : number) => {
        return (<ListItem
                    key={idx}
                    secondaryAction={<IconButton
                                        onClick={() => setPoistoDialogi({tehtava : tehtava, auki : true})}
                                      >
                                        <DeleteIcon />
                                      </IconButton>}
                  >
                  <ListItemIcon>
                  <IconButton
                    onClick={() => {
                      dispatch(vaihdaSuoritettu(tehtava.id));
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
    <PoistaTehtava poistoDialogi={poistoDialogi} setPoistoDialogi={setPoistoDialogi}/>
    </>
  )
}

export default Tehtavalista;