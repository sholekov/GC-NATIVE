import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  placeHeadingWrapper: {
    marginBottom: 12,
  },
  placeHeadingTitle: {
    marginBottom: 8,
    marginHorizontal: 16,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  placeHeadingRegionWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  placeHeadingRegionRounded: {
    // paddingVertical: 4,
    // paddingHorizontal: 12,
    // borderColor: '#00000010',
    // borderWidth: 0.5,
    // borderRadius: 12,
    // backgroundColor: '#00000010',
  },
  placeHeadingRegionLabel: {
    fontWeight: '700',
    fontSize: 16,
    color: '#888',
  },

  placeAccessAndDirectionsWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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