import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', },
  innerContainer: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { fontSize: 36, marginBottom: 30, fontWeight: 'bold', textAlign: 'center' },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  captcha: {
    width: 204,
    height: 100,
  },
  captcha_icon: {
    // padding: 8,
    fontSize: 20,
    // backgroundColor: 'white',
    // borderColor: 'silver',
    // borderRadius: 12,
    // borderWidth: 1,
    // alignSelf: 'center',
  }
});