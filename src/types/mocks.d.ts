// In src/types/mocks.d.ts

declare module '../services/api.service' {
  const apiClient: any; // Replace 'any' with the actual type of apiClient if known (e.g., AxiosInstance)
  export default apiClient;

  export const fetchDayEvents: import('vitest').Mock<any[], any>;
  export const fetchWeekEvents: import('vitest').Mock<any[], any>;
  export const fetchMonthEvents: import('vitest').Mock<any[], any>;
  export const fetchFilteredEvents: import('vitest').Mock<any[], any>;
  export const createEvent: import('vitest').Mock<any[], any>;
  export const updateEvent: import('vitest').Mock<any[], any>;
  export const deleteEvent: import('vitest').Mock<any[], any>;
}

declare module '../services/calendar.service' {
  // Assuming CalendarService is an object with mocked methods
  export const CalendarService: {
    fetchActiveSelectionData: import('vitest').Mock<any[], any>;
    fetchDayEvents: import('vitest').Mock<any[], any>;
    fetchWeekEvents: import('vitest').Mock<any[], any>;
    fetchMonthEvents: import('vitest').Mock<any[], any>;
    fetchFilteredEvents: import('vitest').Mock<any[], any>;
    createEvent: import('vitest').Mock<any[], any>;
    updateEvent: import('vitest').Mock<any[], any>;
    deleteEvent: import('vitest').Mock<any[], any>;
    // Add other methods of CalendarService if they are used and mocked
  };
}

declare module '../interfaces/Calendar.interface' {
  export interface SelectionDataItem {
    id: number;
    name: string;
  }
  export interface Event { _placeholder: any; /* define actual properties */ }
  export interface CalendarMonthResponse { _placeholder: any; /* define actual properties */ }
  export interface CalendarDayResponse { _placeholder: any; /* define actual properties */ }
  export interface CalendarWeekResponse { _placeholder: any; /* define actual properties */ }
  export interface ActiveSelectionData { _placeholder: any; /* define actual properties */ }
}


declare module '../services/api.service' {
  const apiClient: any; // Replace 'any' with the actual type of apiClient if known (e.g., AxiosInstance)
  export default apiClient;

  export const fetchDayEvents: import('vitest').Mock<any[], any>;
  export const fetchWeekEvents: import('vitest').Mock<any[], any>;
  export const fetchMonthEvents: import('vitest').Mock<any[], any>;
  export const fetchFilteredEvents: import('vitest').Mock<any[], any>;
  export const createEvent: import('vitest').Mock<any[], any>;
  export const updateEvent: import('vitest').Mock<any[], any>;
  export const deleteEvent: import('vitest').Mock<any[], any>;
}

declare module '../services/calendar.service' {
  // Assuming CalendarService is an object with mocked methods
  export const CalendarService: {
    fetchActiveSelectionData: import('vitest').Mock<any[], any>;
    fetchDayEvents: import('vitest').Mock<any[], any>;
    fetchWeekEvents: import('vitest').Mock<any[], any>;
    fetchMonthEvents: import('vitest').Mock<any[], any>;
    fetchFilteredEvents: import('vitest').Mock<any[], any>;
    createEvent: import('vitest').Mock<any[], any>;
    updateEvent: import('vitest').Mock<any[], any>;
    deleteEvent: import('vitest').Mock<any[], any>;
    // Add other methods of CalendarService if they are used and mocked
  };
}

declare module '../interfaces/Calendar.interface' {
  export interface SelectionDataItem {
    id: number;
    name: string;
  }
  export interface Event { id: any; /* define actual properties */ }
  export interface CalendarMonthResponse { id: any; /* define actual properties */ }
  export interface CalendarDayResponse { id: any; /* define actual properties */ }
  export interface CalendarWeekResponse { id: any; /* define actual properties */ }
  export interface ActiveSelectionData { id: any; /* define actual properties */ }
}


declare module '../services/api.service' {
  const apiClient: any; // Replace 'any' with the actual type of apiClient if known (e.g., AxiosInstance)
  export default apiClient;

  export const fetchDayEvents: import('vitest').Mock<any[], any>;
  export const fetchWeekEvents: import('vitest').Mock<any[], any>;
  export const fetchMonthEvents: import('vitest').Mock<any[], any>;
  export const fetchFilteredEvents: import('vitest').Mock<any[], any>;
  export const createEvent: import('vitest').Mock<any[], any>;
  export const updateEvent: import('vitest').Mock<any[], any>;
  export const deleteEvent: import('vitest').Mock<any[], any>;
}

declare module '../services/calendar.service' {
  // Assuming CalendarService is an object with mocked methods
  export const CalendarService: {
    fetchActiveSelectionData: import('vitest').Mock<any[], any>;
    fetchDayEvents: import('vitest').Mock<any[], any>;
    fetchWeekEvents: import('vitest').Mock<any[], any>;
    fetchMonthEvents: import('vitest').Mock<any[], any>;
    fetchFilteredEvents: import('vitest').Mock<any[], any>;
    createEvent: import('vitest').Mock<any[], any>;
    updateEvent: import('vitest').Mock<any[], any>;
    deleteEvent: import('vitest').Mock<any[], any>;
    // Add other methods of CalendarService if they are used and mocked
  };
}

declare module '../interfaces/Calendar.interface' {
}