import axios from 'axios';

// Base configuration for axios
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_KEY = import.meta.env.VITE_API_KEY || '';

// Create an axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  }
});

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the error and return it for component-level handling
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Function to fetch events for a specific day
export const fetchDayEvents = (date: string) => {
  return apiClient.get(`/calendar/day?date=${date}`);
};

// Function to fetch events for a specific week
export const fetchWeekEvents = (date: string) => {
  return apiClient.get(`/calendar/week?date=${date}`);
};

// Function to fetch events for a specific month
export const fetchMonthEvents = (month: number, year: number) => {
  return apiClient.get(`/calendar/month?month=${month}&year=${year}`);
};

// Function to fetch filtered events
export const fetchFilteredEvents = (filters: {
  usager?: number;
  logement?: number;
  dateStart?: string;
  dateEnd?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (filters.usager) queryParams.append('usager', filters.usager.toString());
  if (filters.logement) queryParams.append('logement', filters.logement.toString());
  if (filters.dateStart) queryParams.append('dateStart', filters.dateStart);
  if (filters.dateEnd) queryParams.append('dateEnd', filters.dateEnd);
  
  return apiClient.get(`/events/filter?${queryParams.toString()}`);
};

// Interface for event data
export interface EventData {
  title: string;
  // For single-day event: date, startTime and endTime
  date?: string;
  startTime?: string;
  endTime?: string;
  // For multi-day event: dateStart and dateEnd
  dateStart?: string;
  dateEnd?: string;
  description?: string;
  usagerId?: number;
  logementId?: number;
  recurrent?: boolean;
  // Optional fields that may come from the API
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  color?: string;
  status?: 'active' | 'cancelled' | 'completed';
}

// Payload sent to backend for creating/updating an event
export type ApiEventData = Omit<EventData, 'usagerId' | 'logementId'> & {
  USEN_ID?: number;
  ACCN_ID?: number;
};

// Function to create an event (maps usagerId/logementId to USEN_ID/ACCN_ID)
export const createEvent = (eventData: EventData) => {
  const { usagerId, logementId, ...rest } = eventData;
  const payload: ApiEventData = {
    ...rest,
    USEN_ID: usagerId,
    ACCN_ID: logementId,
  };
  return apiClient.post('/events', payload);
};

// Function to update an event (maps usagerId/logementId accordingly)
export const updateEvent = (id: number, eventData: EventData) => {
  const { usagerId, logementId, ...rest } = eventData;
  const payload: ApiEventData = {
    ...rest,
    USEN_ID: usagerId,
    ACCN_ID: logementId,
  };
  return apiClient.put(`/events/${id}`, payload);
};

// Function to delete an event
export const deleteEvent = (id: number) => {
  return apiClient.delete(`/events/${id}`);
};

// Interface for a user (User)
export interface User {
  USEN_ID: number;
  USEC_FNAME: string;
  USEC_LNAME: string;
}

// Fetch the list of users
export const fetchUsers = () => {
  return apiClient.get<User[]>('/users');
};

// Interface for an accommodation (Accommodation)
export interface Accommodation {
  ACCN_ID: number;
  ACCC_NAME: string;
}

// Fetch the list of accommodations
export const fetchAccommodations = () => {
  return apiClient.get<Accommodation[]>('/accommodations');
};

export default apiClient;
