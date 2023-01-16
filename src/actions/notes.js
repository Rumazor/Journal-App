import { db } from "../firebase/firebase-config";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { toast } from "react-toastify";
import { fileUpload } from "../helpers/fileUpload";

// react - journal;

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const docRef = await addDoc(
      collection(db, `${uid}/journal/notes`),
      newNote
    );

    dispatch(activeNote(docRef.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesNewActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!note.url) {
      delete note.url;
    }
    const noteToFireStore = { ...note };
    delete noteToFireStore.id;
    const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);

    await toast.promise(updateDoc(noteRef, noteToFireStore), {
      pending: "Actualizando nota",
      success: "Nota actualizada 👌",
      error: "Error al actualizar 🤯",
    });
    dispatch(refreshNote(note.id, note));
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    await toast.promise(fetch(fileUrl), {
      pending: "Subiendo imagen...",
      success: "Imagen subida 👌",
      error: "Error al subir la imagen 🤯",
    });
    dispatch(startSaveNote(activeNote));
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const deletingDoc = await deleteDoc(doc(db, `${uid}/journal/notes/${id}`));
    await toast.promise(fetch(deletingDoc), {
      pending: "Borrando nota...",
      success: "Nota borrada exitosamente ✅",
      error: "Error al borrar la nota 🤯",
    });
    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});
