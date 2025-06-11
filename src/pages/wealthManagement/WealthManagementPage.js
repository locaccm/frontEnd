import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from 'react';
import AccommodationTable from "../../components/wealthManagement/AccommodationTable.js";
import CreateAccommodationModal from "../../components/wealthManagement/CreateAccommodationModal.js";
import DeleteConfirmationModal from "../../components/wealthManagement/DeleteConfirmationModal.js";
import UpdateAccommodationModal from "../../components/wealthManagement/UpdateAccommodationModal.js";
import DocumentManagement from "../documentManagement/documentManagement.js";
import MyDocuments from "../documentManagement/MyDocuments.js";
const WealthManagementPage = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [accommodationToEdit, setAccommodationToEdit] = useState(null);
    const [accommodationToDelete, setAccommodationToDelete] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const handleCreateSuccess = useCallback(() => setRefreshKey(k => k + 1), []);
    const handleUpdateSuccess = useCallback(() => setRefreshKey(k => k + 1), []);
    const handleDeleteSuccess = useCallback(() => setRefreshKey(k => k + 1), []);
    const [showDocManager, setShowDocManager] = useState(false);
    const [leaseIdForDoc, setLeaseIdForDoc] = useState(null);
    const [jwt, setJwt] = useState(null);
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setJwt(token);
    }, []);
    const handleGenerateClick = (leaseId) => {
        setLeaseIdForDoc(leaseId);
        setShowDocManager(true);
    };
    return (_jsxs("div", { style: { padding: '2rem' }, children: [_jsx("h1", { children: "Gestion des logements" }), _jsx("button", { onClick: () => setShowCreateModal(true), children: "Ajouter un logement" }), _jsx(AccommodationTable, { onCreate: () => setShowCreateModal(true), onEdit: acc => {
                    setAccommodationToEdit({ id: acc.ACCN_ID, data: acc });
                    setShowUpdateModal(true);
                }, onDelete: id => setAccommodationToDelete(id), onGenerate: handleGenerateClick }, refreshKey), showCreateModal && (_jsx(CreateAccommodationModal, { onClose: () => setShowCreateModal(false), onSuccess: handleCreateSuccess })), showUpdateModal && accommodationToEdit && (_jsx(UpdateAccommodationModal, { accommodationId: accommodationToEdit.id, initialData: accommodationToEdit.data, onClose: () => {
                    setShowUpdateModal(false);
                    setAccommodationToEdit(null);
                }, onSuccess: handleUpdateSuccess })), accommodationToDelete !== null && (_jsx(DeleteConfirmationModal, { isOpen: true, accommodationId: accommodationToDelete, onClose: () => setAccommodationToDelete(null), onSuccess: handleDeleteSuccess })), showDocManager && leaseIdForDoc !== null && jwt && (_jsx(DocumentManagement, { leaseId: leaseIdForDoc, jwt: jwt, onClose: () => setShowDocManager(false) })), "Display Documents", jwt && _jsx(MyDocuments, { jwt: jwt })] }));
};
export default WealthManagementPage;
