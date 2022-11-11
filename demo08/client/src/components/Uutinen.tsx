import ArticleIcon from '@mui/icons-material/Article';
import { Badge, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {Uutinen as UutinenT, UutinenContext} from '../context/UutinenContext';


interface Props {
  uutinen : UutinenT
}

const Uutinen : React.FC<Props> = (props: Props) : React.ReactElement => {

  const {luetut} = useContext(UutinenContext);

  return (
    <ListItem component={Link} to={`/uutinen/${props.uutinen.id}`}>
      <ListItemIcon>
        {(luetut.has(props.uutinen.id)) 
        ? <ArticleIcon />
        :<Badge badgeContent="Uusi" color="primary">
          <ArticleIcon />
        </Badge>
        }
      </ListItemIcon>
      <ListItemText 
        primary={`${props.uutinen.otsikko.substring(0, 45)}...`}
        secondary={new Date(props.uutinen.julkaistu!).toLocaleString()}
      />
    </ListItem>
  )
}

export default Uutinen;