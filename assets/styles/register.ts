import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingTop: 32,
    paddingBottom: 70
  },
  activityIndicator: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  page_header: {
    fontSize: 36,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  // input styles from styles.ts loaded here / Done

  captchaContainer: {
    marginBottom: 16,
  },
  captchaCta: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  captchaImg: {
    marginRight: 16,
    padding: 8,
    width: 204,
    height: 100,
  },
  captchaIcon: {
    fontSize: 20,
  },

});