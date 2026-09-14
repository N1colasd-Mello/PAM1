import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0b0b16',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

    height: 70,

    backgroundColor: '#17172b',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    paddingHorizontal: 20,

    borderBottomWidth: 2,
    borderBottomColor: '#7c3aed',
  },

  menuTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  tela: {
    width: '85%',

    alignItems: 'center',
    justifyContent: 'center',

    padding: 30,

    backgroundColor: '#17172b',

    borderRadius: 20,

    borderWidth: 1,
    borderColor: '#34345a',

    shadowColor: '#7c3aed',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 10,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',

    color: '#a855f7',

    textAlign: 'center',

    marginBottom: 20,
  },

  texto: {
    fontSize: 18,

    color: '#d1d1e0',

    textAlign: 'center',

    lineHeight: 28,

    marginBottom: 30,
  },

  jogo: {
    width: '100%',

    fontSize: 16,
    fontWeight: 'bold',

    color: '#ffffff',

    backgroundColor: '#252542',

    padding: 15,

    marginBottom: 10,

    borderRadius: 10,
  },

  botao: {
    backgroundColor: '#7c3aed',

    paddingVertical: 13,
    paddingHorizontal: 30,

    borderRadius: 10,

    marginTop: 15,
  },

  botaoTexto: {
    color: '#ffffff',

    fontSize: 16,

    fontWeight: 'bold',
  },

});

export default styles;