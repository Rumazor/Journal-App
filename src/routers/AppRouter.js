import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "./../components/journal/JournalScreen";

export const AppRouter = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/*" element={<AuthRouter />} />
          <Route exact path="/" element={<JournalScreen />} />
          <Route path="*" element={<Navigate to="/auth/register" replace />} />
        </Routes>
      </>
    </Router>
  );
};
