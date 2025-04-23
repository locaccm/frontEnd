import {ChartData} from '../interfaces/Dashboard.interface.js'
import {TableRow} from '../interfaces/Dashboard.interface.js'

// Data for the bar chart
export const dataBar: ChartData[] = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 500 },
    { name: "Apr", value: 200 },
];

// Data for the line chart
export const dataLine: ChartData[] = [
    { name: "Week 1", value: 20 },
    { name: "Week 2", value: 40 },
    { name: "Week 3", value: 35 },
    { name: "Week 4", value: 50 },
];

// Data for the pie chart
export const dataPie: ChartData[] = [
    { name: "A", value: 40 },
    { name: "B", value: 30 },
    { name: "C", value: 20 },
    { name: "D", value: 10 },
];

// Colors for the pie chart segments
export const COLORS: string[] = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Data for the sales table
export const dataTable: TableRow[] = [
    { id: 1, name: "Product A", sales: 120 },
    { id: 2, name: "Product B", sales: 85 },
    { id: 3, name: "Product C", sales: 150 },
];