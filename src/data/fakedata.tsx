import { Property } from "../interfaces/property.interface.js";

// Fake data (example data used for development/testing)
export const initialProperties: Property[] = [
    {
        id: 1,
        title: "Appartement Paris 11e",
        address: "123 Rue Oberkampf, 75011 Paris",
        rent: 1200,
        surface: 45,
        rooms: 2,
    },
    {
        id: 2,
        title: "Studio Lyon",
        address: "56 Rue de la République, 69002 Lyon",
        rent: 750,
        surface: 28,
        rooms: 1,
    },
];