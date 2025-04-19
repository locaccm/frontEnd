// Interface representing a calendar event
export interface Event {
    id: number;
    title: string;
    date: string;
    location?: string;
    description?: string;
}