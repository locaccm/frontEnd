import apiClient from './api.service';
import { Event, CalendarMonthResponse, CalendarDayResponse, CalendarWeekResponse } from '../interfaces/Calendar.interface';

/**
 * Service for managing interactions with the calendar API
 */
export const CalendarService = {
  /**
   * Fetch all events
   */
  getAllEvents: async (): Promise<Event[]> => {
    const response = await apiClient.get('/events');
    return response.data;
  },

  /**
   * Fetch an event by its ID
   */
  getEventById: async (id: number): Promise<Event> => {
    const response = await apiClient.get(`/events/${id}`);
    return response.data;
  },

  /**
   * Create a new event
   */
  createEvent: async (event: Partial<Event>): Promise<Event> => {
    const response = await apiClient.post('/events', event);
    return response.data;
  },

  /**
   * Update an existing event
   */
  updateEvent: async (id: number, event: Partial<Event>): Promise<Event> => {
    const response = await apiClient.put(`/events/${id}`, event);
    return response.data;
  },

  /**
   * Delete an event
   */
  deleteEvent: async (id: number): Promise<void> => {
    await apiClient.delete(`/events/${id}`);
  },

  /**
   * Filter events by various criteria
   */
  filterEvents: async (filters: {
    usager?: number;
    logement?: number;
    dateStart?: string;
    dateEnd?: string;
  }): Promise<Event[]> => {
    const response = await apiClient.get('/events/filter', { params: filters });
    return response.data;
  },

  /**
   * Fetch events for a specific day
   */
  getEventsForDay: async (params: {
    date?: string;
    day?: number;
    month?: number;
    year?: number;
    usager?: number;
    logement?: number;
  }): Promise<CalendarDayResponse> => {
    const response = await apiClient.get('/calendar/day', { params });
    return response.data;
  },

  /**
   * Fetch events for a specific week
   */
  getEventsForWeek: async (params: {
    date?: string;
    week?: number;
    year?: number;
    usager?: number;
    logement?: number;
  }): Promise<CalendarWeekResponse> => {
    const response = await apiClient.get('/calendar/week', { params });
    return response.data;
  },

  /**
   * Fetch events for a specific month
   */
  getEventsForMonth: async (params: {
    date?: string;
    month?: number;
    year?: number;
    usager?: number;
    logement?: number;
  }): Promise<CalendarMonthResponse> => {
    const response = await apiClient.get('/calendar/month', { params });
    return response.data;
  }
};

export default CalendarService;
