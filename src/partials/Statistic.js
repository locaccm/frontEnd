import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import "../css/Statistic.css"; // Import du CSS

const dataBar = [
  { name: "Jan", valeur: 400 },
  { name: "Fév", valeur: 300 },
  { name: "Mar", valeur: 500 },
  { name: "Avr", valeur: 200 },
];

const dataLine = [
  { name: "Semaine 1", valeur: 20 },
  { name: "Semaine 2", valeur: 40 },
  { name: "Semaine 3", valeur: 35 },
  { name: "Semaine 4", valeur: 50 },
];

const dataPie = [
  { name: "A", value: 40 },
  { name: "B", value: 30 },
  { name: "C", value: 20 },
  { name: "D", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const dataTable = [
  { id: 1, nom: "Produit A", ventes: 120 },
  { id: 2, nom: "Produit B", ventes: 85 },
  { id: 3, nom: "Produit C", ventes: 150 },
];

const Statistic = () => {
  return (
    <div className="statistic">
      {/* Grand carré - Statique */}
      <div className="card">
        <h2>Statistique</h2>
        <p className="number">1200</p>
      </div>

      {/* Grand carré - Graphique en barres */}
      <div className="card">
        <h2>Graphique en Barres</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dataBar}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valeur" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Grand carré - Courbe */}
      <div className="card">
        <h2>Graphique en Courbe</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={dataLine}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="valeur" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Grand carré - Camembert */}
      <div className="card">
        <h2>Graphique Circulaire</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={dataPie} dataKey="value" cx="50%" cy="50%" outerRadius={60} label>
              {dataPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Grand carré - Tableau */}
      <div className="card full-width">
        <h2>Tableau des Ventes</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Ventes</th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.nom}</td>
                <td>{row.ventes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistic;
