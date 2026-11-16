import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';

import { db } from '../firebase/firebase';

export default function CadastroScreen({ navigation, route }) {
  const gameEditando = route?.params?.game ?? null;
  const [titulo, setTitulo] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [genero, setGenero] = useState('');
  const [nota, setNota] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const proximoEstado = gameEditando
      ? {
          titulo: gameEditando.title ?? '',
          plataforma: gameEditando.platform ?? '',
          genero: gameEditando.genre ?? '',
          nota:
            typeof gameEditando.rating === 'number'
              ? String(gameEditando.rating)
              : ''
        }
      : {
          titulo: '',
          plataforma: '',
          genero: '',
          nota: ''
        };

    const frameId = requestAnimationFrame(() => {
      setTitulo(proximoEstado.titulo);
      setPlataforma(proximoEstado.plataforma);
      setGenero(proximoEstado.genero);
      setNota(proximoEstado.nota);
    });

    return () => cancelAnimationFrame(frameId);
  }, [gameEditando]);

  async function salvarOuAtualizarGame() {
    const notaNumerica =
      nota.trim() === '' ? null : Number(nota.trim().replace(',', '.'));

    if (!titulo.trim() || !plataforma.trim()) {
      setErro('Preencha o nome do game e a plataforma.');
      return;
    }

    if (
      notaNumerica !== null &&
      (!Number.isFinite(notaNumerica) || notaNumerica < 0 || notaNumerica > 10)
    ) {
      setErro('A nota deve ser um número entre 0 e 10.');
      return;
    }

    setSalvando(true);
    setErro('');

    try {
      if (gameEditando) {
        await updateDoc(doc(db, 'games', gameEditando.id), {
          title: titulo.trim(),
          platform: plataforma.trim(),
          genre: genero.trim() || 'Não informado',
          rating: notaNumerica,
          updatedAt: serverTimestamp()
        });

        navigation.goBack();
        return;
      }

      await addDoc(collection(db, 'games'), {
        title: titulo.trim(),
        platform: plataforma.trim(),
        genre: genero.trim() || 'Não informado',
        rating: notaNumerica,
        createdAt: serverTimestamp()
      });

      navigation.navigate('Home');
    } catch (error) {
      setErro(
        gameEditando
          ? `Não foi possível atualizar o game: ${error.message}`
          : `Não foi possível salvar o game: ${error.message}`
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.eyebrow}>
            {gameEditando ? 'ATUALIZAR CADASTRO' : 'NOVA AQUISIÇÃO'}
          </Text>
          <Text style={styles.heading}>
            {gameEditando ? 'Editar' : 'Adicionar'}
            {'\n'}
            {gameEditando ? 'o game' : 'à coleção'}
          </Text>
          <Text style={styles.description}>
            {gameEditando
              ? 'Atualize os detalhes deste item da sua biblioteca.'
              : 'Cadastre os detalhes do game para salvar na sua biblioteca.'}
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>NOME DO GAME *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Hollow Knight"
              placeholderTextColor="#71717a"
              value={titulo}
              onChangeText={setTitulo}
              maxLength={80}
              returnKeyType="next"
            />

            <Text style={styles.label}>PLATAFORMA *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Nintendo Switch"
              placeholderTextColor="#71717a"
              value={plataforma}
              onChangeText={setPlataforma}
              maxLength={50}
              returnKeyType="next"
            />

            <Text style={styles.label}>GÊNERO</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Aventura"
              placeholderTextColor="#71717a"
              value={genero}
              onChangeText={setGenero}
              maxLength={40}
              returnKeyType="next"
            />

            <Text style={styles.label}>NOTA (0 A 10)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: 9.5"
              placeholderTextColor="#71717a"
              value={nota}
              onChangeText={setNota}
              keyboardType="decimal-pad"
              maxLength={4}
            />

            {erro ? <Text style={styles.error}>{erro}</Text> : null}

            <TouchableOpacity
              style={[styles.submitButton, salvando && styles.disabledButton]}
              onPress={salvarOuAtualizarGame}
              disabled={salvando}
              accessibilityRole="button"
            >
              {salvando ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {gameEditando ? 'ATUALIZAR NO FIREBASE' : 'SALVAR NO FIREBASE'}
                </Text>
              )}
            </TouchableOpacity>

            <Text style={styles.required}>* Campos obrigatórios</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#05060a',
    flex: 1
  },
  flex: {
    flex: 1
  },
  content: {
    padding: 22,
    paddingBottom: 36
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
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 41,
    marginTop: 12
  },
  description: {
    color: '#a1a1aa',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10
  },
  form: {
    backgroundColor: '#0d111c',
    borderColor: '#1d2b45',
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 26,
    padding: 18
  },
  label: {
    color: '#a78bfa',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 12
  },
  input: {
    backgroundColor: '#070a11',
    borderColor: '#263b5c',
    borderRadius: 10,
    borderWidth: 1,
    color: '#f4f4f5',
    fontSize: 14,
    minHeight: 48,
    paddingHorizontal: 13
  },
  error: {
    color: '#fca5a5',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 14
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#7c3aed',
    borderColor: '#8b5cf6',
    borderWidth: 1,
    borderRadius: 11,
    justifyContent: 'center',
    marginTop: 22,
    minHeight: 50
  },
  disabledButton: {
    opacity: 0.65
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1
  },
  required: {
    color: '#71717a',
    fontSize: 11,
    marginTop: 12,
    textAlign: 'center'
  }
});