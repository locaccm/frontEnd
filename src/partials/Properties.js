import React, { useState } from "react";
import "../css/Properties.css";

const Properties = () => {
    const [properties, setProperties] = useState([
        { id: 1, name: "Appartement Paris", location: "Paris, France", price: 1200 },
        { id: 2, name: "Villa Nice", location: "Nice, France", price: 2500 },
    ]);

    return (
        <div className="properties-container">
            <h2 className="title">Gestion des Biens</h2>
            <table className="properties-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Localisation</th>
                        <th>Prix (€)</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property.id}>
                            <td>{property.name}</td>
                            <td>{property.location}</td>
                            <td className="price">{property.price}€</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Properties;
