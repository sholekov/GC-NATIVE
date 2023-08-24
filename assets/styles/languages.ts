import { StyleSheet } from 'react-native';

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

});