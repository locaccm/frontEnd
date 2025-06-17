// /home/eno/frontEnd/src/services/__mocks__/api.service.ts

export const fetchDayEvents = vi.fn(() =>
  Promise.resolve({ data: { events: [] } }),
);
export const fetchWeekEvents = vi.fn(() =>
  Promise.resolve({ data: { events: [] } }),
);
export const fetchMonthEvents = vi.fn(() =>
  Promise.resolve({ data: { events: [] } }),
);
export const fetchFilteredEvents = vi.fn(() =>
  Promise.resolve({ data: { events: [] } }),
);
export const createEvent = vi.fn(() => Promise.resolve({ data: {} })); // Assuming create returns a single object

// French comments from user below - retained
// Si api.service.ts exporte ces fonctions avec des noms différents (par exemple, fetchEventsForDay au lieu de fetchDayEvents)
// alors le mock devrait les exporter ainsi, et Calendar.test.tsx devrait les importer sans alias
// ou le mock de Calendar.tsx devrait gérer l'alias.
// Pour plus de simplicité et en se basant sur l'usage dans Calendar.tsx, on va utiliser les noms finaux.
export const updateEvent = vi.fn(() => Promise.resolve({ data: {} })); // Assuming update returns a single object
export const deleteEvent = vi.fn(() => Promise.resolve({ data: {} })); // Assuming delete returns some confirmation or empty data
