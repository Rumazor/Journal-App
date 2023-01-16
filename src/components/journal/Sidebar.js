import React from "react";
import { JournalEntries } from "./JournalEntries";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";
import { startNewNote } from "../../actions/notes";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNeweEntry = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className="journal__sidebar">
      <div className="jornal__sidebar-navbar mt-5">
        <h3>
          <i className="far fa-moon"></i>
          <span>{name}</span>
        </h3>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="journal__new-entry" onClick={handleNeweEntry}>
        <i className="far fa-calendar-plus fa-3x"></i>
        <p className="mt-5">Nueva entrada</p>
      </div>
      <JournalEntries />
    </aside>
  );
};
