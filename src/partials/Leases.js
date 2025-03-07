import React, { useState } from "react";
import "../css/Leases.css";

const Leases = () => {
    const [leases, setLeases] = useState([
        { id: 1, tenant: "Jean Dupont", property: "Appartement Paris", rent: 1200, duration: "12 mois" },
        { id: 2, tenant: "Marie Curie", property: "Villa Nice", rent: 2500, duration: "24 mois" },
    ]);

    return (
        <div className="leases-container">
            <h2 className="title">Gestion des Baux</h2>
            <table className="leases-table">
                <thead>
                    <tr>
                        <th>Locataire</th>
                        <th>Bien</th>
                        <th>Loyer (€)</th>
                        <th>Durée</th>
                    </tr>
                </thead>
                <tbody>
                    {leases.map((lease) => (
                        <tr key={lease.id}>
                            <td>{lease.tenant}</td>
                            <td>{lease.property}</td>
                            <td className="rent">{lease.rent}€</td>
                            <td>{lease.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leases;
