import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TextInput, 
  Button 
} from 'react-native';

import { useState } from 'react';


export default function App() {

  const [pesquisa, setPesquisa] = useState("");
  const [resultado, setResultado] = useState("");

  function buscarMusica(){
    if(pesquisa == ""){
      setResultado("Digite algo para encontrar sua música!");
    } else {
      setResultado(`Procurando músicas de: ${pesquisa}`);
    }
  }


  const albuns = [
    {
      nome:"Nome do Álbum 1",
      imagem:"https://via.placeholder.com/200"
    },
    {
      nome:"Nome do Álbum 2",
      imagem:"https://via.placeholder.com/200"
    },
    {
      nome:"Nome do Álbum 3",
      imagem:"https://via.placeholder.com/200"
    },
    {
      nome:"Nome do Álbum 4",
      imagem:"https://via.placeholder.com/200"
    },
    {
      nome:"Nome do Álbum 5",
      imagem:"https://via.placeholder.com/200"
    },
    {
      nome:"Nome do Álbum 6",
      imagem:"https://via.placeholder.com/200"
    }
  ];


  return (

    <ScrollView style={styles.tela}>

      <StatusBar style="light"/>


      <View style={styles.container}>


        {/* Imagem principal */}

        <Image
          source={{
            uri:
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
          }}
          style={styles.banner}
        />


        <View style={styles.topo}>

          <Text style={styles.logo}>
            SoundWave
          </Text>

        </View>



        {/* Pesquisa */}

        <View style={styles.areaPesquisa}>

          <TextInput
            style={styles.input}
            placeholder="O que você quer ouvir?"
            placeholderTextColor="#999"
            value={pesquisa}
            onChangeText={setPesquisa}
          />


          <Button
            title="Buscar"
            color="#555"
            onPress={buscarMusica}
          />


          <Text style={styles.resultado}>
            {resultado}
          </Text>


        </View>





        {/* Categorias */}

        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categorias}
        >

          <Text style={styles.tag}>Pop</Text>
          <Text style={styles.tag}>Rock</Text>
          <Text style={styles.tag}>Rap</Text>
          <Text style={styles.tag}>Funk</Text>
          <Text style={styles.tag}>Eletrônica</Text>

        </ScrollView>





        {/* Álbuns */}

        <Text style={styles.titulo}>
          Álbuns em destaque
        </Text>



        <View style={styles.lista}>


          {
            albuns.map((album,index)=>(

              <View 
                style={styles.card}
                key={index}
              >

                <Image
                  source={{
                    uri:album.imagem
                  }}
                  style={styles.capa}
                />


                <Text style={styles.nomeAlbum}>
                  {album.nome}
                </Text>


              </View>

            ))
          }


        </View>



      </View>


    </ScrollView>

  );
}





const styles = StyleSheet.create({


  tela:{
    flex:1,
    backgroundColor:"#050505"
  },


  container:{
    alignItems:"center",
    paddingBottom:40
  },


  banner:{
    width:"100%",
    height:260,
    opacity:0.7
  },


  topo:{
    position:"absolute",
    top:30,
    left:25
  },


  logo:{
    color:"white",
    fontSize:22,
    fontWeight:"bold"
  },


  areaPesquisa:{
    width:"85%",
    marginTop:-60,
    backgroundColor:"#ffffff",
    padding:15,
    borderRadius:12
  },


  input:{
    height:45,
    backgroundColor:"#eee",
    borderRadius:8,
    paddingHorizontal:15,
    marginBottom:10
  },


  resultado:{
    marginTop:10,
    textAlign:"center",
    color:"#333"
  },



  categorias:{
    marginTop:30,
    paddingHorizontal:15
  },


  tag:{
    backgroundColor:"#333",
    color:"white",
    paddingHorizontal:18,
    paddingVertical:8,
    borderRadius:15,
    marginHorizontal:5
  },



  titulo:{
    color:"white",
    fontSize:24,
    fontWeight:"bold",
    marginTop:35,
    marginBottom:20
  },


  lista:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center"
  },



  card:{
    width:150,
    margin:10
  },


  capa:{
    width:150,
    height:150,
    borderRadius:10
  },


  nomeAlbum:{
    color:"white",
    fontSize:15,
    marginTop:10,
    fontWeight:"bold"
  }


});