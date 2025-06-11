const API_BASE = `${import.meta.env.VITE_CHAT_URL}/api`;
function getToken() {
    return sessionStorage.getItem("token");
}
export async function getUserById(id) {
    let res = await fetch(`${API_BASE}/owners/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (res.ok)
        return res.json();
    res = await fetch(`${API_BASE}/tenants/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (res.ok)
        return res.json();
    throw new Error("User not found");
}
export async function getTenantsByOwner(ownerId) {
    const res = await fetch(`${API_BASE}/owners/${ownerId}/tenants`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok)
        throw new Error("Error fetching tenants");
    return res.json();
}
export async function getOwnerByTenant(tenantId) {
    const res = await fetch(`${API_BASE}/tenants/${tenantId}/owner`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok)
        throw new Error("Error fetching owner");
    return res.json();
}
export async function getMessages(from, to) {
    const res = await fetch(`${API_BASE}/messages?from=${from}&to=${to}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok)
        throw new Error("Failed to fetch messages");
    return res.json();
}
export async function sendMessage(sender, receiver, content) {
    const res = await fetch(`${API_BASE}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ sender, receiver, content }),
    });
    if (!res.ok)
        throw new Error("Failed to send message");
    return res.json();
}
