import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';

export default function App() {
  return (
    <ScrollView>
      <View style={styles.titulo}>
        <Text>Teste de tela</Text>
      </View>
      <ScrollView style={styles.cont_texto}>
        <Text>
          O impacto das redes sociais na vida dos jovens

          Nos últimos anos, as redes sociais se tornaram parte integrante da rotina de milhões de jovens em todo o mundo. Plataformas como Instagram, TikTok e Twitter não apenas facilitam a comunicação e o acesso à informação, mas também exercem grande influência sobre comportamentos, valores e autoestima. Apesar de oferecerem benefícios, seu uso indiscriminado pode trazer consequências negativas significativas para o desenvolvimento emocional e social dos adolescentes.

          Entre os aspectos positivos, destaca-se a capacidade das redes sociais de aproximar pessoas e promover o compartilhamento de conhecimentos. Jovens podem acessar conteúdos educativos, participar de grupos de interesse e criar redes de apoio, fortalecendo relações sociais e ampliando horizontes culturais. Além disso, essas plataformas funcionam como espaço de expressão pessoal, permitindo que os usuários desenvolvam habilidades de comunicação e criatividade.

          No entanto, os impactos negativos não podem ser ignorados. O uso excessivo das redes sociais tem sido associado a problemas de saúde mental, como ansiedade, depressão e baixa autoestima. A constante exposição a padrões de beleza irreais e à vida aparentemente perfeita dos outros pode gerar sentimentos de inadequação e insegurança. Além disso, a dependência digital pode prejudicar o desempenho acadêmico e as relações interpessoais, já que o tempo gasto online muitas vezes substitui atividades físicas, estudo e interação face a face.

          Diante desse cenário, torna-se fundamental que jovens, pais e educadores adotem medidas para promover um uso consciente e equilibrado das redes sociais. Estratégias como definir limites de tempo, incentivar atividades offline e discutir criticamente o conteúdo consumido podem reduzir os efeitos prejudiciais e potencializar os benefícios dessas plataformas.

          Portanto, as redes sociais são ferramentas poderosas que moldam a vida dos jovens, trazendo oportunidades e desafios. Seu impacto dependerá do equilíbrio entre o uso saudável e os excessos, sendo essencial a conscientização sobre seus efeitos e a construção de hábitos digitais responsáveis.

          Se você quiser, posso também criar

          A leitura é uma das atividades mais importantes para o desenvolvimento intelectual e social das pessoas. Por meio dela, os indivíduos adquirem conhecimento, ampliam seu vocabulário e desenvolvem a capacidade de interpretar e compreender melhor o mundo ao seu redor. Dessa forma, o hábito da leitura contribui significativamente para a formação de cidadãos mais conscientes e críticos.

          Em primeiro lugar, a leitura possibilita o acesso a diferentes culturas, ideias e perspectivas. Ao ler livros, jornais e outros materiais, as pessoas entram em contato com informações que enriquecem seu repertório cultural e estimulam a reflexão sobre diversos assuntos. Além disso, o hábito de ler favorece o aprendizado em todas as áreas do conhecimento, auxiliando no desempenho escolar e profissional.

          Outro aspecto relevante é o desenvolvimento do pensamento crítico. A leitura permite que o indivíduo analise informações, questione opiniões e forme seus próprios argumentos. Em uma sociedade marcada pela grande circulação de informações, essa capacidade é essencial para evitar a disseminação de notícias falsas e tomar decisões mais conscientes.

          Portanto, a leitura desempenha um papel fundamental na formação do cidadão, pois promove conhecimento, cultura e senso crítico. Por isso, é importante que escolas, famílias e governos incentivem essa prática desde a infância, garantindo que mais pessoas tenham acesso aos benefícios que ela

        </Text>
      </ScrollView>
      <View>
        <TextInput style={{height:40,borderColor: "blue",borderWidth: 2, width: 200,}}>

        </TextInput>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    flex: 1,
    margintop:50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cont_texto: {
    margintop:50,
    height: 500,
    width: 300,
    backgroundColor: "red",
    alignSelf: 'center',
  },
});