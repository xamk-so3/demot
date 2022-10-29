import { StatusBar } from 'expo-status-bar';
import { View, Vibration } from 'react-native';
import { Appbar, Button, List } from 'react-native-paper';
import * as Device from 'expo-device';
import * as Battery from 'expo-battery';
import { useEffect, useState } from 'react';

export default function App() {

  const [akkulataus, setAkkulataus] = useState<number>();
  const [latauksessa, setLatauksessa] = useState<string>();

  useEffect(() => {

    (async () : Promise<void> => {

      setAkkulataus(await Battery.getBatteryLevelAsync());

    })();

    const latausKuuntelija = Battery.addBatteryStateListener((e: Battery.BatteryStateEvent) => {

      if (e.batteryState === 2) {
        setLatauksessa("Kyllä");
      } else {
        setLatauksessa("Ei");
      }

    });

    return () => latausKuuntelija.remove();
    
  }, []);

  return (
    <>
    <Appbar.Header>
      <Appbar.Content title="Demo 5: Laitekomponentit" />
    </Appbar.Header>
    <View style={{marginHorizontal: 10}}>

      <List.Accordion title="Perustietoja laitteesta">
        <List.Item title="Merkki" description={Device.brand}/>
        <List.Item title="Malli" description={Device.modelName}/>
        <List.Item title="Käyttöjärjestelmä" description={Device.osName} />
        <List.Item title="Versio" description={Device.osVersion} />
      </List.Accordion>

      <List.Accordion title="Akkutietoja">
        <List.Item title="Latauksen määrä" description={`${(100 * Number(akkulataus)).toFixed(2)} %`}/>
        <List.Item title="Latauksessa" description={latauksessa} />
      </List.Accordion>

      <Button 
        style={{marginVertical: 10}}
        mode="contained"
        onPress={() => Vibration.vibrate(2000)}
      >Värinää!</Button>

      <StatusBar style="auto" />
    </View>
    </>
  );
}
