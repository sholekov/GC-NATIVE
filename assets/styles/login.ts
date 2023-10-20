// styles.js
import { StyleSheet } from 'react-native';

const flagSize = {
  width: 120,
  height: 80
};
export default StyleSheet.create({

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