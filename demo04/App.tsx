import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const App : React.FC = () : React.ReactElement => {

  const tekstikentta : React.MutableRefObject<any> = useRef<TextInput>();
  const [tervehdys, setTervehdys] = useState<string>("");

  const sanoHeippa = () : void => {

    setTervehdys(`Heippa ${tekstikentta.current.value}!`);
    tekstikentta.current.clear();

  }


  return (
    <View style={styles.container}>

      <Text style={{ fontSize: 20 }}>Demo 4: React Native -perusteita</Text>
      
      <Text style={styles.alaotsikko}>Hello world</Text>

      <TextInput 
        ref={tekstikentta}
        style={styles.tekstikentta}
        placeholder='Anna nimesi...'
        onChangeText={ (teksti : string) => tekstikentta.current.value = teksti}
      />

      <Button 
        title='Sano heippa'
        onPress={sanoHeippa}      
      />

      {(Boolean(tervehdys)) 
        ? <Text style={styles.tervehdys}>{tervehdys}</Text>
        : null
      }
      

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop : 30,
    padding: 10
  },
  alaotsikko : {
    fontSize : 16,
    marginTop : 10,
    marginBottom : 20,
  },
  tekstikentta : {
    marginBottom : 20,
  },
  tervehdys : {
    fontSize : 14,
    marginTop : 10,
    marginBottom : 20,
  }
});

export default App;
