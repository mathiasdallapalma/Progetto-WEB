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
    <button className="kebab" onClick={toggleMenu} aria-label="More options button, click to open or close it" tabindex="0">
      {!isOpen && (
      
      <MoreVertIcon/>
      
      )}
      {isOpen && (
        <div>
        <div className="menu" role="menu" aria-label="options menu">
            <div className="icon-container" role="button" aria-label="More options button" > {/* New container for icons */}
                <button class="hidden-button" role="button" aria-label="edit button" 
                tabindex="0" haspopup="edit" onClick={()=>{handleEdit(data)}}><EditIcon  className="icon" /></button> {/* Add icon class */}

                <button class="hidden-button" role="button" aria-label="delete button" 
                tabindex="0" haspopup="delete" onClick={()=>{handleDelete(data)}}><DeleteIcon  className="icon" /></button> {/* Add icon class */}

          </div>
        </div>
        </div>
      )}
    </button>
  );
}

export default KebabMenu;