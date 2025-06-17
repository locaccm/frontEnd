// Interface for calendar events as defined by the API
export interface Event {
    EVEN_ID: number;
    EVEC_LIB: string;
    EVED_START: string;
    EVED_END: string;
    USEN_ID: number;
    ACCN_ID: number;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
}

// Type for local event management
export type Events = {
    [date: string]: Event[];
};

// API responses for various calendar views
export interface CalendarDayResponse {
    date: string;
    events: Event[];
}

export interface CalendarWeekResponse {
    week: number;
    year: number;
    startDate: string;
    endDate: string;
    days: string[];
    events: Event[];
}

export interface CalendarMonthResponse {
    month: number;
    year: number;
    startDate: string;
    endDate: string;
    daysInMonth: number;
    days: string[];
    events: Event[];
}

// Interface for event filters
export interface EventFilters {
    usager?: number;
    logement?: number;
    dateStart?: string;
    dateEnd?: string;
}

// Interface for a single item in a selection list (e.g., user or accommodation)
export interface SelectionDataItem {
    id: number;
    name: string;
}

// Interface for the data returned by the active selection endpoint
export interface ActiveSelectionData {
    users: SelectionDataItem[];
    accommodations: SelectionDataItem[];
}