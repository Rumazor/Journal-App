import React from "react";
import { JournalEntries } from "./JournalEntries";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

export const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="journal__sidebar">
      <div className="jornal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span> Ruma</span>
        </h3>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="journal__new-entry">
        <i className="far fa-calendar-plus fa-3x"></i>
        <p className="mt-5">Nueva entrada</p>
      </div>
      <JournalEntries />
    </aside>
  );
};
