import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from "recharts";
import "../css/Statistic.css"; 

// Data for the bar chart
const dataBar = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
];

// Data for the line chart
const dataLine = [
  { name: "Week 1", value: 20 },
  { name: "Week 2", value: 40 },
  { name: "Week 3", value: 35 },
  { name: "Week 4", value: 50 },
];

// Data for the pie chart
const dataPie = [
  { name: "A", value: 40 },
  { name: "B", value: 30 },
  { name: "C", value: 20 },
  { name: "D", value: 10 },
];

// Colors for the pie chart segments
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Data for the sales table
const dataTable = [
  { id: 1, name: "Product A", sales: 120 },
  { id: 2, name: "Product B", sales: 85 },
  { id: 3, name: "Product C", sales: 150 },
];

const Statistic = () => {
  return (
    <div className="statistic">
      
      {/* Statistic card */}
      <div className="card">
        <h2>Statistics</h2>
        <p className="number">1200</p>
      </div>

      {/* Bar Chart */}
      <div className="card">
        <h2>Bar Chart</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dataBar}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="card">
        <h2>Line Chart</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={dataLine}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="card">
        <h2>Pie Chart</h2>
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

      {/* Sales Table */}
      <div className="card full-width">
        <h2>Sales Table</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Sales</th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Statistic;
