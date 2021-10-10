import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TobTabNavigation from './Navigation/TopTabNavigation'
import Home from './Screens/Home'
// import AllMovies from './Screens/AllMovies'
// import AddMoive from './Screens/AddMoive'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'
import configureStore from './Integration/store/configureStore';
const { persistor, store } = configureStore();



const Stack = createStackNavigator();

function App() {

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer >

          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Home"
              component={Home}
            />

            {/* <Stack.Screen
              name="AllMovies"
              component={AllMovies}
            /> */}


            <Stack.Screen
              name="TobTabNavigation"
              component={TobTabNavigation}
            />


            {/* <Stack.Screen
              name="AddMoive"
              component={AddMoive}
            /> */}


          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;