import { Button, Container, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UutinenContext } from '../context/UutinenContext';

const KokoUutinen : React.FC = () : React.ReactElement => {

  const { id } = useParams();

  const {apiData, luetut, setLuetut} = useContext(UutinenContext);

  const uutinen = apiData.uutiset.find((uutinen : any) => uutinen.id === id);

  useEffect(() => {

    setLuetut(new Set([...luetut, id]))

  }, []);

  return (
    <Container>

      <Stack spacing={2}>

      <Typography variant='h5' sx={{marginTop: "20px"}}>{uutinen.otsikko}</Typography>

      <Typography variant='body2'>{new Date(uutinen.julkaistu!).toLocaleString()}</Typography>



      <img src={uutinen.kuva}/>

      <Typography variant='body2'>{uutinen.sisalto}</Typography>

      <Button
        variant="contained"
        component={Link}
        to="/"
      >Palaa listaukseen</Button>

      </Stack>

    </Container>
  )
}


export default KokoUutinen;