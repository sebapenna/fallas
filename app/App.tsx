import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import MainScreen from './screens/MainScreen';

export default function App() {

  return (
    <SafeAreaProvider>
      <MainScreen/>
    </SafeAreaProvider>
  );
}

