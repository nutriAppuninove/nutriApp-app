# nutriApp-app

Aplicativo mobile desenvolvido com React Native utilizando o framework Expo.

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) (já incluso com o Node.js) ou [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- Aplicativo **Expo Go** instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

> O Expo CLI não precisa ser instalado globalmente — todos os comandos utilizam `npx`.

---

## Rodando o projeto localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/nutriAppuninove/nutriApp-app.git
```

### 2. Entrar na pasta do projeto

```bash
cd nutriApp-app
```

### 3. Instalar as dependências

Usando npm:

```bash
npm install
```

Ou usando Yarn:

```bash
yarn
```

### 4. Iniciar o projeto

```bash
npx expo start
```

Um QR Code será exibido no terminal.

---

## Abrindo no celular com Expo Go

1. Abra o aplicativo **Expo Go** no seu celular.
2. Certifique-se de que o celular e o computador estão na **mesma rede Wi-Fi**.
3. Escaneie o QR Code exibido no terminal.
4. O aplicativo será carregado automaticamente no seu dispositivo.

---

## Rodando no emulador

### Android (Android Studio)

1. Instale o [Android Studio](https://developer.android.com/studio) e configure um emulador Android (AVD).
2. Inicie o emulador pelo Android Studio.
3. Com o projeto já rodando (`npx expo start`), pressione **`a`** no terminal para abrir no emulador Android.

Ou use o comando direto:

```bash
npm run android
```

### iOS (somente macOS)

1. Instale o [Xcode](https://developer.apple.com/xcode/) pela App Store.
2. Com o projeto já rodando (`npx expo start`), pressione **`i`** no terminal para abrir no simulador iOS.

Ou use o comando direto:

```bash
npm run ios
```

---

## Erros comuns e como resolver

### Metro bundler travado ou com comportamento inesperado

Limpe o cache do Metro bundler:

```bash
npx expo start --clear
```

### Dependências desatualizadas ou corrompidas

Remova a pasta `node_modules` e reinstale as dependências:

```bash
rm -rf node_modules
npm install
```

### Porta em uso (8081)

Se a porta padrão estiver ocupada, inicie o servidor em outra porta:

```bash
npx expo start --port 8082
```

### Expo Go não consegue conectar ao servidor

- Verifique se o celular e o computador estão na mesma rede Wi-Fi.
- Se o problema persistir, tente usar o modo de tunelamento:

```bash
npx expo start --tunnel
```

> O modo `--tunnel` requer o pacote `@expo/ngrok`. Caso solicitado, instale-o com `npm install -g @expo/ngrok`.
