import React, { useState } from 'react';
import { FaRegSave } from "react-icons/fa";
import Axios from "axios";
import DateAdmin from './DateAdmin';

const SaveTime = ({onClick}) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'start', marginTop: 'auto' }}>
      <button
        onClick={onClick}
        className='btn'
        style={{ backgroundColor: '#127151', color: 'white' ,borderRadius:'5px'}}
      >
        <FaRegSave style={{ fontSize: '20px', marginRight: '3px'}} />
        SAVE
      </button>
    </div>
  );
};

export default SaveTime;
