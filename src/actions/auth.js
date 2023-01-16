import { types } from "../types/types";

import {
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";

import { uiFinishLoading, uiStartLoading } from "./ui";
import { toast } from "react-toastify";

const providerGoogle = new GoogleAuthProvider();
const providerTwitter = new TwitterAuthProvider();
const providerFacebook = new FacebookAuthProvider();

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(uiStartLoading());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(uiFinishLoading());
        toast.success(`Bienvenido de vuelta ${user.displayName}`);
      })
      .catch((e) => {
        console.log({ e });
        dispatch(uiFinishLoading());
        toast.error(`Error, ${e.code} `);
      });
  };
};

export const startRegisterWithEmailPassword = (email, password, name) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        dispatch(login(user.uid, user.displayName));
        toast.success(`Te has registrado correctamente`);
      })
      .catch((e) => {
        console.log(e);
        toast.error(`Error, ${e.code} `);
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, providerGoogle).then(({ user }) => {
      dispatch(login(user.uid, user.displayName, user.email));
      toast.success(`Bienvenido ${user.displayName}`);
    });
  };
};
export const startTwitterLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, providerTwitter).then(({ user }) => {
      dispatch(login(user.uid, user.displayName, user.email));
      toast.success(`Bienvenido ${user.displayName}`);
    });
  };
};
export const startFacebookLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, providerFacebook).then(({ user }) => {
      dispatch(login(user.uid, user.displayName, user.email));
      toast.success(`Bienvenido ${user.displayName}`);
    });
  };
};

export const login = (uid, displayName, email) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    email,
  },
});
export const logout = () => {
  return async (dispatch) => {
    await signOut(auth).then(() => {
      dispatch(logoutFunction());
      toast.info(`Ha cerrado sesión`);
    });
  };
};

export const logoutFunction = () => ({
  type: types.logout,
});
