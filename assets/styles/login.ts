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
    justifyContent: 'center',
    alignItems: 'center',
    icon: {
      fontSize: 20,
      color: '#333',
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
    fontSize: 20,
    color: '#333',
  },
  checkboxLabel: {
    fontSize: 16,
  },

  ctaSecondaryContainer: { 
    width: '100%',
    padding: 4,
  },

  // Lost password styles
  lostPasswordButton: {
    alignItems: 'center',
    padding: 4,
  },
  lostPasswordText: {
    textDecorationLine: 'underline',
  },

});