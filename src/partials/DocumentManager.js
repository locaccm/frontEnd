import React, { useState } from "react";
import "../css/DocumentManager.css";
import { FaUpload, FaFileAlt, FaTrash } from "react-icons/fa";

const DocumentManager = () => {
  // State to store uploaded documents
  const [documents, setDocuments] = useState([]);

  // Function to handle file uploads
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    // Create new document objects with unique IDs
    const newDocs = files.map((file) => ({ id: Date.now() + file.name, name: file.name }));
    setDocuments([...documents, ...newDocs]); // Update the state with new documents
  };

  // Function to delete a document by ID
  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div className="document-container">
      <h2>Document Management</h2>

      {/* Upload button */}
      <label className="upload-label">
        <FaUpload className="upload-icon" /> Upload a Document
        <input type="file" multiple onChange={handleFileUpload} hidden />
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
