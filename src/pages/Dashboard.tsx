import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from "recharts";
import "../styles/Dashboard.css";
import {dataBar} from "../data/fakedata.data.js"
import {dataLine} from "../data/fakedata.data.js"
import {dataPie} from "../data/fakedata.data.js"
import {dataTable} from "../data/fakedata.data.js"
import {COLORS} from "../data/fakedata.data.js"

const Statistic: React.FC = () => {
    return (
        <div className="statistic">

            <h1>Dashboard Owner</h1>
            
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
