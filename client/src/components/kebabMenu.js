import React, { useState } from 'react';
import "./kebabMenu.css"

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function KebabMenu({ data, handleEdit, handleDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log("toggle Kebab Menu")
    setIsOpen(!isOpen);
  };

  return (
    <div className="kebab" onClick={toggleMenu} aria-label="More options button" tabindex="0">
      {!isOpen && (
      
      <MoreVertIcon/>
      
      )}
      {isOpen && (
        <div>
        <div className="menu" role="menu" aria-label="options menu">
            <div className="icon-container" role="button" aria-label="More options button" tabindex="0"> {/* New container for icons */}
                <EditIcon onClick={()=>{handleEdit(data)}} className="icon" role="button" aria-label="edit button" 
                tabindex="0" haspopup="edit"/> {/* Add icon class */}
                <DeleteIcon onClick={()=>{handleDelete(data)}} className="icon" role="button" aria-label="delete button" 
                tabindex="0" haspopup="delete"/>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default KebabMenu;