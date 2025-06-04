import React from "react";
import { useState, useCallback } from "react";
import AccommodationTable from "../../components/wealthManagement/AccommodationTable.js";
import CreateAccommodationModal from "../../components/wealthManagement/CreateAccommodationModal.js";
import UpdateAccommodationModal from "../../components/wealthManagement/UpdateAccommodationModal.js";
import DeleteConfirmationModal from "../../components/wealthManagement/DeleteConfirmationModal.js";
import { AccommodationInput, Accommodation } from "../../types/wealthManagement/wealthManagement.js";

const WealthManagementPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [accommodationToEdit, setAccommodationToEdit] = useState<{
    id: number;
    data: AccommodationInput;
  } | null>(null);
  const [accommodationToDelete, setAccommodationToDelete] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleCreateSuccess = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleEdit = (acc: Accommodation) => {
    setAccommodationToEdit({
      id: acc.ACCN_ID,
      data: {
        ACCC_NAME: acc.ACCC_NAME,
        ACCC_TYPE: acc.ACCC_TYPE,
        ACCC_ADDRESS: acc.ACCC_ADDRESS,
        ACCC_DESC: acc.ACCC_DESC,
        ACCB_AVAILABLE: acc.ACCB_AVAILABLE,
      },
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSuccess = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);
  
  const handleDeleteSuccess = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestion des logements</h1>
      <AccommodationTable
        key={refreshKey}
        onCreate={handleCreateClick}
        onEdit={handleEdit}
        onDelete={(id) => setAccommodationToDelete(id)}
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
          isOpen={true}
          accommodationId={accommodationToDelete}
          onClose={() => setAccommodationToDelete(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}

    </div>
  );
};

export default WealthManagementPage;