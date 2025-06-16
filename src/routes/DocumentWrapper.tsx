import { useParams } from "react-router-dom";
import DocumentManagement from "../pages/documentManagement/documentManagement.js";
import { Navigate } from "react-router-dom";

const DocumentWrapper = () => {
    const { leaseId } = useParams();
    const leaseIdNumber = Number(leaseId); 
    const jwt = sessionStorage.getItem("token") || "";
    const userId = sessionStorage.getItem("userId") || "";

    if (!jwt) {
        return <Navigate to="/signin" />;
    }  

    if (!leaseId || isNaN(leaseIdNumber) || !jwt || !userId) {
        return <div>Unauthorized access or missing information.</div>;
    }


    return (
        <DocumentManagement
            leaseId={leaseIdNumber}
            jwt={jwt}
            onClose={() => window.history.back()}
        />
    );
};

export default DocumentWrapper;
