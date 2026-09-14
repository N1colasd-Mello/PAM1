import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

    height: 70,

    backgroundColor: '#222',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    paddingHorizontal: 20,
  },

  menuTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  tela: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 30,

    backgroundColor: '#f5f5f5',

    borderRadius: 15,
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',

    color: '#222',

    marginBottom: 20,
  },

  texto: {
    fontSize: 18,
    color: '#555',

    textAlign: 'center',

    marginBottom: 30,
  },

  botao: {
    backgroundColor: '#007bff',

    paddingVertical: 12,
    paddingHorizontal: 25,

    borderRadius: 8,
  },

  botaoTexto: {
    color: '#fff',

    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default styles;