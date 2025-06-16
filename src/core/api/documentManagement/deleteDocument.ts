import {getUserId} from "../../session/SessionsManager.js";

export async function deleteDocument(
    filename: string,
    jwt: string
): Promise<void> {
    const bucketName = "locaccm-bucket";
    const userId = getUserId();
    if (userId === null) throw new Error("User not logged in");

    const response = await fetch(
        `${import.meta.env.VITE_API_URL_DOCUMENT_MANAGEMENT}/api/documents/${encodeURIComponent(
            filename
        )}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ bucketName, userId }),
        }
    );
    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        const msg =
            (body && (body.message || body.error)) ||
            `Erreur ${response.status} lors de la suppression`;
        throw new Error(msg);
    }
}
