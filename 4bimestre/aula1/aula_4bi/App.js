
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// TELA INICIAL
function HomeScreen({ navigation, tarefas, excluirTarefa }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0088B8" barStyle="light-content" />

      <View style={styles.cabecalho}>
        <Text style={styles.emoji}>🍍 🫧 🌊</Text>
        <Text style={styles.titulo}>Fenda do Biquíni</Text>
        <Text style={styles.subtitulo}>
          As missões do Bob Esponja!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.textoBotao}>
          ⭐ Nova missão
        </Text>
      </TouchableOpacity>

      <Text style={styles.tituloLista}>
        📋 Lista de missões
      </Text>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhuma missão por enquanto! 🐚
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.emojiTarefa}>🧽</Text>

            <Text style={styles.textoTarefa}>
              {item.nome}
            </Text>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirTarefa(item.id)}
            >
              <Text style={styles.textoExcluir}>✖</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.rodape}>
        🍍 Diversão garantida na Fenda do Biquíni!
      </Text>
    </View>
  );
}

// TELA DE CADASTRO
function CadastroScreen({ navigation, adicionarTarefa }) {
  const [nome, setNome] = useState('');

  function cadastrar() {
    if (nome.trim() === '') {
      Alert.alert(
        'Ops, lula molusco!',
        'Digite uma missão antes de salvar!'
      );
      return;
    }

    adicionarTarefa(nome.trim());
    setNome('');
    navigation.goBack();
  }

  return (
    <View style={styles.containerCadastro}>
      <View style={styles.cartaoCadastro}>
        <Text style={styles.emojiGrande}>🧽⭐</Text>

        <Text style={styles.titulo}>
          Nova missão!
        </Text>

        <Text style={styles.subtituloCadastro}>
          O que vamos fazer hoje, Bob?
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex.: Trabalhar no Siri Cascudo"
          placeholderTextColor="#64828C"
          value={nome}
          onChangeText={setNome}
          maxLength={100}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={cadastrar}
        >
          <Text style={styles.textoBotao}>
            🍍 Salvar missão
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoVoltar}>
            Voltar para a Fenda
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// APLICATIVO PRINCIPAL
export default function App() {
  const [tarefas, setTarefas] = useState([
    { id: '1', nome: 'Trabalhar no Siri Cascudo' },
    { id: '2', nome: 'Brincar com o Patrick' },
    { id: '3', nome: 'Caçar águas-vivas' }
  ]);

  // FUNÇÃO PARA ADICIONAR UMA MISSÃO
  function adicionarTarefa(nome) {
    const novaTarefa = {
      id: Date.now().toString(),
      nome: nome
    };

    setTarefas(listaAtual => [
      ...listaAtual,
      novaTarefa
    ]);
  }

  // FUNÇÃO PARA EXCLUIR UMA MISSÃO
  function excluirTarefa(id) {
    Alert.alert(
      'Missão concluída?',
      'Deseja remover esta missão da lista?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Remover',
          onPress: () => {
            setTarefas(listaAtual =>
              listaAtual.filter(
                tarefa => tarefa.id !== id
              )
            );
          }
        }
      ]
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0088B8'
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          contentStyle: {
            backgroundColor: '#8DE3F5'
          }
        }}
      >
        <Stack.Screen
          name="Inicio"
          options={{
            title: '🍍 Fenda do Biquíni'
          }}
        >
          {props => (
            <HomeScreen
              {...props}
              tarefas={tarefas}
              excluirTarefa={excluirTarefa}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{
            title: '⭐ Nova missão'
          }}
        >
          {props => (
            <CadastroScreen
              {...props}
              adicionarTarefa={adicionarTarefa}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ESTILIZAÇÃO DO APP
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8DE3F5',
    padding: 20
  },

  cabecalho: {
    backgroundColor: '#FFF2A6',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#F5C542'
  },

  emoji: {
    fontSize: 30,
    marginBottom: 8
  },

  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#075985',
    textAlign: 'center'
  },

  subtitulo: {
    fontSize: 15,
    color: '#39718A',
    marginTop: 6,
    textAlign: 'center'
  },

  botao: {
    backgroundColor: '#F5C542',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E6A817',
    marginBottom: 20
  },

  textoBotao: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#174B66'
  },

  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#075985',
    marginBottom: 12
  },

  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#65CDE5'
  },

  emojiTarefa: {
    fontSize: 25,
    marginRight: 10
  },

  textoTarefa: {
    fontSize: 15,
    color: '#174B66',
    fontWeight: '600',
    flex: 1
  },

  botaoExcluir: {
    backgroundColor: '#FFDADA',
    padding: 9,
    borderRadius: 10,
    marginLeft: 8
  },

  textoExcluir: {
    color: '#C62828',
    fontWeight: 'bold',
    fontSize: 16
  },

  vazio: {
    color: '#075985',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 16
  },

  rodape: {
    color: '#075985',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5
  },

  containerCadastro: {
    flex: 1,
    backgroundColor: '#8DE3F5',
    padding: 20,
    justifyContent: 'center'
  },

  cartaoCadastro: {
    backgroundColor: '#FFF8CC',
    padding: 22,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#F5C542',
    alignItems: 'stretch'
  },

  emojiGrande: {
    fontSize: 45,
    textAlign: 'center',
    marginBottom: 10
  },

  subtituloCadastro: {
    color: '#39718A',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#65CDE5',
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
    marginBottom: 15,
    color: '#174B66'
  },

  botaoVoltar: {
    padding: 12,
    alignItems: 'center'
  },

  textoVoltar: {
    color: '#075985',
    fontSize: 15,
    fontWeight: 'bold'
  }
});