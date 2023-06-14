import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import * as RootNavigator from '../../RootNavigation';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  console.log(token);
  if (token) {
    dispatch({ type: 'signin', payload: token });
    RootNavigator.navigate('Track List');
  } else {
    RootNavigator.navigate('登录');
  }
};

const signin =
  (dispatch) =>
  async ({ phoneNumber, verificationCode }) => {
    try {
      const response = await trackerApi.post('/verify-verification-code', {
        phoneNumber,
        verificationCode,
      });
      await AsyncStorage.setItem('token', response.data);
      dispatch({ type: 'signin', payload: response.data });
      RootNavigator.navigate('Track List');
    } catch (error) {
      console.log(error);
      dispatch({ type: 'add_error', payload: error.response.data.message });
    }
  };

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

const signout = (dispatch) => {
  return () => {
    // somehow sign user out
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: '' }
);
