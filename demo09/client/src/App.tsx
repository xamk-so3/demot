import React, { useState } from 'react';
import { Button, Container, Stack } from '@mui/material';
import Otsikko from './components/Otsikko';
import Tehtavalista from './components/Tehtavalista';
import LisaaTehtava from './components/LisaaTehtava';


function App() {

  const [lisaysDialogi, setLisaysDialogi] = useState<boolean>(false);

  return (
    <Container>
      <Stack spacing={2}>
              
      <Otsikko />

      <Button 
        variant="contained"
        onClick={() => setLisaysDialogi(true)}
      >Lisää uusi tehtävä</Button>

      <Tehtavalista />

      <LisaaTehtava auki={lisaysDialogi} setAuki={setLisaysDialogi}/>

      </Stack>
    </Container>
  );
}

export default App;
