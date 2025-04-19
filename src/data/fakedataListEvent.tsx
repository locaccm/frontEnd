import {Event} from '../interfaces/Event.interface.js'

// Fake events data to simulate API response
export const fakeData: Event[] = [
    {
        id: 1,
        title: "Réunion annuelle",
        date: "2025-05-12",
        description: "Réunion avec les copropriétaires pour discuter du budget."
    },
    {
        id: 2,
        title: "Maintenance ascenseur",
        date: "2025-05-20",
        description: "Travaux de maintenance prévus sur l’ascenseur principal."
    },
    {
        id: 3,
        title: "Fête des voisins",
        date: "2025-06-03",
        description: "Un moment convivial entre voisins autour d’un buffet."
    }
];