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
  page_title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },

  link: {
    fontSize: 16,
    textAlign: 'center',
    // color: '#5dac30',
    color: 'blue',
  },

  activityIndicatorStyle: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    flex: 1,
    backgroundColor: 'white',
    opacity: .8,
  },

  /**
   * Forms
   */

  input: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonContainerPressable: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#5dac30',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },



  /**
   * Other
   **/

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



  /**
   * Map
   **/

  markerImage: {
    width: 38,
    height: 38,
  },
  customCallout: {
    width: 175,
    paddingBottom: 4,
  },
  calloutContainer: {
      padding: 4,
      borderRadius: 16,
      backgroundColor: '#ffffff90',
  },
  calloutInnerContainer: {
    padding: 4,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: '#3c8f09',
    borderWidth: 1,
    shadowColor: "#00000090",
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
  calloutDevider: {
    marginBottom: 4,
      width: 50,
      height: .5,
      backgroundColor: '#3c8f09', 
  },
  calloutDescription: {
      fontSize: 12,
      fontWeight: '600',
      color: '#999', 
  },

});
