import { useEffect, useReducer } from "react";
import { useAuth } from "../Contexts/authcontext";
import { database } from "../firebase";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDER: "set-childfolder",
  SET_CHILD_FILES: "set-childfiles",
};

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: action.payload.folderId,
        folder: action.payload.folder,
        childFolders: [],
        childFiles: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: action.payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDER:
      return {
        ...state,
        childFolders: action.payload.childFolder,
      };
      case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: action.payload.childFiles,
      };
    default:
      return state;
  }
}

export function UseFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });
  const { userState } = useAuth();

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: { folderId: folderId, folder: folder },
    });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    database.folders
      .doc(folderId)
      .get()
      .then((doc) => {
        // console.log(database.formatDoc(doc));
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        });
      })
      .catch((e) => {
        console.error(e)
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    return database.folders
      .where("parentId", "==", folderId)
      .where("userId", "==", userState.uid)
      .orderBy("createdAt")
      .onSnapshot(snapshot => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDER,
          payload: { childFolder: snapshot.docs.map(database.formatDoc) },
        })
      });
  }, [folderId,userState]);


  useEffect(() => {
    return database.files
      .where("folderId", "==", folderId)
      .where("userId", "==", userState.uid)
      .orderBy("createdAt")
      .onSnapshot(snapshot => {
        dispatch({
          type: ACTIONS.SET_CHILD_FILES,
          payload: { childFiles: snapshot.docs.map(database.formatDoc) },
        })
      });
  }, [folderId,userState]);


  return state;
}


