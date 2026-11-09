
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  collection,
  addDoc,
  onSnapshot
} from 'firebase/firestore';

import db from './firebase';

const Stack = createNativeStackNavigator();

// CANDIDATOS
const candidatos = [
  {
    id: '1',
    numero: '10',
    nome: 'Ana Silva',
    partido: 'Partido da Educação'
  },
  {
    id: '2',
    numero: '20',
    nome: 'Bruno Santos',
    partido: 'Partido do Futuro'
  },
  {
    id: '3',
    numero: '30',
    nome: 'Carla Oliveira',
    partido: 'Partido da Mudança'
  },
  {
    id: '4',
    numero: '40',
    nome: 'Diego Costa',
    partido: 'Partido da União'
  }
];

// TELA INICIAL
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>URNA ELETRÔNICA</Text>

      <Text style={styles.subtitulo}>
        Sistema de votação
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Votacao')}
      >
        <Text style={styles.textoBotao}>VOTAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Resultados')}
      >
        <Text style={styles.textoBotao}>RESULTADOS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Informacoes')}
      >
        <Text style={styles.textoBotao}>INFORMAÇÕES</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

// TELA DE VOTAÇÃO
function VotacaoScreen({ navigation }) {

  const [selecionado, setSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // REGISTRAR VOTO NO FIREBASE
  async function confirmarVoto(candidato) {

    if (carregando) return;

    setCarregando(true);

    try {

      await addDoc(collection(db, 'votos'), {
        candidatoId: candidato.id,
        numero: candidato.numero,
        nome: candidato.nome,
        tipo: 'candidato',
        data: new Date().toISOString()
      });

      setSelecionado(null);

      Alert.alert(
        'Voto registrado!',
        'Seu voto foi salvo no Firebase.'
      );

    } catch (error) {

      Alert.alert(
        'Erro',
        'Não foi possível registrar seu voto.'
      );

      console.log(error);

    } finally {
      setCarregando(false);
    }
  }

  // VOTO EM BRANCO
  async function votarBranco() {

    if (carregando) return;

    Alert.alert(
      'Voto em branco',
      'Deseja confirmar seu voto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: async () => {

            setCarregando(true);

            try {

              await addDoc(collection(db, 'votos'), {
                candidatoId: 'branco',
                numero: '',
                nome: 'Voto em branco',
                tipo: 'branco',
                data: new Date().toISOString()
              });

              Alert.alert(
                'Sucesso',
                'Voto em branco registrado!'
              );

            } catch (error) {

              Alert.alert(
                'Erro',
                'Não foi possível registrar o voto.'
              );

            } finally {
              setCarregando(false);
            }
          }
        }
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>

        <Text style={styles.titulo}>
          Escolha seu candidato
        </Text>

        {candidatos.map((candidato) => (

          <TouchableOpacity
            key={candidato.id}
            style={
              selecionado?.id === candidato.id
                ? styles.selecionado
                : styles.candidato
            }
            onPress={() => setSelecionado(candidato)}
          >

            <Text style={styles.numero}>
              {candidato.numero}
            </Text>

            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>
                {candidato.nome}
              </Text>

              <Text style={styles.subtitulo}>
                {candidato.partido}
              </Text>
            </View>

          </TouchableOpacity>

        ))}

        {selecionado && (

          <View style={styles.card}>

            <Text style={styles.nome}>
              Candidato selecionado:
            </Text>

            <Text style={styles.texto}>
              {selecionado.nome}
            </Text>

            <TouchableOpacity
              style={styles.botao}
              disabled={carregando}
              onPress={() => confirmarVoto(selecionado)}
            >
              <Text style={styles.textoBotao}>
                {carregando ? 'AGUARDE...' : 'CONFIRMAR VOTO'}
              </Text>
            </TouchableOpacity>

          </View>

        )}

        <TouchableOpacity
          style={styles.botaoBranco}
          onPress={votarBranco}
          disabled={carregando}
        >
          <Text style={styles.textoBranco}>
            VOTAR EM BRANCO
          </Text>
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}

// TELA DE RESULTADOS
function ResultadosScreen() {

  const [votos, setVotos] = useState({});
  const [total, setTotal] = useState(0);

  // BUSCAR VOTOS EM TEMPO REAL
  useEffect(() => {

    const consulta = collection(db, 'votos');

    const cancelar = onSnapshot(
      consulta,
      (snapshot) => {

        const contagem = {};

        candidatos.forEach((candidato) => {
          contagem[candidato.id] = 0;
        });

        contagem.branco = 0;

        snapshot.forEach((documento) => {

          const voto = documento.data();

          if (voto.tipo === 'branco') {
            contagem.branco++;
          } else if (
            Object.prototype.hasOwnProperty.call(
              contagem,
              voto.candidatoId
            )
          ) {
            contagem[voto.candidatoId]++;
          }

        });

        setVotos(contagem);
        setTotal(snapshot.size);

      },
      (error) => {
        console.log('Erro ao consultar votos:', error);
      }
    );

    return cancelar;

  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>

        <Text style={styles.titulo}>
          RESULTADOS
        </Text>

        <Text style={styles.subtitulo}>
          Votos registrados no Firebase
        </Text>

        {candidatos.map((candidato) => {

          const quantidade = votos[candidato.id] || 0;

          const porcentagem = total > 0
            ? (quantidade / total) * 100
            : 0;

          return (

            <View
              key={candidato.id}
              style={styles.card}
            >

              <Text style={styles.nome}>
                {candidato.nome}
              </Text>

              <Text style={styles.texto}>
                {quantidade} votos
              </Text>

              <Text style={styles.subtitulo}>
                {porcentagem.toFixed(1)}%
              </Text>

            </View>

          );

        })}

        <View style={styles.card}>
          <Text style={styles.nome}>
            Votos em branco
          </Text>

          <Text style={styles.texto}>
            {votos.branco || 0}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.nome}>
            TOTAL DE VOTOS
          </Text>

          <Text style={styles.titulo}>
            {total}
          </Text>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

// TELA DE INFORMAÇÕES
function InformacoesScreen() {

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        INFORMAÇÕES
      </Text>

      <View style={styles.card}>

        <Text style={styles.nome}>
          Como votar?
        </Text>

        <Text style={styles.texto}>
          1. Escolha um candidato.
          {'\n'}
          2. Confira suas informações.
          {'\n'}
          3. Confirme seu voto.
          {'\n'}
          4. O voto será salvo no Firebase.
        </Text>

      </View>

    </SafeAreaView>
  );
}

// NAVEGAÇÃO PRINCIPAL
export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#101010'
          },
          headerTintColor: '#ffffff',
          contentStyle: {
            backgroundColor: '#101010'
          }
        }}
      >

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Início' }}
        />

        <Stack.Screen
          name="Votacao"
          component={VotacaoScreen}
          options={{ title: 'Votação' }}
        />

        <Stack.Screen
          name="Resultados"
          component={ResultadosScreen}
          options={{ title: 'Resultados' }}
        />

        <Stack.Screen
          name="Informacoes"
          component={InformacoesScreen}
          options={{ title: 'Informações' }}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}

// ESTILIZAÇÃO
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#101010',
    padding: 20
  },

  titulo: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15
  },

  subtitulo: {
    color: '#888888',
    fontSize: 14,
    marginBottom: 15
  },

  texto: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 8
  },

  nome: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold'
  },

  numero: {
    color: '#22c55e',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 15
  },

  candidato: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b1b1b',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10
  },

  selecionado: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16351f',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#22c55e'
  },

  card: {
    backgroundColor: '#1b1b1b',
    padding: 20,
    borderRadius: 12,
    marginVertical: 10
  },

  botao: {
    backgroundColor: '#22c55e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10
  },

  textoBotao: {
    color: '#ffffff',
    fontWeight: 'bold'
  },

  botaoBranco: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10
  },

  textoBranco: {
    color: '#101010',
    fontWeight: 'bold'
  }

});
