// /home/eno/frontEnd/src/services/__mocks__/calendar.service.ts

export const CalendarService = {
  getActiveSelectionData: vi.fn(() => Promise.resolve({ data: { users: [], accommodations: [] } })),
  fetchDayEvents: vi.fn(() => Promise.resolve({ data: { events: [] } })),
  fetchWeekEvents: vi.fn(() => Promise.resolve({ data: { events: [] } })),
  fetchMonthEvents: vi.fn(() => Promise.resolve({ data: { events: [] } })),
  fetchFilteredEvents: vi.fn(() => Promise.resolve({ data: { events: [] } })),
  createEvent: vi.fn(() => Promise.resolve({ data: {} })),
  updateEvent: vi.fn(() => Promise.resolve({ data: {} })),
  deleteEvent: vi.fn(() => Promise.resolve({ data: {} })),
  // Add other CalendarService methods here if they are used and need to be mocked
};
