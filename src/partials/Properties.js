import React, { useState } from "react";
import "../css/Properties.css";

const Properties = () => {
    // State to store the list of properties
    const [properties, setProperties] = useState([
        { id: 1, name: "Appartement Paris", location: "Paris, France", price: 1200 },
        { id: 2, name: "Villa Nice", location: "Nice, France", price: 2500 },
    ]);

    return (
        <div className="properties-container">
            {/* Page title */}
            <h2 className="title">Property Management</h2>

            {/* Table displaying properties */}
            <table className="properties-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Price (€)</th>
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
