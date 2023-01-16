import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startDeleting,
  startSaveNote,
  startUploading,
} from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const handleSave = () => {
    dispatch(startSaveNote(active));
  };
  const handleImageUpload = () => {
    console.log("picture");
    document.querySelector("#fileSelector").click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  const handleDelete = () => {
    dispatch(startDeleting(active.id));
  };
  return (
    <div className="notes_appbar">
      <span>28 de agosto 2023</span>
      <input
        type="file"
        id="fileSelector"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
        <button onClick={handleImageUpload} className="btn">
          Subir foto
        </button>
        <button className="btn" onClick={handleSave}>
          Guardar
        </button>
      </div>
    </div>
  );
};
