import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import homeScreen from './app/screens/homeScreen';
import searchScreen from './app/screens/searchScreen';

const App = createBottomTabNavigator({
  Home: { screen: homeScreen },
  Search: { screen: searchScreen }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisisble: false,
  }
});

export default App;
