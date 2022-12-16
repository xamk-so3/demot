import React, { useContext, useState } from 'react';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBox from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PoistaTehtava from './PoistaTehtava';
import { Tehtava, TehtavaContext } from '../context/TehtavaContext';

const Tehtavalista : React.FC = () : React.ReactElement => {

  const { tehtavat, setPoistoDialogi, vaihdaSuoritus } = useContext(TehtavaContext);

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
                      vaihdaSuoritus(tehtava.id);
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
    <PoistaTehtava/>
    </>
  )
}

export default Tehtavalista;