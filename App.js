import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import homeScreen from './app/screens/homeScreen';

const App = createStackNavigator({
  Home: { screen: homeScreen },
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisisble: false,
  }
});

export default App;
