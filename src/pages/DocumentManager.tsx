import React, { useState } from "react";
import "../styles/DocumentManager.css";
import { FaUpload, FaFileAlt, FaTrash } from "react-icons/fa";
import {Document} from "../interfaces/DocumentManager.interface.js"

const DocumentManager: React.FC = () => {
  // State to store uploaded documents, with proper typing
  const [documents, setDocuments] = useState<Document[]>([]);

  // Function to handle file uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files); // Convert FileList to an array

      // Filter to keep only PDF files
      const pdfFiles = files.filter((file) => file.type === "application/pdf");

      // Create new document objects with unique IDs
      const newDocs: Document[] = pdfFiles.map((file) => ({
        id: Date.now() + file.name, // Unique ID based on the current timestamp and file name
        name: file.name,
      }));
      setDocuments((prevDocs) => [...prevDocs, ...newDocs]); // Update the state with new documents
    }
  };

  // Function to delete a document by ID
  const handleDelete = (id: string) => {
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
  };

  return (
    <div className="document-container">
      <h2>Document Management</h2>

      {/* Upload button */}
      <label className="upload-label">
        <FaUpload className="upload-icon" /> Upload a Document
        <input type="file" multiple onChange={handleFileUpload} hidden accept="application/pdf" />
      </label>

      {/* List of uploaded documents */}
      <div className="document-list">
        {documents.map((doc) => (
          <div key={doc.id} className="document-item">
            <FaFileAlt className="file-icon" />
            <span className="file-name">{doc.name}</span>
            <FaTrash className="delete-icon" onClick={() => handleDelete(doc.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentManager;

