import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';

export default function App() {
  const [valorInicial, setValorInicial] = useState('');
  const [investimento, setInvestimento] = useState('');
  const [resultado, setResultado] = useState(0);

  // Função 1: calcula o rendimento do investimento
  const calcularInvestimento = () => {
    const valor = parseFloat(valorInicial);
    const porcentagem = parseFloat(investimento);

    if (isNaN(valor) || isNaN(porcentagem)) {
      setResultado(0);
      return;
    }

    const rendimento = valor * (porcentagem / 100);
    setResultado(rendimento);
  };

  // Função 2: calcula o valor final
  const calcularValor = () => {
    const valor = parseFloat(valorInicial);
    const porcentagem = parseFloat(investimento);

    if (isNaN(valor) || isNaN(porcentagem)) {
      setResultado(0);
      return;
    }

    const valorFinal = valor + valor * (porcentagem / 100);
    setResultado(valorFinal);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Investimento</Text>

      <Text style={styles.label}>Valor inicial</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 1000"
        keyboardType="numeric"
        value={valorInicial}
        onChangeText={setValorInicial}
      />

      <Text style={styles.label}>Investimento (%)</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 10"
        keyboardType="numeric"
        value={investimento}
        onChangeText={setInvestimento}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={calcularInvestimento}
      >
        <Text style={styles.textoBotao}>
          Calcular Investimento
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={calcularValor}
      >
        <Text style={styles.textoBotao}>
          Calcular Valor Final
        </Text>
      </TouchableOpacity>

      <Text style={styles.resultado}>
        Resultado: R$ {resultado.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    padding: 25,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1a1a1a',
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
  },

  botao: {
    backgroundColor: '#1677ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  resultado: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
    color: '#16803c',
  },
});