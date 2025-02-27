import React, { useState } from "react";
import "../css/DocumentManager.css";
import { FaUpload, FaFileAlt, FaTrash } from "react-icons/fa";

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newDocs = files.map((file) => ({ id: Date.now() + file.name, name: file.name }));
    setDocuments([...documents, ...newDocs]);
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div className="document-container">
      <h2>Gestion des Documents</h2>
      <label className="upload-label">
        <FaUpload className="upload-icon" /> Importer un document
        <input type="file" multiple onChange={handleFileUpload} hidden />
      </label>
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