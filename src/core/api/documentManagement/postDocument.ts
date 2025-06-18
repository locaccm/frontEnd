import {getUserId} from "../../session/SessionsManager.js";

export interface GenerateResponse { pdfUrl: string }

export async function generateReceipt(
    leaseId: number,
    jwt: string
): Promise<GenerateResponse> {
    const bucketName = "locaccm-bucket";
    const userId = getUserId();
    if (userId === null) throw new Error("User not logged in");

    const res = await fetch(
        `${import.meta.env.VITE_API_URL_DOCUMENT_MANAGEMENT}/api/rent-receipt`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ leaseId, bucketName, userId }),
        }
    );
    if (!res.ok) {
        if (res.status === 401) throw new Error("Not authenticated");
        throw new Error(`Erreur ${res.status} lors de la génération`);
    }
    return res.json();
}
