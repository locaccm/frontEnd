export async function fetchDocuments(jwt) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/documents`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    });
    if (!res.ok) {
        if (res.status === 401)
            throw new Error("Not authenticated");
        throw new Error(`Erreur ${res.status} lors du get documents`);
    }
    const body = await res.json();
    return body.documents.map((d) => ({
        name: d.name,
        url: d.url,
        created: d.created,
        leaseId: parseInt(d.name.split("_")[0], 10) || 0,
    }));
}
