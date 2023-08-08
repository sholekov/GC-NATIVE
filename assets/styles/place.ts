import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  placeHeading: {
    marginTop: 4,
    marginBottom: 8,
    marginHorizontal: 42,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  placeRegionWrapper: {
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  placeRegionRounded: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderColor: '#00000010',
    borderWidth: 0.5,
    borderRadius: 12,
    backgroundColor: '#00000010',
    // shadowColor: '#00000000',
    // shadowOffset: {
    //   width: 4,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 8,
    // elevation: 4,
  },
  placeRegionLabel: {
    fontWeight: '600',
    fontSize: 14,
    color: '#00000080',
  },

  placeAccessAndDirectionsWrapper: {
    width: '90%',
    flexDirection: 'row',
    marginHorizontal: 12,
    marginBottom: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#00000025',
    borderWidth: 0.5,
    borderRadius: 120,
    backgroundColor: '#00000005',
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