import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabs from './navigation/MainTabs';
import { PlaybackProvider } from './services/playbackContext';

export default function App() {
  return (
    <PlaybackProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </PlaybackProvider>
  );
}
