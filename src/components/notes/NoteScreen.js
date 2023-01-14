import React from "react";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  return (
    <div className="notes_main-content">
      <NotesAppBar />
      <div className="nodes__content">
        <input
          type="text"
          placeholder="Un titulo asombroso"
          className="notes__title-input"
          autoComplete="off"
        />
        <textarea
          placeholder="¿Que estas pensando?"
          className="notes__textarea"
        ></textarea>
        <div className="notes__image">
          <img
            src="https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/jonatan-pie-3l3RwQdHRHg-unsplash.jpg"
            alt="imagen"
          />
        </div>
      </div>
    </div>
  );
};
