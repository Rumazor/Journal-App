import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotesAppBar } from "./NotesAppBar";
import { useForm } from "../../hooks/UseForm";
import { activeNote } from "../../actions/notes";

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const [values, handleInputChange, reset] = useForm(note);
  const { body, title } = values;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [reset, note]);

  useEffect(() => {
    dispatch(
      activeNote(values.id, {
        ...values,
      })
    );
  }, [values, dispatch]);

  return (
    <div className="notes_main-content">
      <NotesAppBar />
      <div className="nodes__content">
        <input
          type="text"
          name="title"
          placeholder="Un titulo asombroso"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="¿Que estas pensando?"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>
        {note.url && (
          <div className="notes__image">
            <img src={`${note.url}`} alt={`title`} />
          </div>
        )}
      </div>
    </div>
  );
};
