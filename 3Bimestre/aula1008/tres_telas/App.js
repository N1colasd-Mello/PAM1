import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image
} from 'react-native';

const musicas = [
  {
    id: 1,
    nome: 'Blinding Lights',
    artista: 'The Weeknd',
    album: 'After Hours',
    ano: 2020,
    imagem: 'https://i.scdn.co/image/ab67616d0000b273ef4b7f9c3f6c9c7c5f5c5c5c'
  },
  {
    id: 2,
    nome: 'As It Was',
    artista: 'Harry Styles',
    album: 'Harry’s House',
    ano: 2022,
    imagem: 'https://i.scdn.co/image/ab67616d0000b273ef4b7f9c3f6c9c7c5f5c5c5c'
  },
  {
    id: 3,
    nome: 'Starboy',
    artista: 'The Weeknd',
    album: 'Starboy',
    ano: 2016,
    imagem: 'https://i.scdn.co/image/ab67616d0000b273ef4b7f9c3f6c9c7c5f5c5c5c'
  },
  {
    id: 4,
    nome: 'Sweater Weather',
    artista: 'The Neighbourhood',
    album: 'I Love You.',
    ano: 2013,
    imagem: 'https://i.scdn.co/image/ab67616d0000b273ef4b7f9c3f6c9c7c5f5c5c5c'
  }
];

