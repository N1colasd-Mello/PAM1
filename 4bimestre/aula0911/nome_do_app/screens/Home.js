import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase/firebase';

function GameCard({ game, onEdit, onDelete }) {
  return (
    <View style={styles.gameCard}>
      <View style={styles.gameIcon}>
        <Text style={styles.gameIconText}>🎮</Text>
      </View>
      <View style={styles.gameInfo}>
        <Text style={styles.gameTitle}>{game.title}</Text>
        <Text style={styles.gameMeta}>
          {game.platform} · {game.genre || 'Gênero não informado'}
        </Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => onEdit(game)}
            style={styles.actionButtonSecondary}
          >
            <Text style={styles.actionButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => onDelete(game)}
            style={styles.actionButtonDanger}
          >
            <Text style={styles.actionButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
      {typeof game.rating === 'number' && (
        <View style={styles.rating}>
          <Text style={styles.ratingNumber}>{game.rating.toFixed(1)}</Text>
          <Text style={styles.ratingLabel}>/ 10</Text>
        </View>
      )}
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const [games, setGames] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'games'),
      (snapshot) => {
        const lista = snapshot.docs.map((documento) => ({
          id: documento.id,
          ...documento.data()
        }));

        lista.sort((a, b) => {
          const dataA = a.createdAt?.toMillis?.() ?? 0;
          const dataB = b.createdAt?.toMillis?.() ?? 0;
          return dataB - dataA;
        });

        setGames(lista);
        setErro('');
        setCarregando(false);
      },
      (error) => {
        setErro(`Não foi possível carregar os games: ${error.message}`);
        setCarregando(false);
      }
    );

    return unsubscribe;
  }, []);

  async function handleDeleteGame(game) {
    Alert.alert(
      'Excluir game',
      `Deseja remover "${game.title}" da sua coleção?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'games', game.id));
            } catch (error) {
              Alert.alert('Erro', `Não foi possível excluir o game: ${error.message}`);
            }
          }
        }
      ]
    );
  }

  function handleEditGame(game) {
    navigation.navigate('Cadastro', { game });
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={games}
        keyExtractor={(game) => game.id}
        renderItem={({ item }) => (
          <GameCard game={item} onEdit={handleEditGame} onDelete={handleDeleteGame} />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <Text style={styles.eyebrow}>SUA PRÓXIMA FASE COMEÇA AQUI</Text>
            <Text style={styles.heading}>
              Biblioteca{'\n'}
              <Text style={styles.headingAccent}>de Games</Text>
            </Text>
            <Text style={styles.description}>
              Seus jogos favoritos, reunidos em um só lugar.
            </Text>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('Perfil')}
              accessibilityRole="button"
            >
              <Text style={styles.profileButtonText}>MEU PERFIL  ›</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('Cadastro')}
              accessibilityRole="button"
            >
              <Text style={styles.addButtonText}>＋  ADICIONAR GAME</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>MINHA COLEÇÃO</Text>
          </View>
        }
        ListEmptyComponent={
          carregando ? (
            <ActivityIndicator color="#8b5cf6" size="large" style={styles.feedback} />
          ) : erro ? (
            <Text style={styles.error}>{erro}</Text>
          ) : (
            <Text style={styles.empty}>
              Sua coleção ainda está vazia. Adicione o primeiro game!
            </Text>
          )
        }
        ListFooterComponent={
          erro && !carregando && games.length > 0 ? (
            <Text style={styles.error}>{erro}</Text>
          ) : null
        }
      />
      <View style={styles.connection}>
        <View style={[styles.connectionDot, erro && styles.connectionError]} />
        <Text style={styles.connectionText}>
          {erro ? 'SEM CONEXÃO COM O FIREBASE' : 'FIRESTORE EM TEMPO REAL'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05060a'
  },
  listContent: {
    padding: 22,
    paddingBottom: 28,
    flexGrow: 1
  },
  eyebrow: {
    color: '#60a5fa',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 16
  },
  heading: {
    color: '#f4f4f5',
    fontSize: 38,
    fontWeight: '900',
    lineHeight: 43,
    marginTop: 12
  },
  headingAccent: {
    color: '#a78bfa'
  },
  description: {
    color: '#a1a1aa',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10
  },
  profileButton: {
    alignSelf: 'flex-start',
    borderColor: '#493879',
    borderRadius: 9,
    borderWidth: 1,
    marginTop: 18,
    paddingHorizontal: 13,
    paddingVertical: 9
  },
  profileButtonText: {
    color: '#a78bfa',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderColor: '#3b82f6',
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 24,
    padding: 16
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1
  },
  sectionTitle: {
    color: '#60a5fa',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 12,
    marginTop: 30
  },
  gameCard: {
    alignItems: 'center',
    backgroundColor: '#0d111c',
    borderColor: '#1d2b45',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 14
  },
  gameIcon: {
    alignItems: 'center',
    backgroundColor: '#17152a',
    borderColor: '#493879',
    borderWidth: 1,
    borderRadius: 11,
    height: 48,
    justifyContent: 'center',
    marginRight: 13,
    width: 48
  },
  gameIconText: {
    fontSize: 23
  },
  gameInfo: {
    flex: 1
  },
  gameTitle: {
    color: '#f4f4f5',
    fontSize: 15,
    fontWeight: '700'
  },
  gameMeta: {
    color: '#a1a1aa',
    fontSize: 12,
    marginTop: 5
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12
  },
  actionButtonSecondary: {
    backgroundColor: '#1d4ed8',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  actionButtonDanger: {
    backgroundColor: '#b91c1c',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700'
  },
  rating: {
    alignItems: 'center',
    marginLeft: 8
  },
  ratingNumber: {
    color: '#60a5fa',
    fontSize: 17,
    fontWeight: '900'
  },
  ratingLabel: {
    color: '#71717a',
    fontSize: 10,
    marginTop: 1
  },
  feedback: {
    marginTop: 28
  },
  empty: {
    color: '#a1a1aa',
    fontSize: 14,
    lineHeight: 21,
    paddingVertical: 18,
    textAlign: 'center'
  },
  error: {
    color: '#fca5a5',
    fontSize: 13,
    lineHeight: 19,
    paddingVertical: 14
  },
  connection: {
    alignItems: 'center',
    borderTopColor: '#1d2b45',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 13
  },
  connectionDot: {
    backgroundColor: '#8b5cf6',
    borderRadius: 4,
    height: 7,
    marginRight: 8,
    width: 7
  },
  connectionError: {
    backgroundColor: '#f87171'
  },
  connectionText: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1
  }
});