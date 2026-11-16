import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';

import { auth } from '../firebase/firebase';

export default function PerfilScreen() {
  const [user, setUser] = useState(auth.currentUser);
  const [nome, setNome] = useState(auth.currentUser?.displayName ?? '');
  const [salvando, setSalvando] = useState(false);
  const [saindo, setSaindo] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
      setNome(usuario?.displayName ?? '');
    });

    return unsubscribe;
  }, []);

  async function salvarNome() {
    const nomeAtualizado = nome.trim();

    if (!nomeAtualizado) {
      setErro('Digite um nome para o perfil.');
      setMensagem('');
      return;
    }

    if (!auth.currentUser) {
      setErro('Sua sessão expirou. Entre novamente.');
      setMensagem('');
      return;
    }

    setSalvando(true);
    setErro('');
    setMensagem('');

    try {
      await updateProfile(auth.currentUser, { displayName: nomeAtualizado });
      setUser(auth.currentUser);
      setMensagem('Nome do perfil atualizado.');
    } catch (error) {
      setErro(`Não foi possível atualizar o perfil: ${error.message}`);
    } finally {
      setSalvando(false);
    }
  }

  async function sair() {
    setSaindo(true);
    setErro('');

    try {
      await signOut(auth);
    } catch (error) {
      setErro(`Não foi possível sair da conta: ${error.message}`);
      setSaindo(false);
    }
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <ActivityIndicator color="#8b5cf6" size="large" />
      </SafeAreaView>
    );
  }

  const iniciais = (user.displayName || user.email || 'G')
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{iniciais}</Text>
        </View>
        <Text style={styles.heading}>Seu perfil gamer</Text>
        <Text style={styles.subtitle}>
          Gerencie as informações da sua conta.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>NOME DE EXIBIÇÃO</Text>
          <TextInput
            autoCapitalize="words"
            editable={!salvando && !saindo}
            maxLength={60}
            onChangeText={setNome}
            placeholder="Seu nome"
            placeholderTextColor="#737b8f"
            style={styles.input}
            value={nome}
          />

          <Text style={styles.label}>E-MAIL DA CONTA</Text>
          <View style={styles.emailBox}>
            <Text style={styles.email}>{user.email || 'E-mail não disponível'}</Text>
          </View>

          {erro ? <Text style={styles.error}>{erro}</Text> : null}
          {mensagem ? <Text style={styles.success}>{mensagem}</Text> : null}

          <TouchableOpacity
            accessibilityRole="button"
            disabled={salvando || saindo}
            onPress={salvarNome}
            style={[styles.saveButton, (salvando || saindo) && styles.disabled]}
          >
            {salvando ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.saveButtonText}>SALVAR PERFIL</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          disabled={salvando || saindo}
          onPress={sair}
          style={[styles.logoutButton, (salvando || saindo) && styles.disabled]}
        >
          {saindo ? (
            <ActivityIndicator color="#c4b5fd" />
          ) : (
            <Text style={styles.logoutButtonText}>SAIR DA CONTA</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#05060a',
    flex: 1
  },
  content: {
    flex: 1,
    padding: 22,
    paddingTop: 34
  },
  avatar: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#17152a',
    borderColor: '#493879',
    borderRadius: 38,
    borderWidth: 2,
    height: 76,
    justifyContent: 'center',
    width: 76
  },
  avatarText: {
    color: '#c4b5fd',
    fontSize: 30,
    fontWeight: '900'
  },
  heading: {
    color: '#f4f4f5',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 18,
    textAlign: 'center'
  },
  subtitle: {
    color: '#9ca3b4',
    fontSize: 14,
    marginTop: 7,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#0d111c',
    borderColor: '#1d2b45',
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 28,
    padding: 18
  },
  label: {
    color: '#a78bfa',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.3,
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
  emailBox: {
    backgroundColor: '#070a11',
    borderColor: '#1d2b45',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 13
  },
  email: {
    color: '#a1a1aa',
    fontSize: 14
  },
  error: {
    color: '#fca5a5',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 14
  },
  success: {
    color: '#86efac',
    fontSize: 13,
    marginTop: 14
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderColor: '#3b82f6',
    borderRadius: 11,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 22,
    minHeight: 50
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.3
  },
  logoutButton: {
    alignItems: 'center',
    borderColor: '#493879',
    borderRadius: 11,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 16,
    minHeight: 48
  },
  logoutButtonText: {
    color: '#c4b5fd',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2
  },
  disabled: {
    opacity: 0.65
  }
});