export default function App() {

  // Guarda qual tela está aberta
  const [tela, setTela] = useState('inicio');

  // Guarda a música selecionada
  const [musicaSelecionada, setMusicaSelecionada] = useState(null);

  // Guarda as músicas favoritas
  const [favoritos, setFavoritos] = useState([]);

  // Função para abrir o perfil da música
  function abrirMusica(musica) {
    setMusicaSelecionada(musica);
    setTela('musica');
  }

  // Função para voltar para a tela inicial
  function voltarInicio() {
    setTela('inicio');
    setMusicaSelecionada(null);
  }

  // Função para adicionar/remover favorito
  function alterarFavorito(musica) {

    const jaExiste = favoritos.some(
      item => item.id === musica.id
    );

    if (jaExiste) {

      setFavoritos(
        favoritos.filter(item => item.id !== musica.id)
      );

    } else {

      setFavoritos([
        ...favoritos,
        musica
      ]);

    }
  }

  // Verifica se uma música é favorita
  function estaNosFavoritos(musica) {
    return favoritos.some(
      item => item.id === musica.id
    );
  }

  // -------------------------
  // TELA INICIAL
  // -------------------------

  function TelaInicio() {

    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.logo}>
            MUSIC
          </Text>

          <Text style={styles.subtitulo}>
            Descubra suas músicas
          </Text>
        </View>

        <FlatList
          data={musicas}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.lista}

          renderItem={({ item }) => (

            <TouchableOpacity
              style={styles.musica}
              onPress={() => abrirMusica(item)}
            >

              <View style={styles.capaPequena}>
                <Text style={styles.nota}>
                  ♪
                </Text>
              </View>

              <View style={styles.infoMusica}>

                <Text style={styles.nomeMusica}>
                  {item.nome}
                </Text>

                <Text style={styles.artista}>
                  {item.artista}
                </Text>

              </View>

              <Text style={styles.seta}>
                ›
              </Text>

            </TouchableOpacity>

          )}

        />

        <Menu />

      </SafeAreaView>
    );
  }

  // -------------------------
  // TELA DA MÚSICA
  // -------------------------

  function TelaMusica() {

    const favorita = estaNosFavoritos(musicaSelecionada);

    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.topo}>

          <TouchableOpacity onPress={voltarInicio}>
            <Text style={styles.voltar}>
              ‹ Voltar
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.perfil}>

          <View style={styles.capaGrande}>
            <Text style={styles.notaGrande}>
              ♪
            </Text>
          </View>

          <Text style={styles.tituloMusica}>
            {musicaSelecionada.nome}
          </Text>

          <Text style={styles.artistaGrande}>
            {musicaSelecionada.artista}
          </Text>

          <Text style={styles.album}>
            Álbum: {musicaSelecionada.album}
          </Text>

          <Text style={styles.ano}>
            Lançamento: {musicaSelecionada.ano}
          </Text>

          <TouchableOpacity
            style={styles.botaoFavorito}
            onPress={() =>
              alterarFavorito(musicaSelecionada)
            }
          >

            <Text style={styles.textoFavorito}>
              {favorita
                ? '★ Remover dos favoritos'
                : '☆ Adicionar aos favoritos'}
            </Text>

          </TouchableOpacity>

        </View>

        <Menu />

      </SafeAreaView>
    );
  }

  // -------------------------
  // TELA DE FAVORITOS
  // -------------------------

  function TelaFavoritos() {

    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.logo}>
            FAVORITOS
          </Text>

          <Text style={styles.subtitulo}>
            Suas músicas favoritas
          </Text>
        </View>

        {favoritos.length === 0 ? (

          <View style={styles.vazio}>

            <Text style={styles.notaVazia}>
              ♫
            </Text>

            <Text style={styles.textoVazio}>
              Você ainda não possui favoritos.
            </Text>

          </View>

        ) : (

          <FlatList
            data={favoritos}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.lista}

            renderItem={({ item }) => (

              <TouchableOpacity
                style={styles.musica}
                onPress={() => abrirMusica(item)}
              >

                <View style={styles.capaPequena}>
                  <Text style={styles.nota}>
                    ♪
                  </Text>
                </View>

                <View style={styles.infoMusica}>

                  <Text style={styles.nomeMusica}>
                    {item.nome}
                  </Text>

                  <Text style={styles.artista}>
                    {item.artista}
                  </Text>

                </View>

                <Text style={styles.coracao}>
                  ★
                </Text>

              </TouchableOpacity>

            )}

          />

        )}

        <Menu />

      </SafeAreaView>
    );
  }

  // -------------------------
  // MENU INFERIOR
  // -------------------------

  function Menu() {

    return (
      <View style={styles.menu}>

        <TouchableOpacity
          onPress={() => setTela('inicio')}
        >
          <Text style={styles.menuItem}>
            🏠
          </Text>

          <Text style={styles.menuTexto}>
            Início
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTela('favoritos')}
        >
          <Text style={styles.menuItem}>
            ★
          </Text>

          <Text style={styles.menuTexto}>
            Favoritos
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

  // -------------------------
  // ESCOLHE QUAL TELA MOSTRAR
  // -------------------------

  if (tela === 'musica') {
    return <TelaMusica />;
  }

  if (tela === 'favoritos') {
    return <TelaFavoritos />;
  }

  return <TelaInicio />;
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#101010'
  },

  header: {
    padding: 25
  },

  logo: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold'
  },

  subtitulo: {
    color: '#888888',
    marginTop: 5,
    fontSize: 15
  },

  lista: {
    padding: 15,
    paddingBottom: 100
  },

  musica: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b1b1b',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10
  },

  capaPequena: {
    width: 60,
    height: 60,
    backgroundColor: '#292929',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  nota: {
    color: '#ffffff',
    fontSize: 28
  },

  infoMusica: {
    flex: 1,
    marginLeft: 15
  },

  nomeMusica: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  artista: {
    color: '#888888',
    marginTop: 5
  },

  seta: {
    color: '#777777',
    fontSize: 30
  },

  topo: {
    padding: 20
  },

  voltar: {
    color: '#ffffff',
    fontSize: 16
  },

  perfil: {
    alignItems: 'center',
    padding: 20
  },

  capaGrande: {
    width: 220,
    height: 220,
    backgroundColor: '#292929',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25
  },

  notaGrande: {
    color: '#ffffff',
    fontSize: 100
  },

  tituloMusica: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  artistaGrande: {
    color: '#aaaaaa',
    fontSize: 18,
    marginTop: 8
  },

  album: {
    color: '#777777',
    marginTop: 20
  },

  ano: {
    color: '#777777',
    marginTop: 5
  },

  botaoFavorito: {
    backgroundColor: '#ffffff',
    paddingVertical: 13,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 25
  },

  textoFavorito: {
    color: '#101010',
    fontWeight: 'bold'
  },

  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  notaVazia: {
    color: '#555555',
    fontSize: 60
  },

  textoVazio: {
    color: '#777777',
    marginTop: 15
  },

  coracao: {
    color: '#ffffff',
    fontSize: 22
  },

  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#181818',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#292929'
  },

  menuItem: {
    textAlign: 'center',
    fontSize: 20
  },

  menuTexto: {
    color: '#aaaaaa',
    fontSize: 11,
    marginTop: 3
  }

});