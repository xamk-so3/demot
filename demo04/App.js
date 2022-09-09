import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {

  const [tervehdys, setTervehdys] = useState();
  const [nimi, setNimi] = useState();

  const sanoHeippa = () => {

    setTervehdys(`Heippa, ${nimi}!`);

  }

  return (
    <View style={styles.container}>

      <Text style={styles.otsikko}>Demo 8: React Native -perusteita</Text>

      <TextInput 
        placeholder="Anna nimesi"
        onChangeText={ (nimi) => {setNimi(nimi)} }
      />

      <Button 
        title="Sano heippa" 
        onPress={sanoHeippa}
      />

      <Text>{tervehdys}</Text>


    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding : 30
  },
  otsikko : {
    fontSize: 22
  }
});
