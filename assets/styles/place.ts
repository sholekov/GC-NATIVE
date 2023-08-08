import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  placeHeading: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeRegionWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  placeRegionRounded: {
    marginVertical: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderColor: '#00000010',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#00000010',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placeRegionLabel: {
    fontSize: 16,
  },
  placeDescription: {
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeImage: {
    width: '100%',
    height: 200,
  },
  
});