import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { onAuthStateChanged } from 'firebase/auth';

import CadastroScreen from './screens/Cadastro';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import PerfilScreen from './screens/Perfil';
import { auth } from './firebase/firebase';

const Stack = createNativeStackNavigator();

const tema = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#05060a',
    card: '#0d111c',
    border: '#1d2b45',
    primary: '#8b5cf6',
    text: '#f4f4f5'
  }
};

export default function App() {
  const [user, setUser] = useState(null);
  const [verificandoSessao, setVerificandoSessao] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (usuario) => {
        setUser(usuario);
        setVerificandoSessao(false);
      },
      (error) => {
        console.error('Erro ao verificar a sessão:', error);
        setVerificandoSessao(false);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      {verificandoSessao ? (
        <View style={styles.loading}>
          <ActivityIndicator color="#8b5cf6" size="large" />
        </View>
      ) : (
        <NavigationContainer theme={tema}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#0d111c' },
              headerShadowVisible: false,
              headerTintColor: '#f4f4f5',
              headerTitleStyle: { fontWeight: '700' },
              contentStyle: { backgroundColor: '#05060a' }
            }}
          >
            {user ? (
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ title: 'PLAYER ONE' }}
                />
                <Stack.Screen
                  name="Cadastro"
                  component={CadastroScreen}
                  options={{ title: 'ADICIONAR GAME' }}
                />
                <Stack.Screen
                  name="Perfil"
                  component={PerfilScreen}
                  options={{ title: 'MEU PERFIL' }}
                />
              </>
            ) : (
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: 'PLAYER ONE', headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    backgroundColor: '#05060a',
    flex: 1,
    justifyContent: 'center'
  }
});
