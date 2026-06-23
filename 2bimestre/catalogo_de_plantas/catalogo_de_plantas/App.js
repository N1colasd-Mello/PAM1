import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.fundo}>
      <View>
        <Text>Catalogo de Plantas</Text>
      </View>
      <View>
        <Button onPress={() => {setIsHungry(false);}} title={'Babosa'}>

        </Button>

        <Button onPress={() => {setIsHungry(false);}} title={'Abacatero'}>

        </Button>

        <Button onPress={() => {setIsHungry(false);}} title={'Rosa'}>

        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#91e999',
  },
});