// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },

  link: {
    textAlign: 'center',
    // color: '#5dac30',
    color: 'blue',
  },

  // Forms
  input: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  button: {
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#5dac30',
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
