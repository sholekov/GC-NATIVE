// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 18,
  },

  // Loop | FlatList > View.item
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  item_title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  linkContainerPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkIcon: {
    marginLeft: 4,
    fontSize: 14,
    color: 'blue',
  },

});