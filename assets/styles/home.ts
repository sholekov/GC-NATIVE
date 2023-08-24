import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  pressableComponent: {
    ...StyleSheet.absoluteFillObject,
  },

  decoTransparentView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    opacity: 0.85,
  },
});