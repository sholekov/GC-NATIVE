import { StyleSheet } from 'react-native';

const battery_width = 38;
const battery_height = 58;

export default StyleSheet.create({
  batteryContainer: {
    alignItems: 'center',
  },
  battery: {
    width: battery_width,
    height: battery_height,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  batterySmall: {
    width: battery_width * 0.7,
    height: battery_height * 0.7,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  batteryFill: {
    maxHeight: 158,
    width: '100%',
    backgroundColor: 'limegreen',
  },
  batteryTip: {
    height: 5,
    width: 12,
    backgroundColor: 'black',
    borderRadius: 2,
    marginBottom: -1,
  }, 
});