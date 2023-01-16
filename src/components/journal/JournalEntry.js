import React from "react";
import moment from "moment/";
import "moment/locale/es";
import { capitalizeFirstLetter } from "../../helpers/mayus";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";
moment.locale("Es");

export const JournalEntry = ({ id, date, title, body, url }) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();
  const handleEntryClick = () => {
    dispatch(
      activeNote(id, {
        date,
        title,
        body,
        url,
      })
    );
  };

  return (
    <div
      className="journal__entry pointer  animate__animated animate__fadeIn animate_faster "
      onClick={handleEntryClick}
    >
      {url && (
        <div
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${url})`,
          }}
          className="journal__entry-picture"
        ></div>
      )}
      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span>{capitalizeFirstLetter(noteDate.format("dddd"))}</span>
        <h4>{noteDate.format("Do")}</h4>
      </div>
    </div>
  );
};
