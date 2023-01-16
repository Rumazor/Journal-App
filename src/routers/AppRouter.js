import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebase-config";
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "./../components/journal/JournalScreen";
import { onAuthStateChanged } from "firebase/auth";
import { login } from "../actions/auth";
import { LoadingScreen } from "../components/loading/LoadingScreen";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user?.uid) {
          dispatch(login(user.uid, user.displayName));
          dispatch(startLoadingNotes(user.uid));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setChecking(false);
      });
    }, 700);
  }, [dispatch, setChecking, setIsAuthenticated]);

  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/*"
            element={
              <PublicRoutes logged={isAuthenticated}>
                <AuthRouter />
              </PublicRoutes>
            }
          />
          <Route
            exact
            path="/"
            element={
              <PrivateRoutes logged={isAuthenticated}>
                <JournalScreen />
              </PrivateRoutes>
            }
          />
          <Route path="*" element={<Navigate to="/auth/register" replace />} />
        </Routes>
      </>
      <ToastContainer theme="dark" hideProgressBar={false} />
    </Router>
  );
};
