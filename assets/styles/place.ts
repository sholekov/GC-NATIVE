import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  placeWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  placeHeadingOuterWrapper: {
    position: 'relative',
    paddingVertical: 12,
    width: '100%',
  },

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
  placeHeadingRegionLabel: {
    fontWeight: '700',
    fontSize: 16,
    color: '#888',
  },

  // placeFavourite
  placeFavouritesWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    top: -12,
    right: 0,
    padding: 16,
  },
  placeFavouritesIcon: {
    fontSize: 26,
  },
  placeFavouritesIconActive: {
    color: 'rgb(255, 212, 59)',
  },
  placeFavouritesIconInactive: {
    opacity: .25,
  },


  // placeAccessAndDirections
  placeAccessAndDirectionsOuterWrapper: {
    alignSelf: 'center',
    marginHorizontal: 12,
    marginBottom: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '90%',
    borderColor: '#00000025',
    borderWidth: 0.5,
    borderRadius: 120,
    backgroundColor: '#00000005',
  },
  placeAccessAndDirectionsWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  placeAccessAndDirectionsLabel: {
    flexDirection: 'row',
  },
  placeAccessAndDirectionsCTA: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  placeAccessAndDirectionsCTALabel: {
    marginRight: 4,
    fontWeight: '600',
  },
  placeAccessAndDirectionsCTAIcon: {
    fontSize: 18,
  },

  placeListWrapper: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#00000010',
  },
  placeContentContainerStyle: {
    marginVertical: 0,
    paddingBottom: 170,
  },
  placeItemContainer: {
    marginBottom: 8,
    borderBottomWidth: 0,
    borderColor: '#00000010',
    backgroundColor: '#00000005',
  },
  placeItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  placeItemLeft: {
    marginRight: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  placeItemLeftLabel: {
    marginBottom: 4,
    fontSize: 18,
    fontWeight: '600',
  },
  placeItemLeftPrice: {
  },

  placeItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeItemRightPower: {
    marginRight: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeItemRightPowerValue: {
    fontSize: 24,
    fontWeight: '500',
  },
  placeItemRightPowerLabel: {
    fontSize: 12,
    fontWeight: '800',
  },
  placeItemRightImageSocketWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18, 
    // backgroundColor: '',
    borderColor: '#00000010',
    borderWidth: 1,
    borderRadius: 150,
  },
  placeItemRightImageSocketImage: {
    width: 50,
    height: 50,
  },
  placeItemRightIconWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeItemRightIconIcon: {
    fontSize: 20,
  },

});