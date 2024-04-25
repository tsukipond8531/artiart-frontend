"use client";
import React, { useState, useEffect, DragEvent, SetStateAction } from "react";
import { BsCloudDownload, BsCloudUpload } from "react-icons/bs";
import axios, { AxiosResponse } from 'axios';

interface PROPS {
  setImagesUrl : React.Dispatch<SetStateAction<any[]>>
}

const UploadFile = ({setImagesUrl}:PROPS) => {
  const [isDraggableArea, setIsDraggableArea] = useState<boolean>(false);
  const [selectedFile, setSelectedFiles] = useState<any[] | null>(null);
  

  const uploadPhotosToBackend = async (files: any[]): Promise<any[]> => {
    const responses: any[] = [];
    const formData = new FormData();
  
    try {
      for (const file of files) {
        formData.append('image', file);
  

      }
  
      const response: AxiosResponse<any> = await axios.post('https://artiart-server-phi.vercel.app/api/addProductImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      

      // Handle the response from the backend
      console.log('Response:', response.data.productsImageUrl);
      return response.data?.productsImageUrl;
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error:', error);
      // Optionally, you can throw the error to propagate it up to the component level
      throw error;
    }
  };


  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
    console.log('files', files );
    try {
     let response =  await uploadPhotosToBackend(files);
      setImagesUrl((prev)=>[...prev,...response])

      console.log('Photos uploaded successfully');
    } catch (error) {
      console.error('Failed to upload photos:', error);
    }
  
  

  };

  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file:any = e.target.files;
    console.log('file', file )
    setSelectedFiles(file);
    try {
     const response =await uploadPhotosToBackend(file);
     setImagesUrl((prev)=>[...prev,response])
      console.log('Photos uploaded successfully');
    } catch (error) {
      console.error('Failed to upload photos:', error);
    }
  
  };

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
      
  
        <div className="p-4 text-center">
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
