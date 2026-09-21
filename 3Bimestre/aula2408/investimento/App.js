import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';

export default function App() {

  const [valor, setValor] = useState('');
  const [meses, setMeses] = useState('');
  const [resultado, setResultado] = useState(0);
  const [lucro, setLucro] = useState(0);

  function calcularInvestimento() {

    const valorInicial = parseFloat(valor);
    const tempo = parseInt(meses);

    if (isNaN(valorInicial) || isNaN(tempo)) {
      alert('Digite valores válidos!');
      return;
    }

    const taxa = 0.01;

    const valorFinal =
      valorInicial * Math.pow(1 + taxa, tempo);

    const ganho = valorFinal - valorInicial;

    setResultado(valorFinal);
    setLucro(ganho);
  }

  function limpar() {
    setValor('');
    setMeses('');
    setResultado(0);
    setLucro(0);
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.titulo}>
          Meu Investimento
        </Text>

        <Text style={styles.subtitulo}>
          Simule quanto seu dinheiro pode render
        </Text>
      </View>

      <View style={styles.card}>

        <Text style={styles.label}>
          Quanto você quer investir?
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: 1000"
          placeholderTextColor="#777"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <Text style={styles.label}>
          Por quantos meses?
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: 12"
          placeholderTextColor="#777"
          keyboardType="numeric"
          value={meses}
          onChangeText={setMeses}
        />

        <Text style={styles.taxa}>
          Rentabilidade: 1% ao mês
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={calcularInvestimento}
        >
          <Text style={styles.textoBotao}>
            CALCULAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoLimpar}
          onPress={limpar}
        >
          <Text style={styles.textoLimpar}>
            LIMPAR
          </Text>
        </TouchableOpacity>

      </View>

      {resultado > 0 && (

        <View style={styles.resultado}>

          <Text style={styles.resultadoTitulo}>
            Resultado do investimento
          </Text>

          <Text style={styles.valorFinal}>
            R$ {resultado.toFixed(2)}
          </Text>

          <Text style={styles.lucroTexto}>
            Você ganhou aproximadamente:
          </Text>

          <Text style={styles.lucro}>
            + R$ {lucro.toFixed(2)}
          </Text>

        </View>

      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20
  },

  header: {
    marginTop: 30,
    marginBottom: 30
  },

  titulo: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  subtitulo: {
    color: '#94a3b8',
    fontSize: 15,
    marginTop: 8
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 15
  },

  label: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8
  },

  input: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155'
  },

  taxa: {
    color: '#22c55e',
    fontSize: 14,
    marginBottom: 20
  },

  botao: {
    backgroundColor: '#22c55e',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textoBotao: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16
  },

  botaoLimpar: {
    marginTop: 10,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textoLimpar: {
    color: '#94a3b8',
    fontWeight: 'bold'
  },

  resultado: {
    backgroundColor: '#1e293b',
    marginTop: 20,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center'
  },

  resultadoTitulo: {
    color: '#94a3b8',
    fontSize: 14
  },

  valorFinal: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10
  },

  lucroTexto: {
    color: '#94a3b8',
    marginTop: 15
  },

  lucro: {
    color: '#22c55e',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5
  }

});