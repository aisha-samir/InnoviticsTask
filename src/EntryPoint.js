
import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './Integration/store/configureStore';
import App from './App'
const { persistor, store } = configureStore();

export default function Entrypoint() {

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </PaperProvider>
    </StoreProvider>
  );
}



