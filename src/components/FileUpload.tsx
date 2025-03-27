/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useData } from '../context/DataContext';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUsers } from '../context/UserContext';
import { isValidJSONFormat, removeDuplicatesByEmail } from '../utils/jsonHelper';


export function FileUpload() {
  const { addUsers } = useUsers();
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    fileArray.forEach(file => {
      if (file.type !== 'application/json') {
        toast.error(`File ${file.name} is not a JSON file`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          
          if (!isValidJSONFormat(jsonData)) {
            toast.error(`${file.name} has invalid data format`);
            return;
          }

          const result = removeDuplicatesByEmail(jsonData);
          
          if (result.duplicatesRemoved > 0) {
            toast.error(
              `Found ${result.duplicatesRemoved} duplicate emails in ${file.name}.\n` +
              `Unique records: ${result.uniqueData.length}`
            );
          }

          addUsers(result.uniqueData);
          toast.success(`Successfully uploaded ${result.uniqueData.length} unique records from ${file.name}`);
        } catch (error) {
          toast.error(`Error reading ${file.name}: Invalid JSON format`);
        }
      };
      reader.readAsText(file);
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    processFiles(files);
    event.target.value = ''; // Reset input
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    processFiles(files);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full max-w-2xl p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
      >
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          multiple
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          <div className="flex flex-col items-center gap-2">
            <svg 
              className="w-8 h-8 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div className="text-gray-600">
              <span className="font-medium">Click to upload</span> or drag and drop
            </div>
            <p className="text-sm text-gray-500">
              Multiple JSON files are supported
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}