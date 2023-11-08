import { User } from 'firebase/auth';
import { proxy } from 'valtio'

import { GCUser } from '@/types';

export const setAppUser = (FirebaseUser: User, GCUser: GCUser) => {
  console.log('setAppUser', FirebaseUser, GCUser);
  // merge the two user instances
  user.data = { ...FirebaseUser, ...GCUser };
}

export const user = proxy<{ data: User | null, }>({
  data: null,
})
