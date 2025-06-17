// /home/eno/frontEnd/src/services/__mocks__/api.service.ts

export const fetchDayEvents = jest.fn();
export const fetchWeekEvents = jest.fn();
export const fetchMonthEvents = jest.fn();
export const fetchFilteredEvents = jest.fn();
export const createEvent = jest.fn();
// Note: dans Calendar.tsx, updateEvent et deleteEvent sont importés avec des alias.
// Le mock doit exporter les noms originaux si c'est ainsi qu'ils sont définis dans api.service.ts,
// ou les noms aliasés si le test les importe directement sous ces noms depuis le mock.
// Pour l'instant, je suppose que les tests importeront les noms tels qu'ils sont aliasés dans Calendar.tsx
// ou que les noms originaux sont updateEventApi et deleteEventApi.
// Si les noms originaux dans api.service.ts sont 'updateEvent' et 'deleteEvent',
// alors le mock devrait les exporter ainsi, et Calendar.test.tsx devrait les importer sans alias
// ou le mock de Calendar.tsx devrait gérer l'alias.
// Pour plus de simplicité et en se basant sur l'usage dans Calendar.tsx, on va utiliser les noms finaux.
export const updateEvent = jest.fn(); // Supposant que le nom original est 'updateEvent'
export const deleteEvent = jest.fn(); // Supposant que le nom original est 'deleteEvent'

// Si EventData est un type ou une interface, il n'a pas besoin d'être ici.
// Si c'est une valeur (ex: une classe ou un objet), il faudrait le simuler aussi.
// export const EventData = {}; // Exemple si c'est un objet
