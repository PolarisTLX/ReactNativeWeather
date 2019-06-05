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
    // let list = this.getRandom(this.state.cities, 5);
    // console.log(list);

    this.fetchTemps();
    console.log("Words");
    console.log(this.fetchTemps());
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
  }

  fetchCityTemp = ( city, country, newList ) => {
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid=494690a3b8181a49ce0df60f331e6c54', {
      method: 'post',
      heders: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    // .then((response) => response.text())   //for troubleshooting errors
    .then((responseJson) => {
      let r = responseJson.main;
      let obj = responseJson;
      let city = {
        name: obj.name,
        country: country,
        temp: Math.ceil(r.temp),
        type: obj.weather[0].main
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

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text>City Weather App</Text>
        <FlatList
          data={this.state.list}
          refreshing={this.state.refresh}
          onRefresh={this.loadNewTemps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )
        }/>

      </View>
    )
  }
}
