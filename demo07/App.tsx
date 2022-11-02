import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet} from 'react-native';
import { Appbar, Button, Text, Dialog, Portal, Provider, TextInput, List } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

interface Ostos {
  id : number;
  tuote : string;
}

interface DialogiData {
  auki : boolean;
  teksti : string;
}

const db : SQLite.WebSQLDatabase = SQLite.openDatabase("ostoslista.db");

db.transaction(
  (tx : SQLite.SQLTransaction) => {
    //tx.executeSql(`DROP TABLE ostokset`); // Poista tämän rivin kommentti, jos haluat määrittää taulun uuddestaan (poistaa myös sisällöt)
    tx.executeSql(`CREATE TABLE IF NOT EXISTS ostokset (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    tuote TEXT
                  )`);
  }, 
  (err : SQLite.SQLError) => { 
    console.log(err) 
  }
);

const App : React.FC = () : React.ReactElement => {

  const [dialogi, setDialogi] = useState<DialogiData>({auki:false, teksti: ""});
  const [ostokset, setOstokset] = useState<Ostos[]>([]);

  const tyhjennaOstoslista = () : void => {

    db.transaction(
      (tx : SQLite.SQLTransaction) => {
        tx.executeSql(`DELETE FROM ostokset`, [], 
          (_tx : SQLite.SQLTransaction, rs : SQLite.SQLResultSet) => {
            haeOstokset();
          });
      }, 
      (err: SQLite.SQLError) => console.log(err));

  }

  const lisaaOstos = () : void => {

    db.transaction(
      (tx : SQLite.SQLTransaction) => {
        tx.executeSql(`INSERT INTO ostokset (tuote) VALUES (?)`, [dialogi.teksti], 
          (_tx : SQLite.SQLTransaction, rs : SQLite.SQLResultSet) => {
            haeOstokset();
          });
      }, 
      (err: SQLite.SQLError) => console.log(err));

    setDialogi({...dialogi, auki : false, teksti : ""})

  }

  const haeOstokset = () : void => {

    db.transaction(
      (tx : SQLite.SQLTransaction) => {
        tx.executeSql(`SELECT * FROM ostokset`, [], 
          (_tx : SQLite.SQLTransaction, rs : SQLite.SQLResultSet) => {
            setOstokset(rs.rows._array);
          });
      }, 
      (err: SQLite.SQLError) => console.log(err));

  }

  useEffect(() => {

    haeOstokset();

  }, []);

  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="Demo7: SQLite"/>
      </Appbar.Header>
      <ScrollView style={{padding : 20}}>

        <Text variant='headlineSmall'>Ostoslista</Text>

        {(ostokset.length > 0) 
        ? ostokset.map((ostos: Ostos, idx: number) => {
            return (<List.Item 
              title={ostos.tuote}
              key={idx}
            />)
        })
        : <Text>Ei ostoksia</Text>
        }

        <Button
          style={{ marginTop : 20 }}
          mode="contained"
          icon="plus"
          onPress={() => setDialogi({...dialogi, auki : true})}
        >Lisää uusi ostos</Button>

        <Button
          style={{ marginTop : 20 }}
          buttonColor="red"
          mode="contained"
          icon="delete"
          onPress={tyhjennaOstoslista}
        >Tyhjennä lista</Button>

        <Portal>
          <Dialog
            visible={dialogi.auki}
            onDismiss={() => setDialogi({...dialogi, auki : false})}
          >
            <Dialog.Title>Lisää uusi ostos</Dialog.Title>
            <Dialog.Content>
              <TextInput 
                label="Ostos"
                mode="outlined"
                placeholder='Kirjoita ostos...'
                onChangeText={ (uusiTeksti : string) => setDialogi({...dialogi, teksti: uusiTeksti})}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={lisaaOstos}>Lisää listaan</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <StatusBar style="auto" />
      </ScrollView>
    </Provider>
  );
}

export default App;