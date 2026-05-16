import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <Provider store={store}>
        <ThemeProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </AppProvider>
  );
};

export default App;
