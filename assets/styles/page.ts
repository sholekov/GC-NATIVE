import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  btns_container: {
    marginBottom: 16,
    marginHorizontal: 8,
  },
  btn_container_warining: {
    // marginBottom: 8,
    // paddingHorizontal: 8,
    // paddingVertical: 8,
    // borderRadius: 12,
    // borderColor: '#5dac30',
    // borderWidth: 0,
    
    // backgroundColor: '#ffffff',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0,
    // elevation: 6

          // shadowColor: "#000",
          // shadowOffset: {
          //   width: 0,
          //   height: 2
          // },
          // shadowOpacity: 0.15,
          // elevation: 6
  },
  btn_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    textWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textWrapperText: {
      marginLeft: 8,
      fontSize: 16,
    }
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