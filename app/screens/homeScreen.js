import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableHighlight } from 'react-native';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    let navigation = this.props.navigation;
    this.state = {

    }
  }

  render() {
    return (
      <View>
        <Text>homeScreen</Text>
      </View>      
    )
  }
}
