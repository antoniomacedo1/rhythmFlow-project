import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabs from './navigation/MainTabs';
import { PlaybackProvider } from './services/playbackContext';
import { ThemeProvider } from './src/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <PlaybackProvider>
        <NavigationContainer>
          <MainTabs />
        </NavigationContainer>
      </PlaybackProvider>
    </ThemeProvider>
  );
}
