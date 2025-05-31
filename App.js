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
const JogadorItem = ({ jogador }) => (
  <View style={styles.jogadorContainer}>
    {jogador.foto ? (
      <Image source={{ uri: jogador.foto }} style={styles.jogadorFoto} />
    ) : (
      <View style={styles.jogadorFotoPlaceholder}>
        <Text style={styles.jogadorFotoPlaceholderText}>?</Text>
      </View>
    )}
    <View style={styles.jogadorInfo}>
      <Text style={styles.jogadorNome}>{jogador.nome}</Text>
      <Text style={styles.jogadorDetalhe}>Posição: {jogador.posicao}</Text>
      <Text style={styles.jogadorDetalhe}>Número: {jogador.numero}</Text>
    </View>
  </View>
);

// Componente principal do aplicativo.
export default function App() {
  const [jogadores, setJogadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJogadores = async () => {
      try {
        // --- PONTO CRÍTICO: SEU IP DEVE ESTAR AQUI! ---
        // Certifique-se de que este é o IP atual da sua máquina na rede local.
        const response = await fetch('http://192.168.15.28:3000/jogadores'); // <-- VERIFIQUE ESTA LINHA!

        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        const data = await response.json();
        setJogadores(data);
      } catch (err) {
        console.error('Erro ao buscar jogadores:', err);
        setError(
          'Não foi possível carregar os jogadores. Verifique a conexão com a API e o IP.'
        );
        Alert.alert(
          'Erro na Conexão',
          'Não foi possível carregar os jogadores. Por favor, verifique se a API está rodando e se o IP no App.js está correto e acessível.'
        );
      } finally {
        // No finally, apenas setamos que o carregamento dos dados terminou,
        // mas o estado 'loading' só será false após o tempo mínimo.
      }
    };

    // Adiciona um pequeno atraso mínimo para a tela de carregamento ser visível
    const MIN_LOADING_TIME = 1500; // 1.5 segundos
    const startTime = Date.now();

    fetchJogadores().then(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_LOADING_TIME) {
        setTimeout(() => setLoading(false), MIN_LOADING_TIME - elapsedTime);
      } else {
        setLoading(false);
      }
    });

  }, []);

  // Lógica de renderização da tela de carregamento ou do conteúdo principal
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingScreenContainer}>
        <Image
          source={{ uri: 'https://www.palmeiras.com.br/wp-content/themes/foursys-palmeiras/assets/images/logo-palmeiras.png' }}
          style={styles.loadingLogo}
        />
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Acesso Permitido</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de Jogadores</Text>
      </View>
      <FlatList
        data={jogadores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JogadorItem jogador={item} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#006400',
  },
  header: {
    backgroundColor: '#004d00',
    paddingTop: 15,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#003300',
  },
  listContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  jogadorContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  jogadorFoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    backgroundColor: '#ccc',
  },
  jogadorFotoPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    backgroundColor: '#a0a0a0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jogadorFotoPlaceholderText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  jogadorInfo: {
    flex: 1,
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
  // ESTILO PARA O TÍTULO "Lista de Jogadores" - MAIS BONITO
  headerTitle: {
    fontSize: 32, // Aumentado para 32 (era 28)
    fontWeight: 'bold',
    color: '#fff',
    // Adicionando sombra ao texto
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Cor da sombra (preto com 75% de opacidade)
    textShadowOffset: { width: -1, height: 1 }, // Deslocamento da sombra
    textShadowRadius: 10, // Raio do desfoque da sombra
    letterSpacing: 2, // Espaçamento entre as letras
  },
  // Fim do estilo para o título
  loadingScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004d00',
  },
  loadingLogo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
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