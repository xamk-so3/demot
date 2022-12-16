import React, { useContext } from 'react';
import { Button, Container, Stack } from '@mui/material';
import Otsikko from './components/Otsikko';
import Tehtavalista from './components/Tehtavalista';
import LisaaTehtava from './components/LisaaTehtava';
import { TehtavaContext } from './context/TehtavaContext';


function App() {

  const { setLisaysDialogi } = useContext(TehtavaContext);

  return (
    <Container>
      <Stack spacing={2}>
              
      <Otsikko />

      <Button 
        variant="contained"
        onClick={() => setLisaysDialogi(true)}
      >Lisää uusi tehtävä</Button>

      <Tehtavalista/>

      <LisaaTehtava/>

      </Stack>
    </Container>
  );
}

export default App;
