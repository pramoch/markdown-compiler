## How to build package

### iOS

#### First time set up
... TBD

#### Building package
- Open ios folder in Xcode
- Update version number and build number by going to XCode > Project Navigator > Select EasySandbox > Select General Tab > Identity > Version and Build
- Select Product > Archive
- After the build is done, Archives window will be opened.
- Select the EasySandbox package > Distribute App > Enterprise > Uncheck "Rebuild from Bitcode" and "Include manifest ..." > Manually manage signing > Select "PartnerEco EasySandbox" profile > Export

### Android

#### First time set up

https://facebook.github.io/react-native/docs/signed-apk-android


#### Building package
- Update version number (android > defaultConfig > versionName) and build number (android > defaultConfig > versionCode) in "android/app/build.gradle"
- Open android folder with Android Studio
- Select View > Tool Windows > Build Variants. Set Build Variant to be release
- Select Build > Build APK(s)
- The APK file is available at "android/app/build/outputs/apk/app-release.apk"