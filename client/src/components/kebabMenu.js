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
    <div className="kebab" onClick={toggleMenu}>
      {!isOpen && (
      
      <MoreVertIcon/>
      
      )}
      {isOpen && (
        <div>
        <div className="menu">
            <div className="icon-container"> {/* New container for icons */}
                <EditIcon onClick={()=>{handleEdit(data)}} className="icon" /> {/* Add icon class */}
                <DeleteIcon onClick={()=>{handleDelete(data)}} className="icon" />
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default KebabMenu;