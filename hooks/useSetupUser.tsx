

import { helpers } from '@/utils/helpers'
import { setAppUser } from '@/utils/user'

import { httpUserLogin } from '@/utils/http/httpLoginRegisterRequests'

export default function setupUser() {

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log('onAuthStateChanged triggered');
    
    if (user) {
      // User is logged in by OAuth provider
      console.log('user', user);
      console.log('uid', user.uid);
      // Object.assign(store.user, {uid: user.uid})
      
      // Login user in GCServer
      httpUserLogin( user, helpers.provider )
        .then((response: AxiosResponse) => {
          const { success, user: GCUser } = response.data
          if (success && GCUser) {
            setAppUser(user, GCUser)
          }
        })
    }
  })

  useEffect(() => {

    // const user = {}
    // let email = 'sholeka+1@googlemail.com'
    // let password = '1234'
    // Object.assign(user, {email, password})

    // httpUserLogin( user, helpers.provider )
    //   .then((response: AxiosResponse) => {
    //     const { success, user: GCUser } = response.data
    //     if (success && GCUser) {
    //       setAppUser(user, GCUser)
    //     }
    //   })
  }, [])

}

import { useEffect } from "react";
import { User, onAuthStateChanged, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase'
import { GCUser } from '@/types';
import { AxiosResponse } from "axios";
