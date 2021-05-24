#Build dos aplicativos


First of all you should read the documentation of your app version. [here](https://facebook.github.io/react-native/docs/signed-apk-android.html)

- Android


```
cd android
./gradlew uninstallRelease // caso ja tenha uma versao no seu emulador/dispositivo
./gradlew assembleRelease
./gradlew installRelease
cd ../
react-native run-android --variant=release
```
