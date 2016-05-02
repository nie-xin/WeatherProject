import React, {
  StyleSheet,
  Text,
  View,
  PropTypes,
} from 'react-native';

const styles = StyleSheet.create({
  bigText: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },
  mainText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

const Forecast = (props) =>
  <View>
    <Text style={styles.bigText}>
      {props.main}
    </Text>

    <Text style={styles.mainText}>
      Current conditions: {props.description}
    </Text>

    <Text style={styles.bigText}>
      {props.temp}°F
    </Text>
  </View>;

Forecast.propTypes = {
  main: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
};

export default Forecast;
