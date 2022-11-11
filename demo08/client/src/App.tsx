import React from 'react';
import { Route, Routes } from 'react-router-dom';
import KokoUutinen from './components/KokoUutinen';
import UutisLista from './components/UutisLista';
import Valikko from './components/Valikko';
import { UutinenProvider } from './context/UutinenContext';

const App : React.FC = () : React.ReactElement => {
  return (
    <UutinenProvider>
      <Valikko />
      <Routes>
        <Route path="/" element={<UutisLista/>} />
        <Route path="/uutinen/:id" element={<KokoUutinen />} />
      </Routes>
    </UutinenProvider>
  );
}

export default App;
