import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  btns_container: {
    marginBottom: 16,
    marginHorizontal: 8,
  },
  btn_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 20,
    backgroundColor: '#fff',
    textWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      text: {
          marginLeft: 8,
          fontSize: 16,
      },
    },
  },
  roundedTop:{
      borderTopStartRadius:10,
      borderTopEndRadius:10,
  },
  roundedBottom:{
      borderBottomStartRadius:10,
      borderBottomEndRadius:10,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
  },
});