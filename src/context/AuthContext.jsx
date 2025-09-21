"use client";
import { createContext, useContext, useEffect, useState } from "react";

import {

  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,

  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";
import {useDispatch}from 'react-redux'
import { userIn } from "@/Redux/Slices/userInfoSlice";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // redux
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
       if (currentUser) {
         dispatch(
           userIn({
             uid: currentUser.uid,
             email: currentUser.email,
             displayName: currentUser.displayName,
             photoURL: currentUser.photoURL,
           })
         );
       }
    });
    return () => unsubscribe();
  }, [useDispatch]);

  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    

    return result;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout,resetPassword,googleSignIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
