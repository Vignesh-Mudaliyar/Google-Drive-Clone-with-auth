import React from "react";
import FolderIcon from "@material-ui/icons/Folder";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Folder({ folder }) {
  return (
    <Button
      to={{  
        pathname : `/folder/${folder.id}`,
        state: {folder:folder}
      }}
      variant="outline-dark"
      className="text-truncate w-100"
      as={Link}
    >
      <FolderIcon className="mx-1" />
      {folder.name}
    </Button>
  );
}
