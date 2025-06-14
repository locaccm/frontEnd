export interface Accommodation {
  ACCN_ID: number;
  ACCC_NAME: string;
  ACCC_TYPE: string;
  ACCC_ADDRESS: string;
  ACCC_DESC: string;
  ACCB_AVAILABLE: boolean;
  USEN_ID: number;
}

export interface AccommodationInput {
  ACCC_NAME: string;
  ACCC_TYPE: string;
  ACCC_ADDRESS: string;
  ACCC_DESC: string;
  ACCB_AVAILABLE: boolean;
}

export interface AccommodationPayload {
  ACCC_NAME?: string;
  ACCC_ADDRESS?: string;
  ACCC_TYPE?: string;
  ACCC_DESC?: string;
  ACCB_AVAILABLE?: boolean;
}
