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
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text>homeScreen</Text>
      </View>
    )
  }
}
