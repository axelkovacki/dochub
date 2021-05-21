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

 - [Repositório no Github](./back.md)


:flutter: :android: :mobile: