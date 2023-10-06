import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  bgImage: {
    ...StyleSheet.absoluteFillObject, flex: 1, zIndex: 0, resizeMode: 'cover',
  },
  wrapper: {
    backgroundColor: '#ffffffD9',
  },
  top: {
    flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12, padding: 12, width: '100%',
  },
  topWrapperIconWrapper: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 6, left: 12, width: 32, height: 32, backgroundColor: '#00000000', borderRadius: 99,
  },
  topWrapperIcon: {
    fontSize: 18,
    color: '#555',
  },
  topLabel: {
    fontSize: 16, fontWeight: '600',
  },
  stationWrapper: {
    flex: 1,
    marginHorizontal: 32,
    marginBottom: 16,
    paddingTop: 22,
    backgroundColor: '#fff',
    borderRadius: 48,

    shadowColor: "#00000050",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 16,
  },
  stationWrapperInner: {
    flex: 1, flexDirection: 'column', justifyContent: 'space-between',
    marginHorizontal: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: .25,
    elevation: 8,
    borderRadius: 42,
  },
  stationBgImageWrapper: {
    flex: 1, justifyContent: 'flex-end',
  },
  stationBgImage: {
    borderRadius: 42, resizeMode: 'cover',
  },
  stationContentWrapper: {
    flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignSelf: 'center',
    width: '100%',
    paddingVertical: 32,
    borderBottomLeftRadius: 42, borderBottomRightRadius: 42, backgroundColor: '#ffffffD9',
  },
  stationContentOutletsWrapper: {
    position: 'relative', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  stationContentOutletsWrapperImageWrapper: {
    padding: 2,
    borderRadius: 99,
  },
  stationContentOutletsImage: {
    width: 36,
    height: 36,
  },
  stationContentOutletsLabel: {
    marginLeft: 8, fontSize: 20, fontWeight: '500', 
  },

  stationContentPriceWrapper: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 32,
  },
  stationContentPriceLabel: {
    fontSize: 16, fontWeight: '400',
  },
  stationContentPriceValue: {
    fontSize: 16, fontWeight: '600', marginHorizontal: 4,
  },
  stationContentCTAWrapper: {
    alignSelf: 'center',
    marginBottom: 0,
    backgroundColor: '#fff',
    borderColor: '#ffffff',
    borderWidth: 0, borderRadius: 99,
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: .25,
    elevation: 8,
  },
  stationContentCTAWrapperInner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: 12, paddingHorizontal: 32,
    backgroundColor: '#5dac30',
    borderRadius: 32,
  },
  stationContentCTAWrapperInnerIcon: {
    marginRight: 8,
    fontSize: 18,
    color: 'white',
  },
  stationContentCTAWrapperInnerText: {
    marginRight: 4,
    fontSize: 16, fontWeight: '600', color: 'white',
  },

});