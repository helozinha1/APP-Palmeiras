# 📱 PalmeirasApp (Frontend - React Native / Expo)

Este é o aplicativo mobile construído com React Native e Expo que exibe uma lista de jogadores, buscando os dados de uma API local.

## ✨ Funcionalidades

* Exibe uma lista de jogadores com nome, posição, número e foto.
* Conecta-se a uma API RESTful (PalmeirasAPI) para buscar os dados dos jogadores.
* Interface simples e intuitiva para visualização.
* Exibe um logo do Palmeiras na parte superior da tela.

## 🚀 Tecnologias Utilizadas

* **React Native:** Framework para desenvolvimento de aplicativos móveis.
* **Expo:** Conjunto de ferramentas e plataforma para desenvolvimento, deployment e iteração de aplicativos React Native.
* **JavaScript:** Linguagem de programação.

## 🛠️ Configuração e Instalação

Para rodar este aplicativo, você precisará ter o Node.js e o npm instalados em sua máquina, além do aplicativo **Expo Go** no seu celular.

### Pré-requisitos

1.  **Node.js e npm:** Instale a versão mais recente.
2.  **Expo Go:** Baixe o aplicativo "Expo Go" na Google Play Store (Android) ou App Store (iOS) no seu celular.
3.  **PalmeirasAPI (Backend):** Certifique-se de que sua API (`PalmeirasAPI`) esteja configurada e rodando localmente, pois o aplicativo depende dela para obter os dados dos jogadores.

### Passos de Configuração

1.  **Exclua a pasta do seu aplicativo existente (se houver):**
    Para garantir que você tenha a estrutura de projeto correta (template `blank`), se a pasta do seu aplicativo já existe, **apague-a completamente** antes de prosseguir.

2.  **Crie o projeto Expo com o template `blank`:**
    Abra um terminal e navegue até o diretório onde você deseja criar seu projeto (por exemplo, `C:\Projetos`). Em seguida, execute o comando abaixo:

    ```bash
    npx create-expo-app PalmeirasApp --template blank
    ```
    Quando perguntar **"Which package manager...?"**, escolha **`npm`** e pressione `Enter`.

3.  **Navegue para a pasta do novo aplicativo:**
    ```bash
    cd PalmeirasApp
    ```

4.  **Substitua o conteúdo do `App.js`:**
    Abra o arquivo `App.js` localizado na **pasta do seu aplicativo** no seu editor de código e **substitua TODO o conteúdo** dele pelo código completo que você está utilizando (incluindo o logo e a lógica de fetch).

    **🚨 ATENÇÃO: Verifique o IP na linha do `fetch`!**
    Dentro do `App.js`, procure a linha que faz a requisição à API e certifique-se de que o endereço IP corresponde ao IP atual da sua máquina na rede local (ex: `http://192.168.15.28:3000/jogadores`). Se o seu IP mudar, você precisará atualizar esta linha.

    **Exemplo da linha no `App.js`:**
    ```javascript
    const response = await fetch('[http://192.168.15.28:3000/jogadores](http://192.168.15.28:3000/jogadores)'); // <--- Seu IP aqui!
    ```

5.  **SALVE o arquivo `App.js`!** (Use `Ctrl + S`).

## 🏃 Como Rodar o Aplicativo

Para que o aplicativo funcione corretamente, tanto a API quanto o aplicativo precisam estar rodando **simultaneamente** em terminais separados.

### 1. Iniciar a API (No Primeiro Terminal)

Certifique-se de que sua API está rodando. Se não estiver, abra um terminal, navegue até a pasta da **sua API** e execute:

```bash
node index.js