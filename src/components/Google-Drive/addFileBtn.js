import React from "react";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { database, storage } from "../../firebase";
import { useAuth } from "../../Contexts/authcontext";

export default function AddFileBtn({ currentFolder }) {
  const { userState } = useAuth();

  function handleUpload(e) {
    const file = e.target.files[0];
    if (currentFolder === null || file === null) return;

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    const uploadTask = storage
      .ref(`/files/${userState.uid}/${filePath}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      () => {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where("folderId", "==", currentFolder.id)
            .where("name", "==", file.name)
            .where("userId", "==", userState.uid)
            .get()
            .then((exFile)=>{
                const existingFile= exFile.docs[0];
                if(existingFile){
                  existingFile.ref.update({url : url})
                }
                else{
                  database.files.add({
                    url: url,
                    name: file.name,
                    createdAt: database.getCurrentTimestamp(),
                    folderId: currentFolder.id,
                    userId: userState.uid,
                  });
                }
            });
          
        });
      }
    );
  }

  return (
    <label className="btn btn-outline-primary mt-2">
      <NoteAddIcon style={{fontSize:"30px"}} />
      <input type="file" onChange={handleUpload} style={{ display: "none" }} />
    </label>
  );
}
