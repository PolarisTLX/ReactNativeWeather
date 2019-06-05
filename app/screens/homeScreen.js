import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableHighlight } from 'react-native';

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
    let list = this.getRandom(this.state.cities, 5);
    console.log(list);
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

  fetchCityTemp = ( city, country ) => {
    // fetch('http://api/openweathermap/org/data/2.5/weather?q='+city+','+country+'&appid=apikey')
    fetch('http://api/openweathermap/org/data/2.5/weather?q='+city+','+country+'&appid=f342bc09b6f0bcd7c671338423a7e5cc&units=metric')
    .then((response) => response.json())
    .then((responseJson) => {
      let r = responseJson.main;
      let obj = responseJson;
      let city = {
        name: obj.name,
        country: country,
        temp: Math.ceil(r.temp),
        type: obj.weather[0].main
      };
    })
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text>homeScreen</Text>
      </View>
    )
  }
}
