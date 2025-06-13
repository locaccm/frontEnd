import React, { useState, useCallback, useEffect } from "react";
import AccommodationTable from "../../components/wealthManagement/AccommodationTable.js";
import CreateAccommodationModal from "../../components/wealthManagement/CreateAccommodationModal.js";
import DeleteConfirmationModal from "../../components/wealthManagement/DeleteConfirmationModal.js";
import UpdateAccommodationModal from "../../components/wealthManagement/UpdateAccommodationModal.js";
import DocumentManagement from "../documentManagement/documentManagement.js";
import MyDocuments from "../documentManagement/MyDocuments.js";

const WealthManagementPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [accommodationToEdit, setAccommodationToEdit] = useState<{
    id: number;
    data: any;
  } | null>(null);
  const [accommodationToDelete, setAccommodationToDelete] = useState<
    number | null
  >(null);

  const [refreshKey, setRefreshKey] = useState(0);
  const handleCreateSuccess = useCallback(
    () => setRefreshKey((k) => k + 1),
    [],
  );
  const handleUpdateSuccess = useCallback(
    () => setRefreshKey((k) => k + 1),
    [],
  );
  const handleDeleteSuccess = useCallback(
    () => setRefreshKey((k) => k + 1),
    [],
  );

  const [showDocManager, setShowDocManager] = useState(false);
  const [leaseIdForDoc, setLeaseIdForDoc] = useState<number | null>(null);

  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setJwt(token);
  }, []);

  const handleGenerateClick = (leaseId: number) => {
    setLeaseIdForDoc(leaseId);
    setShowDocManager(true);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestion des logements</h1>

      <button onClick={() => setShowCreateModal(true)}>
        Ajouter un logement
      </button>

      <AccommodationTable
        key={refreshKey}
        onCreate={() => setShowCreateModal(true)}
        onEdit={(acc) => {
          setAccommodationToEdit({ id: acc.ACCN_ID, data: acc });
          setShowUpdateModal(true);
        }}
        onDelete={(id) => setAccommodationToDelete(id)}
        onGenerate={handleGenerateClick}
      />

      {showCreateModal && (
        <CreateAccommodationModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
      {showUpdateModal && accommodationToEdit && (
        <UpdateAccommodationModal
          accommodationId={accommodationToEdit.id}
          initialData={accommodationToEdit.data}
          onClose={() => {
            setShowUpdateModal(false);
            setAccommodationToEdit(null);
          }}
          onSuccess={handleUpdateSuccess}
        />
      )}
      {accommodationToDelete !== null && (
        <DeleteConfirmationModal
          isOpen
          accommodationId={accommodationToDelete}
          onClose={() => setAccommodationToDelete(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {showDocManager && leaseIdForDoc !== null && jwt && (
        <DocumentManagement
          leaseId={leaseIdForDoc}
          jwt={jwt}
          onClose={() => setShowDocManager(false)}
        />
      )}

      {"Display Documents"}
      {jwt && <MyDocuments jwt={jwt} />}
    </div>
  );
};

export default WealthManagementPage;
