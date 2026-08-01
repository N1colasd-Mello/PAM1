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
      nome:"Força Da Juventude",
      imagem:"https://mundodamusicamm.com.br/wp-content/uploads/2026/05/Capa-do-album-Forca-da-Juventude-de-Os-Garotin-1024x770.jpg"
    },
    {
      nome:"Igor",
      imagem:"https://cdn-images.dzcdn.net/images/cover/041ab5ceb6fb6ebf9512966835be9e1b/0x1900-000000-80-0-0.jpg"
    },
    {
      nome:"Freudian",
      imagem:"https://akamai.sscdn.co/uploadfile/letras/albuns/6/1/7/b/593651503926053.jpg"
    },
    {
      nome:"Blond",
      imagem:"https://akamai.sscdn.co/uploadfile/letras/albuns/2/3/9/0/528311701950316.jpg"
    },
    {
      nome:"Patrono",
      imagem:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB1qMJ1aY39CpeAx9k0f58nPz7eCakOlDqXzSN1BmOCmcU0S46cxoOjmQ&s=10"
    },
    {
      nome:"Tons De Marrom",
      imagem:"https://i.scdn.co/image/ab67616d0000b273be7bc0b44878a5266e849742"
    },
    {
      nome:"Melodia&Barulho",
      imagem:"https://i.scdn.co/image/ab67616d0000b273a51652c40b06b9f48d305b2b"
    }
  ];


  return (

    <ScrollView style={styles.tela}>

      <StatusBar style="light"/>


      <View style={styles.container}>


        <Image
          source={{
            uri:
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
          }}
          style={styles.banner}
        />


        <View style={styles.topo}>

          <Text style={styles.logo}>
            Estação 12
          </Text>

        </View>


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