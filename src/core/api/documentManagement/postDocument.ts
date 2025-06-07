export interface GenerateResponse {
    pdfUrl: string;
}

export async function generateReceipt(
    leaseId: number,
    jwt: string
): Promise<GenerateResponse> {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/rent-receipt`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ leaseId }),
        }
    );
    if (!res.ok) {
        if (res.status === 401) throw new Error("Not authenticated");
        throw new Error(`Erreur ${res.status} lors de la génération`);
    }
    return res.json();
}
