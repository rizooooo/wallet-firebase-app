import { AuthProvider, AuthContext } from './index';


import {
  useHistory,
  Redirect
} from 'react-router-dom';
import { AUTH } from '../../../../core/firebase.config';


const AuthCustomHooks = () => {

  const onLogin = async ({ email, password }) => {
    try {
      return AUTH.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const onSignUp = async ({ email, password }) => {
    try {
      return AUTH.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const onLogout = async (func) => {
    return await AUTH.signOut();
  }

  // const isAuthenticted = () => !isEmpty(state.activeUser)


  return {
    onLogin,
    onLogout,
    onSignUp
  }
};

export default AuthCustomHooks;