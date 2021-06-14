import React from "react";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function File({file}) {
    return (
        <Button
      href={file.url}
      variant="outline-success"
      className="text-truncate w-100"
      
    >
      <InsertDriveFileIcon className="mx-1" />
      {file.name}
    </Button>
    )
}
