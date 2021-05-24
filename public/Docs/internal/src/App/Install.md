# Instalação das Dependencias do Aplicativo

## React Native

- Deve ser instalado o NodeJs e o Yarn.
- Deve ser instalado o React Native como dependencia global
```
sudo npm install -g react-native-cli
```

- Deve ser instalado o Watchman
```
brew install watchman
```

## Android

- Deve ser instalado o Android Studio pelo [link](https://developer.android.com/studio/index.html).

- Deve ser setado a seguinte variável no ambiente
```
ANDROID_HOME=/Users/$(whoami)/Library/Android/sdk
```

## IOS

- Deve ser instalado o XCode através de sua App store.

## Electron

- Dentro da pastar ./App rodar o seguinte comando no terminal.
```
yarn isntall
```

# Rodar o Projeto.

Dentro da Pasta ./App.

## IOS

- Rodar o seguinte comando
```
react-native run-ios (--simulator 'iPad Air')
```

## Android

- Rodar o seguinte comando
```
react-native run-android
```

## Electron

- Rodar o seguinte comando
```
yarn run start:electron
```
