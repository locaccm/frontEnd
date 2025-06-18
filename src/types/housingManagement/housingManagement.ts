export interface Lease {
  LEAN_ID: number;
  LEAD_START: string;
  LEAD_END: string;
  LEAN_RENT: string;
  LEAN_CHARGES: string;
  LEAD_PAYMENT: string;
  LEAB_ACTIVE: boolean;
  USEN_ID: number;
  ACCN_ID: number;
}

export interface LeasePayload {
  LEAD_START: string;
  LEAD_END: string;
  LEAN_RENT: number;
  LEAN_CHARGES: number;
  LEAD_PAYMENT: string;
  LEAB_ACTIVE: boolean;
  USEN_ID: number;
  ACCN_ID: number;
}

export interface LeaseFormData {
  LEAN_ID: number;
  LEAD_START: string;
  LEAD_END: string;
  LEAN_RENT: string;
  LEAN_CHARGES: string;
  LEAD_PAYMENT: string;
  LEAB_ACTIVE: boolean;
  USEN_ID: number;
  ACCN_ID: number;
}