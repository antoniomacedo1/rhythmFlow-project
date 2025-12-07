# RhythmFlow - Finished Scaffold

This is a finished scaffold of the RhythmFlow Android app (Expo React Native) based on the prototype and the Phase documents you provided.

## What is included
- Expo-based React Native app scaffold
- Screens: Library, Playlists, Player, Settings
- Simple audio playback using `expo-av`
- AsyncStorage caching utilities
- Firestore placeholder integration (you must add your Firebase config)
- Instructions to run and how to add Firebase

## How to run
1. Install Expo CLI if you don't have it: `npm install -g expo-cli`
2. Install dependencies: `npm install`
3. Add your Firebase config in `services/firebase.js` (instructions inside file)
4. Start: `expo start` then run on Android emulator or device.

## Notes
- This scaffold focuses on core playback and playlist management patterns described in your Phase docs.
- Firestore requires a Firebase Web config (apiKey, authDomain, projectId, etc.) — add it to services/firebase.js.

Download the ZIP and extract to your development machine.
