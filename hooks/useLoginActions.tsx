import { useEffect } from "react";

import { User, onAuthStateChanged, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase'

import { GCUser } from '@/types';
import { helpers } from '@/utils/helpers'
import { httpUserLogin } from '@/utils/http/httpLoginRegisterRequests'
import { setAppUser } from '@/utils/user'
import { AxiosResponse } from "axios";

export default function loginActions() {


  const login = (data) => {
    console.log('login triggered');
    return signInWithEmailAndPassword(auth, data.email, data.password)
  };



  // TODO: add trigger for forget password CTA
  // firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
  const forgetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent")
      })
      .catch((error) => {
        alert(error)
      })
  }
  
  useEffect(() => {

  }, [])

  return {
    login,
    forgetPassword,
  }
}