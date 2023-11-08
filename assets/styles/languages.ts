import { StyleSheet } from 'react-native';

const flagSize = {
  width: 120,
  height: 80
};

export default StyleSheet.create({
  containerHeader: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerHeaderIcon: {
    marginRight: 8,
    fontSize: 24,
    color: '#333',
  },
  page_title: {
    fontSize: 20,
    fontWeight: '600',
  },

  // item
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  itemIcon: {
    marginRight: 8,
    fontSize: 18,
    color: '#555',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  itemColorChecked: {
    color: '#333',
  },

  // Login page
  flagsWrapper: {
    justifyContent: 'center', alignItems: 'flex-end',
    marginBottom: 16,
    width: '100%',
    // height: flagSize.height,
    // backgroundColor: 'red',
  },
  flagWrapper: {
    marginHorizontal: 4,
    justifyContent: 'center', alignItems: 'center',
    width: flagSize.width*0.8,
  },
  flag: {
    marginBottom: 8,
    width: flagSize.width*0.4,
    height: flagSize.height*0.4,
    borderColor: '#99999950',
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  langChecked: {
    position: 'absolute',
    top: -10, right: -10, bottom: -10, left: -10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  langLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
});