import { getUserId } from "../../session/SessionsManager.js";

export interface DocumentInfo {
  name: string;
  url: string;
  created: string;
  leaseId: number;
}

export async function fetchDocuments(jwt: string): Promise<DocumentInfo[]> {
  const bucketName = "locaccm-bucket";
  const userId = getUserId();
  if (userId == null) throw new Error("User not logged in");

  const baseUrl = import.meta.env.VITE_API_URL_DOCUMENT_MANAGEMENT;
  const fullUrl = `${baseUrl}/api/documents?bucketName=${bucketName}&userId=${userId}`;

  const res = await fetch(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (!res.ok) {
    if (res.status === 401) throw new Error("Not authenticated");
    throw new Error(`Erreur ${res.status} lors du get documents`);
  }
  const body = await res.json();
  const frontHost = import.meta.env.VITE_BUCKET_UPLOAD_URL!;

  return body.documents.map((d: any) => {
    const parts = d.url.split(`/${bucketName}/`);
    const relativePath = parts.length > 1 ? parts[1] : d.name;
    return {
      name: d.name,
      url: `${frontHost}/files/${relativePath}`,
      created: d.created,
      leaseId: parseInt(d.name.split("_")[0], 10) || 0,
    };
  });
}
