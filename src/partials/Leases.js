import React, { useState } from "react";
import "../css/Leases.css";

const Leases = () => {
    // State to store lease agreements
    const [leases, setLeases] = useState([
        { id: 1, tenant: "Jean Dupont", property: "Apartment in Paris", rent: 1200, duration: "12 months" },
        { id: 2, tenant: "Marie Curie", property: "Villa in Nice", rent: 2500, duration: "24 months" },
    ]);

    return (
        <div className="leases-container">
            {/* Page title */}
            <h2 className="title">Lease Management</h2>

            {/* Table displaying lease details */}
            <table className="leases-table">
                <thead>
                    <tr>
                        <th>Tenant</th>
                        <th>Property</th>
                        <th>Rent (€)</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Iterate over the leases array to display each lease */}
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
