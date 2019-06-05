import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    let navigation = this.props.navigation;
    this.state = {
      cities: [
            { name: "London",
              country: "UK"
            },
            { name: "Edinburgh",
              country: "UK"
            },
            { name: "New York",
              country: "US"
            },
            { name: "Texas",
              country: "US"
            },
            { name: "Washington",
              country: "US"
            },
            { name: "Paris",
              country: "France"
            },
            { name: "Doha",
              country: "Qatar"
            },
            { name: "Sydney",
              country: "Australia"
            },
            { name: "Cancun",
              country: "Mexico"
            },
            { name: "Madrid",
              country: "Spain"
            },
            { name: "Berlin",
              country: "Germany"
            },
            { name: "Brussels",
              country: "Belgium"
            },
            { name: "Copenhagen",
              country: "Denmark"
            },
            { name: "Athens",
              country: "Greece"
            },
            { name: "New Delhi",
              country: "India"
            },
            { name: "Dublin",
              country: "Ireland"
            },
            { name: "Rome",
              country: "Italy"
            },
            { name: "Tokyo",
              country: "Japan"
            },
            { name: "Wellington",
              country: "New Zealand"
            },
            { name: "Amsterdam",
              country: "Netherlands"
            },
            { name: "Oslo",
              country: "Norway"
            },
            { name: "Panama City",
              country: "Panama"
            },
            { name: "Lisbon",
              country: "Portugal"
            },
            { name: "Warsaw",
              country: "Poland"
            },
            { name: "Moscow",
              country: "Russia"
            }
      ],
      list: [],
      refresh: true
    };

    // this.fetchCityTemp('London', 'UK');
    // let list = this.getRandom(this.state.cities, 7);
    // console.log(list);

    this.fetchTemps();
  }

  fetchTemps = () => {

    let newList = [];
    // this.setState({
    //   list: newList
    // })

    let list = this.getRandom(this.state.cities, 7);
    for (city in list) {
      let name = list[city].name;
      let country = list[city].country;
      this.fetchCityTemp(name, country, newList);
    }
  }

  getRandom = (array, number) => {
    let result = new Array(number),
      length = array.length,
      taken = new Array(length);

    while(number--) {
      let x = Math.floor(Math.random() * length);
      result[number] = array[x in taken ? taken[x] : x];
      taken[x] = --length in taken ? taken[length] : length;
    }
    return result;
  }

  loadNewTemps = () => {
    this.setState({
      list: [],
      refresh: true
    })
    this.fetchTemps();
  }

  fetchCityTemp = ( city, country, newList ) => {
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid=494690a3b8181a49ce0df60f331e6c54&units=metric'//, {
      // method: 'post',
      // heders: {
      //   'Accept': 'application/json, text/plain, */*',
      //   'Content-Type': 'application/json'
      // }
       // }
    )
    .then((response) => response.json())
    // .then((response) => response.text())   //for troubleshooting errors
    .then((responseJson) => {
      let r = responseJson.main;
      let obj = responseJson;
      let city = {
        name: obj.name,
        country: country,
        temp: Math.ceil(r.temp),
        type: obj.weather[0].main,
        description: obj.weather[0].main+' - Humidity: '+r.humidity+'%',
      };

      // this.state.list.push(city);
      newList.push(city);

      // console.log('before:', this.state.list);
      this.setState({
        list: newList,
        refresh: false
      });
      // console.log('after:', this.state.list);
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
        <FlatList
          data={this.state.list}
          refreshing={this.state.refresh}
          onRefresh={this.loadNewTemps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableHighlight
              underlayColor='rgb(35, 85, 160)'
              onPress={() => alert(item.description)}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.2)','rgba(0,0,0,0)']}
                start={[0, 0.5]}
              >
                <View style={styles.row}>
                {/* eval() to convert the answer from a string to a non-string:*/}
                  <Text
                    style={[
                        eval(this.getTempColor(item.temp)),
                        styles.otherTempStyles
                    ]}
                  >
                    {this.getEmoji(item.type)} {item.temp}°C
                  </Text>
                  <Text style={styles.cityName}>{item.name}</Text>
                </View>
              </LinearGradient>
            </TouchableHighlight>
          )}
          style={styles.flatListStyles}
        />

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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  flatListStyles: {
    width: '100%'
  },
  row: {
    flex: 1,
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
})
