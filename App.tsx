import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import * as firebase from "firebase";
import apiKeys from "./config/key";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

 if (!firebase.apps.length) {
   console.log("Connected with Firebase");
   firebase.initializeApp(apiKeys.firebaseConfig);
 }


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
