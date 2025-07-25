# Thunkable X Clone

A cross-platform, offline, open-source visual programming desktop app for building mobile apps using Blockly and Electron.

## Features
- Native drag-and-drop UI designer (Electron, not web-based)
- Blockly integration for visual logic (custom blocks supported)
- Real-time mobile preview (Android/iOS simulation)
- Save/load projects locally (JSON)
- One-click APK export (Cordova integration)
- Pre-built templates/starter projects
- No authentication or i18n required
- Works offline on Windows, Mac, and Linux

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- Java JDK 8+ (for Android builds)
- Android Studio or Android SDK (for APK builds)

### Setup
1. Clone this repository.
2. Install dependencies:
   ```
   yarn install
   ```
3. Install Cordova globally (if not already):
   ```
   npm install -g cordova
   ```
4. Initialize Cordova project (first time only):
   ```
   cordova create cordovaApp com.thunkable.clone ThunkableCloneApp
   cd cordovaApp
   cordova platform add android
   cd ..
   ```

### Running the App
```
yarn start
```

### Exporting APK
- Click the **Export APK** button in the app. The APK will be built and saved to `cordovaApp/platforms/android/app/build/outputs/apk/`.

## How to Use

- **Drag & Drop UI:** Use the palette to drag components onto the canvas. Click a component to edit its properties.
- **Logic:** Use Blockly to visually program your app's logic. Assign logic to UI events using the Event Logic Mapping section.
- **Preview:** See your app update live in the Mobile Preview panel.
- **Templates:** Use the template menu to load starter projects instantly.
- **Save/Load:** Save your project as a JSON file and load it back anytime.
- **Export APK:** Click Export APK to build an Android APK (requires Cordova & Android SDK).

## Templates
- Use the **Load Starter Template** menu to quickly start with pre-built app examples.

## Customization
- Add your own Blockly blocks or UI components by editing the source code.

## Help
- For issues or questions, open an issue on GitHub or use the in-app Help button.

## License
MIT
