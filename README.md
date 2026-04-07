# nutriApp-app

Aplicativo mobile desenvolvido com **React Native** e **Expo**.

---

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas na sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) (já vem junto com o Node.js) ou [Yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) instalado no seu celular (Android ou iOS)

> Não é necessário instalar a Expo CLI globalmente. Os comandos abaixo utilizam `npx`.

---

## Como rodar o projeto localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/nutriAppuninove/nutriApp-app.git
```

### 2. Entrar na pasta do projeto

```bash
cd nutriApp-app
```

### 3. Instalar as dependências

Com npm:

```bash
npm install
```

Ou com Yarn:

```bash
yarn
```

### 4. Iniciar o projeto

```bash
npx expo start
```

---

## Como abrir no celular

### Usando o Expo Go

1. Instale o aplicativo **Expo Go** no seu celular:
   - [Android – Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS – App Store](https://apps.apple.com/app/expo-go/id982107779)
2. Certifique-se de que o celular e o computador estão **na mesma rede Wi-Fi**.
3. Após rodar `npx expo start`, um QR Code será exibido no terminal.
4. **Android:** abra o Expo Go e escaneie o QR Code.
5. **iOS:** use a câmera nativa do iPhone para escanear o QR Code.

---

## Como rodar no emulador

### Android (Android Studio)

1. Instale o [Android Studio](https://developer.android.com/studio) e configure um dispositivo virtual (AVD).
2. Com o emulador aberto, execute:

```bash
npx expo start --android
```

Ou pressione `a` no terminal após rodar `npx expo start`.

### iOS (Somente macOS)

1. Instale o [Xcode](https://developer.apple.com/xcode/) e os simuladores de iOS.
2. Execute:

```bash
npx expo start --ios
```

Ou pressione `i` no terminal após rodar `npx expo start`.

---

## Erros comuns e como resolver

### Projeto não carrega / tela em branco

Limpe o cache do Expo e reinicie:

```bash
npx expo start -c
```

### Módulo não encontrado

Reinstale as dependências:

```bash
rm -rf node_modules
npm install
```

### Erro de conexão entre celular e computador

- Verifique se ambos estão na **mesma rede Wi-Fi**.
- Tente mudar o modo de conexão no terminal do Expo pressionando `w` (tunnel) para usar um túnel de rede.

### Porta já em uso

Caso a porta padrão (8081) esteja ocupada, o Expo sugerirá automaticamente outra porta. Aceite ou encerre o processo que está usando a porta:

```bash
npx expo start --port 8082
```
