"use client";
import React, { useState, useEffect, DragEvent, SetStateAction } from "react";
import { BsCloudDownload, BsCloudUpload } from "react-icons/bs";

interface PROPS {
  setImagesUrl : React.Dispatch<SetStateAction<any[]>> | any ,
  handleFileChange: Function | any,
  handleDrop: Function | any

}

const UploadFile = ({setImagesUrl,handleFileChange,handleDrop}:PROPS) => {
  const [isDraggableArea, setIsDraggableArea] = useState<boolean>(false);
  


  return (
    <div 
      className={`border-2 ${isDraggableArea ? 'border-sky-500' : 'border-gray-300'}`}
      onDrop={handleDrop}
      onDragOver={(e) => { 
        e.preventDefault(); 
        setIsDraggableArea(true); 
      }}
      onDragEnter={() => { setIsDraggableArea(true); }}
      onDragLeave={() => { setIsDraggableArea(false); }}
    >
      
       
        <div className="p-4 text-center ">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            <BsCloudUpload className="inline-block mb-2 text-4xl text-gray-500" />
            <p>Drag & Drop or Click to Upload</p>
          </label>
        </div>
    </div>
  );
};

export default UploadFile;
