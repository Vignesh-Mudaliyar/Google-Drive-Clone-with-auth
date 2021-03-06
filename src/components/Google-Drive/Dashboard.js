import React from "react";
import Navbar from "./navbar";
import AddFolder from "./addFolder";
import { UseFolder } from "../../hooks/useFolder";
import Folder from "./folder";
import { Container } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import  BreadcrumbFolder from './breadcrumbFolder';
import AddFileBtn from "./addFileBtn";
import File from "./File";


export default function Dashboard() {
  const { folderId } = useParams();
  const {state = {}} = useLocation();
  const { folder, childFolders,childFiles } = UseFolder(folderId,state.folder);

  return (
    <>
      <Navbar />
      {/* <Container fluid> */}
        <div className="d-flex align-items-center ">
            <BreadcrumbFolder currentFolder={folder} />
            <span style={{display:"flex", justifyContent: "flex-end"}}>
            <AddFileBtn currentFolder = {folder} />
            <AddFolder currentFolder={folder} />
            </span>
        </div>        
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}

        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map(childFile => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      {/* </Container> */}
    </>
  );
}


