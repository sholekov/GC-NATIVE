// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputPIN: {
    flex: 8,
    marginBottom: 0,
  },
  showPasswordButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    // borderWidth: 1,
    // borderColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    icon: {
      fontSize: 20,
    },
  },

  // Checkbox styles
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },

  // Lost password styles
  lostPasswordButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  lostPasswordText: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
  },

});