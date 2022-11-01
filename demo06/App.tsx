import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View } from 'react-native';
import { Appbar, FAB, Text } from 'react-native-paper';
import { Camera, CameraCapturedPicture, PermissionResponse } from 'expo-camera';
import { useRef, useState } from 'react';

interface Kuvaustiedot {
  kuvaustila : boolean,
  virhe : string
  kuva? : CameraCapturedPicture
  info : string
}

const App : React.FC = () : React.ReactElement => {

  const kameraRef : any = useRef<Camera>();
  
  const [kuvaustiedot, setKuvaustiedot] = useState<Kuvaustiedot>({
                                                                  kuvaustila : false,
                                                                  virhe : "",
                                                                  info : ""
                                                                });

  const kaynnistaKamera = async () : Promise<void> => {

    const kameralupa : PermissionResponse = await Camera.getCameraPermissionsAsync();

    setKuvaustiedot({
      ...kuvaustiedot,
      kuvaustila : kameralupa.granted,
      virhe : (!kameralupa.granted) ? "Ei lupaa kameran käyttöön." : ""
    });

  }

  const otaKuva = async () : Promise<void> => {

    setKuvaustiedot({
      ...kuvaustiedot,
      info : "Odota hetki..."
    });

    const apukuva : CameraCapturedPicture = await kameraRef.current.takePictureAsync()

    setKuvaustiedot({
      ...kuvaustiedot,
      kuvaustila : false,
      kuva : apukuva,
      info : ""
    });


  }

  return (
    (kuvaustiedot.kuvaustila) 
    ? <Camera style={styles.kuvaustila} ref={kameraRef}>

          {(Boolean(kuvaustiedot.info)) 
            ? <Text style={{ color : "#fff"}}>{kuvaustiedot.info}</Text>
            : null
          }

        <FAB 
          style={styles.nappiOtaKuva}
          icon="camera"
          label="Ota kuva"
          onPress={otaKuva}
        />

        <FAB 
          style={styles.nappiSulje}
          icon="close"
          label="Sulje"
          onPress={ () => setKuvaustiedot({...kuvaustiedot, kuvaustila : false})}
        />

      </Camera>
    : <>
        <Appbar.Header>
          <Appbar.Content title="Demo 6: Kamera" />
          <Appbar.Action 
            icon="camera"
            onPress={kaynnistaKamera}
          />
        </Appbar.Header>
        <View style={styles.container}>

          {(Boolean(kuvaustiedot.virhe)) 
            ? <Text>{kuvaustiedot.virhe}</Text>
            : null
          }

          {(Boolean(kuvaustiedot.kuva))
           ? <Image 
                style={styles.kuva}
                source={{uri : kuvaustiedot.kuva!.uri}}
             />
            : null
          }

          <StatusBar style="auto" />
        </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kuvaustila: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nappiSulje: {
    position : 'absolute',
    margin : 20,
    bottom : 0,
    right : 0
  },
  nappiOtaKuva: {
    position : 'absolute',
    margin : 20,
    bottom : 0,
    left : 0
  },
  kuva: {
    width : 300,
    height : 400,
    resizeMode : 'stretch'
  }
});

export default App;
