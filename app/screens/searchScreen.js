import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableHighlight, TextInput } from 'react-native';
import { LinearGradient } from 'expo';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    let navigation = this.props.navigation;
    this.state = {
      searchInput: '',
      searchResult: 0,
      error: 'Search for a city...',
      item: {}
    };

  }

  searchCity = () => {
    this.fetchCityTemp(this.state.searchInput)
  }

  fetchCityTemp = ( city ) => {

    this.setState({
      item: {},
      searchResult: 0,
      error: 'Search for a city...'
    });

    fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=494690a3b8181a49ce0df60f331e6c54&units=metric')
    .then((response) => response.json())
    .then((responseJson) => {
      let r = responseJson.main;
      let obj = responseJson;

      if (responseJson.cod !== 200 ){
        this.setState({
          searchResult: 0,
          error: 'City not found!'
        });
      } else {

        let city = {
          name: obj.name,
          temp: Math.ceil(r.temp),
          type: obj.weather[0].main,
          description: obj.weather[0].main+' - Humidity: '+r.humidity+'%',
        };

        this.setState({
          item: city,
          searchResult: 1
        });
      }

    })
    .catch((error) => {
      console.log('Error message:', error.message);
      // throw error;
    })
  }

  getTempColor = (temp) => {
    switch(true) {
      case (temp < 10):
        // text = "cold";
        return "styles.cold";
        break;
      case (temp < 22):
        return "styles.comfortable";
        break;
      case (temp >= 22):
        return "styles.hot";
        break;
      case (temp > 30):
        return "styles.veryHot";
        break;
      default:
        return "styles.comfortable";
    }
  }

  getEmoji = (type) => {
    if (type == 'Clear') {
      return '☀️';
    }
    if (type == 'Haze') {
      return '🌤';
    }
    if (type == 'Clouds') {
      return '☁️';
    }
    if (type == 'Sun Shower') {
      return '🌦️';
    }
    if (type == 'Rain') {
      return '🌧️';
    }
    if (type == 'Thunderstorm') {
      return '⛈️';
    }
    if (type == 'Snow') {
      return '🌨️';
    }
  }

  render() {
    return (
      <View style={styles.container}>
      {/*<StatusBar barStyle="light-content" />*/}
        <Text style={styles.header}>City Weather App</Text>

        <View style={{alignItems: 'center', width: '90%'}}>
          <Text style={{textAlign: 'center', lineHeight: 20, padding: 5, fontSize: 16}}>Search for city</Text>
          <TextInput
            onChangeText={ (text) => this.setState({searchInput: text})}
            value={this.state.searchInput}
            style={{ width: '80%', padding: 15, margin:5, backgroundColor: 'black', color: 'white'}}
          />
          <TouchableHighlight
            style={styles.searchButton}
            onPress={ () => this.searchCity() }
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableHighlight>
        </View>

        { this.state.searchResult == 1 ? (

          <TouchableHighlight
            underlayColor='rgb(35, 85, 160)'
            onPress={() => alert(this.state.item.description)}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.2)','rgba(0,0,0,0)']}
              start={[0, 0.5]}
            >
              <View style={styles.row}>
              {/* eval() to convert the answer from a string to a non-string:*/}
                <Text
                  style={[
                      eval(this.getTempColor(this.state.item.temp)),
                      styles.otherTempStyles
                  ]}
                >
                  {this.getEmoji(this.state.item.type)} {this.state.item.temp}°C
                </Text>
                <Text style={styles.cityName}>{this.state.item.name}</Text>
              </View>
            </LinearGradient>
          </TouchableHighlight>

        ) : (
          <View style={styles.errorStyle}>
            <Text>{this.state.error}</Text>
          </View>
        )}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  container: {
    backgroundColor: 'lightblue',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1
  },
  flatListStyles: {
    width: '100%'
  },
  row: {
    flex: 1,
    width: '88%',
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  cityName: {
    fontSize: 18,
    lineHeight: 40
  },
  otherTempStyles: {
    fontSize: 24,
    lineHeight: 40,
    width: 130,
    marginRight: 15,
    fontWeight: 'bold',
    flexDirection: 'row'
  },
  cold: { color: 'blue' },
  comfortable: { color: 'green' },
  hot: { color: 'orange' },
  veryHot: { color: 'red' },
  errorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    backgroundColor: 'grey',
    padding: 20,
    borderRadius: 8
  },
  searchButtonText: {
    fontSize: 14,
    color: 'white'
  }
})
