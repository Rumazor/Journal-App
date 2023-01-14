import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";

export const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route exact index path="/" element={<JournalScreen />} />
      </Routes>
    </>
  );
};
