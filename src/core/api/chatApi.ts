export interface User {
  USEN_ID: number;
  USEC_TYPE: string;
  USEC_FNAME: string;
  USEC_LNAME: string;
}

export interface Message {
  MESN_SENDER: number;
  MESN_RECEIVER: number;
  MESC_CONTENT: string;
  MESD_DATE: Date;
}

const API_BASE = `${import.meta.env.VITE_CHAT_URL}/api`;

function getToken(): string | null {
  return sessionStorage.getItem("token");
}

// Récupère un user par ID : d'abord owner, puis tenant si pas trouvé
export async function getUserById(id: number): Promise<User> {
  let res = await fetch(`${API_BASE}/owners/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (res.ok) return res.json();

  res = await fetch(`${API_BASE}/tenants/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (res.ok) return res.json();

  throw new Error("User not found");
}

export async function getTenantsByOwner(ownerId: number): Promise<User[]> {
  const res = await fetch(`${API_BASE}/owners/${ownerId}/tenants`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Error fetching tenants");
  return res.json();
}

export async function getOwnerByTenant(tenantId: number): Promise<User> {
  const res = await fetch(`${API_BASE}/tenants/${tenantId}/owner`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Error fetching owner");
  return res.json();
}

export async function getMessages(from: number, to: number): Promise<Message[]> {
  const res = await fetch(`${API_BASE}/messages?from=${from}&to=${to}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export async function sendMessage(
  sender: number,
  receiver: number,
  content: string
): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ sender, receiver, content }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}
