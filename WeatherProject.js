import React, {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import Forecast from './Forecast';

const baseFontSize = 16;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30,
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
  },
  zipCode: {
    width: 50,
    height: baseFontSize,
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF',
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column',
  },
});

class WeatherProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zip: '',
      forecast: null,
    };

    this._handleTextChange = this._handleTextChange.bind(this);
  }

  _handleTextChange(event) {
    const zip = event.nativeEvent.text;
    const authKey = ''; // Add your key
    this.setState({ zip });
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${zip},fr&APPID=${authKey}&units=imperial`)
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp,
          },
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  render() {
    let content = null;
    if (this.state.forecast !== null) {
      content = (<Forecast
        main={this.state.forecast.main}
        description={this.state.forecast.description}
        temp={this.state.forecast.temp}
      />);
    }

    return (
      <View style={styles.container}>
        <Image source={require('./assets/flowers.png')}
          resizeMode="cover"
          style={styles.backdrop}
        >
        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style={styles.mainText}>
              Current weather for
            </Text>

            <View style={styles.zipContainer}>
              <TextInput
                style={[styles.zipCode, styles.mainText]}
                returnKeyType="go"
                onSubmitEditing={this._handleTextChange}
              />
            </View>
          </View>
          {content}
        </View>
        </Image>
      </View>
    );
  }
}

export default WeatherProject;
