# Download Android Studio
https://developer.android.com/studio

## Create a Shortcut for Android Studio [Optional]:

Move folder and create a initializer
```
sudo mv android-studio /usr/bin
cd ~/Desktop (OR cd ~/Área\ de\ trabalho/)
vim studio.desktop

[Desktop Entry]
Version=1.0
Type=Application
Terminal=false
Icon=/usr/bin/android-studio/bin/studio.png
Exec=sh /usr/bin/android-studio/bin/studio.sh
Name=Android Studio

sudo chmod a+x studio.desktop
```
Obs: A restart is needed to display icon in the OS menu

# Download flutter
https://flutter.dev/docs/get-started/install/linux

## Configure flutter variables

```
flutter config --android-studio-dir /usr/bin/android-studio/
flutter doctor --android-licenses
flutter doctor -v
```

## Export Flutter path

```
sudo mv flutter /usr/bin
vim ~/.bashrc
export PATH=$PATH:/usr/bin/flutter/bin/flutter/bin
source ~/.bashrc
```

## Configure Flutter and Dart plugins in Android Studio:

```
 - Start Android Studio.
 - Open plugin preferences (File > Settings > Plugins OR Preferences Plugins on macOS)
 - Select Browse repositories, select the Flutter plugin and click Install.
 - Click Yes when prompted to install the Dart plugin.
 - Click Restart when prompted.
 * Reference: https://flutter.dev/docs/get-started/editor
```
## Set Flutter Sdk on Android Studio:
```
 - Open languages & frameworks preferences (File > Settings > Languages & Frameworks OR Preferences > Languages & Frameworks on macOS)
 - Select Flutter
 - Set path Sdk to /usr/bin/flutter
 - Apply and download dependencies if needs
```
