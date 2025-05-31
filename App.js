import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';

// Componente funcional para renderizar um único item da lista de jogadores.
// Recebe um objeto 'jogador' como prop.
const JogadorItem = ({ jogador }) => (
  <View style={styles.jogadorContainer}>
    {/* Renderiza a foto do jogador se a URL estiver disponível. */}
    {/* Caso contrário, mostra um placeholder com um ponto de interrogação. */}
    {jogador.foto ? (
      <Image source={{ uri: jogador.foto }} style={styles.jogadorFoto} />
    ) : (
      <View style={styles.jogadorFotoPlaceholder}>
        <Text style={styles.jogadorFotoPlaceholderText}>?</Text>
      </View>
    )}
    <View style={styles.jogadorInfo}>
      {/* Exibe o nome do jogador. */}
      <Text style={styles.jogadorNome}>{jogador.nome}</Text>
      {/* Exibe a posição do jogador. */}
      <Text style={styles.jogadorDetalhe}>Posição: {jogador.posicao}</Text>
      {/* Exibe o número da camisa do jogador. */}
      <Text style={styles.jogadorDetalhe}>Número: {jogador.numero}</Text>
    </View>
  </View>
);

// Componente principal do aplicativo.
export default function App() {
  // Estado para armazenar a lista de jogadores. Inicialmente um array vazio.
  const [jogadores, setJogadores] = useState([]);
  // Estado para controlar o indicador de carregamento. Inicialmente true (carregando).
  const [loading, setLoading] = useState(true);
  // Estado para armazenar mensagens de erro. Inicialmente nulo.
  const [error, setError] = useState(null);

  // useEffect é um hook que executa efeitos colaterais em componentes funcionais.
  // O array vazio [] como segundo argumento garante que este efeito
  // seja executado apenas uma vez, após a montagem inicial do componente.
  useEffect(() => {
    // Função assíncrona para buscar os dados dos jogadores da API.
    const fetchJogadores = async () => {
      try {
        // --- PONTO CRÍTICO: USE O SEU IP CORRETO AQUI! ---
        //
        // Você me informou que o seu IP é 192.168.15.28.
        // Se este IP mudar, você precisará atualizar esta linha.
        const response = await fetch('http://192.168.15.28:3000/jogadores'); // <--- SEU IP FOI INSERIDO AQUI!

        // Verifica se a resposta da requisição foi bem-sucedida (status HTTP 2xx).
        if (!response.ok) {
          // Se não for bem-sucedida, lança um erro.
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        // Converte o corpo da resposta para um objeto JavaScript (assumindo que a API retorna JSON).
        const data = await response.json();
        // Atualiza o estado 'jogadores' com os dados recebidos.
        setJogadores(data);
      } catch (err) {
        // Captura e trata qualquer erro que ocorra durante a requisição.
        console.error('Erro ao buscar jogadores:', err);
        setError(
          'Não foi possível carregar os jogadores. Verifique a conexão com a API e o IP.'
        );
        // Exibe um alerta para o usuário.
        Alert.alert(
          'Erro na Conexão',
          'Não foi possível carregar os jogadores. Por favor, verifique se a API está rodando e se o IP no App.js está correto e acessível.'
        );
      } finally {
        // Independentemente de sucesso ou erro, define 'loading' como false
        // para esconder o indicador de carregamento.
        setLoading(false);
      }
    };

    // Chama a função para buscar os jogadores.
    fetchJogadores();
  }, []); // O array vazio [] significa que este efeito só roda uma vez na montagem.

  // Lógica de renderização condicional:
  // 1. Se estiver carregando, mostra um indicador de atividade.
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Jogadores do Palmeiras</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#004d00" />
          <Text style={styles.loadingText}>Carregando jogadores...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // 2. Se houver um erro, mostra uma mensagem de erro.
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Jogadores do Palmeiras</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // 3. Se não estiver carregando e não houver erro, mostra a lista de jogadores.
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Jogadores do Palmeiras</Text>
      </View>
      {/* FlatList é um componente otimizado para renderizar listas longas. */}
      <FlatList
        data={jogadores} // Os dados a serem renderizados.
        keyExtractor={(item) => item.id} // Função para extrair uma chave única para cada item.
        renderItem={({ item }) => <JogadorItem jogador={item} />} // Função para renderizar cada item.
        contentContainerStyle={styles.listContent} // Estilos para o contêiner do conteúdo da lista.
      />
    </SafeAreaView>
  );
}

// Objeto StyleSheet para definir os estilos dos componentes.
// É similar ao CSS, mas usa sintaxe JavaScript (camelCase para propriedades).
const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ocupa todo o espaço disponível.
    backgroundColor: '#006400', // Verde escuro para a área segura (topo e base da tela).
  },
  header: {
    backgroundColor: '#004d00', // Verde mais escuro para o cabeçalho.
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#003300',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Texto branco.
  },
  listContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  jogadorContainer: {
    flexDirection: 'row', // Organiza os itens em linha (foto e info lado a lado).
    backgroundColor: '#f0f0f0', // Fundo cinza claro para cada item do jogador.
    padding: 15,
    marginVertical: 8, // Espaçamento vertical entre os itens.
    borderRadius: 10, // Cantos arredondados.
    alignItems: 'center', // Alinha itens verticalmente ao centro.
    shadowColor: '#000', // Propriedades para sombra (iOS).
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Propriedade para sombra (Android).
  },
  jogadorFoto: {
    width: 70,
    height: 70,
    borderRadius: 35, // Metade da largura/altura para fazer um círculo.
    marginRight: 15,
    backgroundColor: '#ccc', // Cor de fundo enquanto a imagem carrega.
  },
  jogadorFotoPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    backgroundColor: '#a0a0a0', // Fundo cinza escuro para o placeholder.
    justifyContent: 'center',
    alignItems: 'center',
  },
  jogadorFotoPlaceholderText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  jogadorInfo: {
    flex: 1, // Ocupa o restante do espaço disponível no contêiner.
  },
  jogadorNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  jogadorDetalhe: {
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#004d00',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});