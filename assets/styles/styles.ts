// styles.js
import { Platform, StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 6 : 0,
  },
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

  bottomSheetShadow: {
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  customCallout: {
    width: 150,
    paddingBottom: 4,
  },
  calloutContainer: {
      alignItems: 'center',
      padding: 8,
      borderRadius: 12,
      backgroundColor: 'white',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 4,
  },
  calloutHeader: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '600',
    width: '100%',
    textAlign: 'center',
  },
  calloutDescription: {
      fontSize: 12,
      fontWeight: '500',
      color: '#999', 
  },

});
