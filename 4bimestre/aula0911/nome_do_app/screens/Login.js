import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';

import { auth } from '../firebase/firebase';

function mensagemDeErro(error) {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Digite um endereço de e-mail válido.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'E-mail ou senha incorretos.';
    case 'auth/email-already-in-use':
      return 'Este e-mail já possui uma conta. Entre com sua senha.';
    case 'auth/weak-password':
      return 'A senha precisa ter pelo menos 6 caracteres.';
    case 'auth/network-request-failed':
      return 'Sem conexão. Verifique a internet e tente novamente.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde um pouco e tente novamente.';
    case 'auth/operation-not-allowed':
      return 'Ative o login por e-mail e senha nas configurações do Firebase.';
    default:
      return `Não foi possível autenticar: ${error.message}`;
  }
}

export default function LoginScreen() {
  const [criandoConta, setCriandoConta] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function autenticar() {
    const emailNormalizado = email.trim().toLowerCase();

    if (!emailNormalizado || !senha || (criandoConta && !nome.trim())) {
      setErro(criandoConta
        ? 'Preencha seu nome, e-mail e senha.'
        : 'Preencha seu e-mail e senha.');
      return;
    }

    if (criandoConta && senha.length < 6) {
      setErro('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      if (criandoConta) {
        const credencial = await createUserWithEmailAndPassword(
          auth,
          emailNormalizado,
          senha
        );
        await updateProfile(credencial.user, { displayName: nome.trim() });
      } else {
        await signInWithEmailAndPassword(auth, emailNormalizado, senha);
      }
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }

  function alternarModo() {
    setCriandoConta((modoAtual) => !modoAtual);
    setErro('');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brandIcon}>
            <Text style={styles.brandEmoji}>🎮</Text>
          </View>
          <Text style={styles.brand}>PLAYER<Text style={styles.brandAccent}> ONE</Text></Text>
          <Text style={styles.heading}>
            {criandoConta ? 'Crie sua conta' : 'Bem-vindo de volta'}
          </Text>
          <Text style={styles.subtitle}>
            {criandoConta
              ? 'Entre para montar sua biblioteca gamer.'
              : 'Entre para acessar sua coleção de games.'}
          </Text>

          <View style={styles.form}>
            {criandoConta && (
              <>
                <Text style={styles.label}>NOME</Text>
                <TextInput
                  autoCapitalize="words"
                  autoComplete="name"
                  editable={!carregando}
                  maxLength={60}
                  onChangeText={setNome}
                  placeholder="Como podemos te chamar?"
                  placeholderTextColor="#737b8f"
                  returnKeyType="next"
                  style={styles.input}
                  value={nome}
                />
              </>
            )}

            <Text style={styles.label}>E-MAIL</Text>
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              editable={!carregando}
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="voce@email.com"
              placeholderTextColor="#737b8f"
              returnKeyType="next"
              style={styles.input}
              value={email}
            />

            <Text style={styles.label}>SENHA</Text>
            <TextInput
              autoCapitalize="none"
              autoComplete={criandoConta ? 'new-password' : 'password'}
              editable={!carregando}
              onChangeText={setSenha}
              onSubmitEditing={autenticar}
              placeholder="Pelo menos 6 caracteres"
              placeholderTextColor="#737b8f"
              returnKeyType="go"
              secureTextEntry
              style={styles.input}
              value={senha}
            />

            {erro ? <Text style={styles.error}>{erro}</Text> : null}

            <TouchableOpacity
              accessibilityRole="button"
              disabled={carregando}
              onPress={autenticar}
              style={[styles.submitButton, carregando && styles.disabledButton]}
            >
              {carregando ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {criandoConta ? 'CRIAR CONTA' : 'ENTRAR'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            accessibilityRole="button"
            disabled={carregando}
            onPress={alternarModo}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {criandoConta ? 'Já tem uma conta? ' : 'Ainda não tem conta? '}
              <Text style={styles.toggleAccent}>
                {criandoConta ? 'Entrar' : 'Criar conta'}
              </Text>
            </Text>
          </TouchableOpacity>
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 40
  },
  brandIcon: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#10182b',
    borderColor: '#334f82',
    borderRadius: 22,
    borderWidth: 1,
    height: 72,
    justifyContent: 'center',
    marginBottom: 15,
    width: 72
  },
  brandEmoji: {
    fontSize: 34
  },
  brand: {
    color: '#60a5fa',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 4,
    textAlign: 'center'
  },
  brandAccent: {
    color: '#a78bfa'
  },
  heading: {
    color: '#f4f4f5',
    fontSize: 29,
    fontWeight: '900',
    marginTop: 32,
    textAlign: 'center'
  },
  subtitle: {
    color: '#9ca3b4',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
    textAlign: 'center'
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
    letterSpacing: 1.4,
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
    backgroundColor: '#2563eb',
    borderColor: '#3b82f6',
    borderRadius: 11,
    borderWidth: 1,
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
    fontWeight: '900',
    letterSpacing: 1.5
  },
  toggleButton: {
    alignSelf: 'center',
    marginTop: 22,
    padding: 10
  },
  toggleText: {
    color: '#9ca3b4',
    fontSize: 13
  },
  toggleAccent: {
    color: '#a78bfa',
    fontWeight: '800'
  }
});