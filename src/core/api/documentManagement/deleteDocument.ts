export async function deleteDocument(
    filename: string,
    jwt: string
): Promise<void> {
    const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/documents/${encodeURIComponent(
            filename
        )}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt,
            },
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
