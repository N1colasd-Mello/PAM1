import React, { useState } from 'react';
import {View,Text,StyleSheet,FlatList,Image,TextInput,SafeAreaView,StatusBar} from 'react-native';

const jogos = [
  {
    id: 1,
    nome: 'The Legend of Zelda: Ocarina of Time',
    nota: 99,
    ano: 1998,
    plataforma: 'Nintendo 64',
    imagem: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg'
  },
  {
    id: 2,
    nome: 'Tony Hawk’s Pro Skater 2',
    nota: 98,
    ano: 2000,
    plataforma: 'PlayStation',
    imagem: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg'
  },
  {
    id: 3,
    nome: 'Grand Theft Auto IV',
    nota: 98,
    ano: 2008,
    plataforma: 'PS3 / Xbox 360',
    imagem: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg'
  },
  {
    id: 4,
    nome: 'SoulCalibur',
    nota: 98,
    ano: 1999,
    plataforma: 'Dreamcast',
    imagem: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x8i.jpg'
  },
  {
    id: 5,
    nome: 'Super Mario Galaxy',
    nota: 97,
    ano: 2007,
    plataforma: 'Nintendo Wii',
    imagem: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1y1q.jpg'
  },
  {
    id: 6,
    nome: 'Red Dead Redemption 2',
    nota: 97,
    ano: 2018,
    plataforma: 'PS4 / Xbox One',
    imagem: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg'
  },
  {
    id: 7,
    nome: 'The Last of Us',
    nota: 95,
    ano: 2013,
    plataforma: 'PlayStation 3',
    imagem: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rni.jpg'
  },
  {
    id: 8,
    nome: 'God of War',
    nota: 94,
    ano: 2018,
    plataforma: 'PlayStation 4',
    imagem: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1t0x.jpg'
  },
  {
    id: 9,
    nome: 'Minecraft',
    nota: 93,
    ano: 2011,
    plataforma: 'Multiplataforma',
    imagem: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.jpg'
  },
  {
    id: 10,
    nome: 'Elden Ring',
    nota: 96,
    ano: 2022,
    plataforma: 'PS5 / Xbox / PC',
    imagem: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg'
  }
];


function Jogo({ item }) {
  return (
    <View style={styles.card}>

      <View style={styles.posicao}>
        <Text style={styles.numero}>
          #{item.id}
        </Text>
      </View>

      <Image
        source={{ uri: item.imagem }}
        style={styles.capa}
      />

      <View style={styles.informacoes}>

        <Text style={styles.nome} numberOfLines={2}>
          {item.nome}
        </Text>

        <Text style={styles.plataforma}>
          {item.plataforma}
        </Text>

        <Text style={styles.ano}>
          {item.ano}
        </Text>

      </View>

      <View style={styles.notaContainer}>

        <Text style={styles.nota}>
          {item.nota}
        </Text>

        <Text style={styles.metacritic}>
          METACRITIC
        </Text>

      </View>

    </View>
  );
}

export default function App() {

  const [pesquisa, setPesquisa] = useState('');

  const jogosFiltrados = jogos.filter((jogo) =>
    jogo.nome
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#09090b"
      />

      <View style={styles.header}>

        <Text style={styles.titulo}>
          TOP 100
        </Text>

        <Text style={styles.subtitulo}>
          GAMES
        </Text>

        <Text style={styles.descricao}>
          Os jogos mais bem avaliados pelo Metacritic
        </Text>

      </View>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar jogo..."
        placeholderTextColor="#777"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      <FlatList
        data={jogosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Jogo item={item} />
        )}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#09090b'
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15
  },

  titulo: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '900'
  },

  subtitulo: {
    color: '#4ade80',
    fontSize: 30,
    fontWeight: '900',
    marginTop: -5
  },

  descricao: {
    color: '#999',
    fontSize: 14,
    marginTop: 8
  },

  input: {
    backgroundColor: '#18181b',
    color: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#27272a'
  },

  lista: {
    paddingHorizontal: 15,
    paddingBottom: 30
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b',
    marginBottom: 10,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#27272a'
  },

  posicao: {
    width: 35,
    alignItems: 'center'
  },

  numero: {
    color: '#71717a',
    fontSize: 14,
    fontWeight: 'bold'
  },

  capa: {
    width: 60,
    height: 80,
    borderRadius: 6,
    marginHorizontal: 10
  },

  informacoes: {
    flex: 1,
    justifyContent: 'center'
  },

  nome: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  plataforma: {
    color: '#a1a1aa',
    fontSize: 12,
    marginTop: 5
  },

  ano: {
    color: '#71717a',
    fontSize: 11,
    marginTop: 3
  },

  notaContainer: {
    width: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },

  nota: {
    color: '#4ade80',
    fontSize: 22,
    fontWeight: '900'
  },

  metacritic: {
    color: '#71717a',
    fontSize: 7,
    fontWeight: 'bold',
    marginTop: 2
  }

});