// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import AppNavigator from './navigation/appNavigator';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import mainReducer from './store/reducers/reducer';
import appsReducer from './store/reducers/apps';

const rootReducer = combineReducers({
  main: mainReducer,
  apps: appsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [loaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
  if (!loaded) {
    return (null);
  }
  return (
    <Provider store = {store}>
      <AppNavigator />
    </Provider>
  );
}