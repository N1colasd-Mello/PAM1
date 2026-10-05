import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';



const candidatos = [
  {
    id: 1,
    numero: '10',
    nome: 'Ana Silva',
    partido: 'Partido da Educação'
  },
  {
    id: 2,
    numero: '20',
    nome: 'Bruno Santos',
    partido: 'Partido do Futuro'
  },
  {
    id: 3,
    numero: '30',
    nome: 'Carla Oliveira',
    partido: 'Partido da Mudança'
  },
  {
    id: 4,
    numero: '40',
    nome: 'Diego Costa',
    partido: 'Partido da União'
  }
];



export default function App() {


  const [tela, setTela] = useState('votacao');


  const [candidatoSelecionado, setCandidatoSelecionado] = useState(null);


  const [votos, setVotos] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0
  });



  function selecionarCandidato(candidato) {

    setCandidatoSelecionado(candidato);

  }


  function confirmarVoto() {

    if (candidatoSelecionado === null) {

      Alert.alert(
        'Atenção',
        'Selecione um candidato antes de votar.'
      );

      return;
    }


    Alert.alert(
      'Confirmar voto',
      'Você deseja votar em ' +
      candidatoSelecionado.nome +
      '?',

      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },

        {
          text: 'CONFIRMAR',

          onPress: () => {

            setVotos({
              ...votos,
              [candidatoSelecionado.id]:
                votos[candidatoSelecionado.id] + 1
            });

            setCandidatoSelecionado(null);

            Alert.alert(
              'Voto registrado!',
              'Seu voto foi registrado com sucesso.'
            );

          }
        }
      ]
    );
  }


  function votarBranco() {

    Alert.alert(
      'Voto em branco',
      'Deseja confirmar o voto em branco?',

      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },

        {
          text: 'CONFIRMAR',

          onPress: () => {

            Alert.alert(
              'Voto registrado!',
              'Seu voto em branco foi registrado.'
            );

            setCandidatoSelecionado(null);

          }
        }
      ]
    );
  }


  function cancelarSelecao() {

    setCandidatoSelecionado(null);

  }


  function zerarVotacao() {

    Alert.alert(
      'Reiniciar votação',
      'Todos os votos serão apagados. Deseja continuar?',

      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },

        {
          text: 'REINICIAR',

          onPress: () => {

            setVotos({
              1: 0,
              2: 0,
              3: 0,
              4: 0
            });

            setCandidatoSelecionado(null);

          }
        }
      ]
    );
  }



  function TelaVotacao() {

    return (

      <SafeAreaView style={styles.container}>

        <View style={styles.header}>

          <Text style={styles.logo}>
            URNA
          </Text>

          <Text style={styles.subtitulo}>
            Sistema de votação
          </Text>

        </View>


        <View style={styles.areaVotacao}>

          <Text style={styles.tituloSecao}>
            Escolha seu candidato
          </Text>


          {
            candidatos.map((candidato) => (

              <TouchableOpacity

                key={candidato.id}

                style={

                  candidatoSelecionado?.id === candidato.id

                    ? styles.candidatoSelecionado

                    : styles.candidato

                }

                onPress={() =>
                  selecionarCandidato(candidato)
                }

              >

                <View style={styles.numeroContainer}>

                  <Text style={styles.numero}>
                    {candidato.numero}
                  </Text>

                </View>


                <View style={styles.infoCandidato}>

                  <Text style={styles.nome}>
                    {candidato.nome}
                  </Text>

                  <Text style={styles.partido}>
                    {candidato.partido}
                  </Text>

                </View>


                {

                  candidatoSelecionado?.id === candidato.id && (

                    <Text style={styles.check}>
                      ✓
                    </Text>

                  )

                }

              </TouchableOpacity>

            ))
          }



          {

            candidatoSelecionado && (

              <View style={styles.confirmacao}>

                <Text style={styles.confirmacaoTitulo}>
                  Candidato selecionado
                </Text>

                <Text style={styles.confirmacaoNome}>
                  {candidatoSelecionado.nome}
                </Text>

                <Text style={styles.confirmacaoNumero}>
                  Número {candidatoSelecionado.numero}
                </Text>

              </View>

            )

          }


          <View style={styles.botoes}>

            <TouchableOpacity
              style={styles.botaoBranco}
              onPress={votarBranco}
            >

              <Text style={styles.textoBotaoBranco}>
                BRANCO
              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={cancelarSelecao}
            >

              <Text style={styles.textoBotaoCancelar}>
                CORRIGIR
              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              style={styles.botaoConfirmar}
              onPress={confirmarVoto}
            >

              <Text style={styles.textoBotaoConfirmar}>
                CONFIRMAR
              </Text>

            </TouchableOpacity>

          </View>

        </View>


        <Menu />

      </SafeAreaView>

    );

  }



  function TelaResultados() {

    const totalVotos =
      votos[1] +
      votos[2] +
      votos[3] +
      votos[4];


    return (

      <SafeAreaView style={styles.container}>

        <View style={styles.header}>

          <Text style={styles.logo}>
            RESULTADOS
          </Text>

          <Text style={styles.subtitulo}>
            Resultado parcial da votação
          </Text>

        </View>


        <View style={styles.resultados}>

          {

            candidatos.map((candidato) => {

              const quantidade = votos[candidato.id];

              const porcentagem =
                totalVotos > 0
                  ? ((quantidade / totalVotos) * 100).toFixed(1)
                  : 0;


              return (

                <View
                  key={candidato.id}
                  style={styles.resultadoCard}
                >

                  <View style={styles.resultadoNumero}>

                    <Text style={styles.numeroResultado}>
                      {candidato.numero}
                    </Text>

                  </View>


                  <View style={styles.resultadoInfo}>

                    <Text style={styles.resultadoNome}>
                      {candidato.nome}
                    </Text>

                    <Text style={styles.resultadoPartido}>
                      {candidato.partido}
                    </Text>

                    <View style={styles.barraFundo}>

                      <View
                        style={[
                          styles.barra,
                          {
                            width:
                              `${porcentagem}%`
                          }
                        ]}
                      />

                    </View>

                  </View>


                  <View style={styles.quantidade}>

                    <Text style={styles.numeroVotos}>
                      {quantidade}
                    </Text>

                    <Text style={styles.porcentagem}>
                      {porcentagem}%
                    </Text>

                  </View>

                </View>

              );

            })

          }


          <View style={styles.total}>

            <Text style={styles.totalTexto}>
              TOTAL DE VOTOS
            </Text>

            <Text style={styles.totalNumero}>
              {totalVotos}
            </Text>

          </View>


          <TouchableOpacity
            style={styles.botaoReset}
            onPress={zerarVotacao}
          >

            <Text style={styles.textoReset}>
              REINICIAR VOTAÇÃO
            </Text>

          </TouchableOpacity>

        </View>


        <Menu />

      </SafeAreaView>

    );

  }



  function TelaInformacoes() {

    return (

      <SafeAreaView style={styles.container}>

        <View style={styles.header}>

          <Text style={styles.logo}>
            INFORMAÇÕES
          </Text>

          <Text style={styles.subtitulo}>
            Sobre a urna eletrônica
          </Text>

        </View>


        <View style={styles.infoCard}>

          <Text style={styles.infoTitulo}>
            🗳️ Como votar?
          </Text>

          <Text style={styles.infoTexto}>
            1. Escolha um dos candidatos.
          </Text>

          <Text style={styles.infoTexto}>
            2. Confira o número e o nome.
          </Text>

          <Text style={styles.infoTexto}>
            3. Clique em CONFIRMAR.
          </Text>

          <Text style={styles.infoTexto}>
            4. Seu voto será registrado.
          </Text>

        </View>


        <View style={styles.infoCard}>

          <Text style={styles.infoTitulo}>
            Voto em branco
          </Text>

          <Text style={styles.infoTexto}>
            Use o botão BRANCO caso não queira
            escolher nenhum candidato.
          </Text>

        </View>


        <View style={styles.infoCard}>

          <Text style={styles.infoTitulo}>
            Corrigir
          </Text>

          <Text style={styles.infoTexto}>
            O botão CORRIGIR remove o candidato
            selecionado antes da confirmação.
          </Text>

        </View>


        <Menu />

      </SafeAreaView>

    );

  }



  function Menu() {

    return (

      <View style={styles.menu}>

        <TouchableOpacity
          onPress={() => setTela('votacao')}
        >

          <Text style={styles.menuItem}>
            🗳️
          </Text>

          <Text style={styles.menuTexto}>
            Votar
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => setTela('resultados')}
        >

          <Text style={styles.menuItem}>
            📊
          </Text>

          <Text style={styles.menuTexto}>
            Resultados
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => setTela('informacoes')}
        >

          <Text style={styles.menuItem}>
            ℹ️
          </Text>

          <Text style={styles.menuTexto}>
            Informações
          </Text>

        </TouchableOpacity>

      </View>

    );

  }



  if (tela === 'resultados') {

    return <TelaResultados />;

  }


  if (tela === 'informacoes') {

    return <TelaInformacoes />;

  }


  return <TelaVotacao />;

}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#101010'
  },


  header: {
    padding: 25,
    paddingBottom: 15
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


  areaVotacao: {
    padding: 15,
    flex: 1
  },


  tituloSecao: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },


  candidato: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b1b1b',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#292929'
  },


  candidatoSelecionado: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16351f',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#22c55e'
  },


  numeroContainer: {
    width: 55,
    height: 55,
    backgroundColor: '#292929',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },


  numero: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  },


  infoCandidato: {
    flex: 1,
    marginLeft: 15
  },


  nome: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },


  partido: {
    color: '#888888',
    fontSize: 13,
    marginTop: 5
  },


  check: {
    color: '#22c55e',
    fontSize: 25,
    fontWeight: 'bold'
  },


  confirmacao: {
    backgroundColor: '#1b1b1b',
    padding: 15,
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 15,
    alignItems: 'center'
  },


  confirmacaoTitulo: {
    color: '#888888',
    fontSize: 12
  },


  confirmacaoNome: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5
  },


  confirmacaoNumero: {
    color: '#22c55e',
    fontSize: 14,
    marginTop: 3
  },


  botoes: {
    marginTop: 'auto'
  },


  botaoBranco: {
    backgroundColor: '#ffffff',
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },


  textoBotaoBranco: {
    color: '#101010',
    fontWeight: 'bold'
  },


  botaoCancelar: {
    backgroundColor: '#ef4444',
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },


  textoBotaoCancelar: {
    color: '#ffffff',
    fontWeight: 'bold'
  },


  botaoConfirmar: {
    backgroundColor: '#22c55e',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },


  textoBotaoConfirmar: {
    color: '#ffffff',
    fontWeight: 'bold'
  },



  resultados: {
    padding: 15,
    flex: 1
  },


  resultadoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b1b1b',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10
  },


  resultadoNumero: {
    width: 50,
    height: 50,
    backgroundColor: '#292929',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },


  numeroResultado: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  },


  resultadoInfo: {
    flex: 1,
    marginLeft: 12
  },


  resultadoNome: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold'
  },


  resultadoPartido: {
    color: '#777777',
    fontSize: 11,
    marginTop: 3
  },


  barraFundo: {
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 5,
    marginTop: 8,
    overflow: 'hidden'
  },


  barra: {
    height: 6,
    backgroundColor: '#22c55e',
    borderRadius: 5
  },


  quantidade: {
    width: 55,
    alignItems: 'center'
  },


  numeroVotos: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  },


  porcentagem: {
    color: '#22c55e',
    fontSize: 11,
    marginTop: 2
  },


  total: {
    backgroundColor: '#1b1b1b',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 10
  },


  totalTexto: {
    color: '#888888',
    fontSize: 12
  },


  totalNumero: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5
  },


  botaoReset: {
    backgroundColor: '#ef4444',
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },


  textoReset: {
    color: '#ffffff',
    fontWeight: 'bold'
  },


  infoCard: {
    backgroundColor: '#1b1b1b',
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 20,
    borderRadius: 12
  },


  infoTitulo: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },


  infoTexto: {
    color: '#aaaaaa',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 5
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