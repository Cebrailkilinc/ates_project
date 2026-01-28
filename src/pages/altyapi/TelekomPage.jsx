import React from "react";
import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import "../../styles/telekom.css";
import { RechartsDevtools } from '@recharts/devtools';
import { Table } from "antd";

const dataSource = [
    {
        key: '1',
        name: 'Toplam Hat Uzunluğu',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'Yapılan Hat Uzunluğu',
        age: 42,
        address: '10 Downing Street',
    },
    {
        key: '3',
        name: 'İlerleme Oranı',
        age: 42,
        address: '10 Downing Street',
    },  
    {
        key: '5',
        name: 'Stoktaki T1 / T2',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {

        dataIndex: 'name',
        key: 'name',
    },
    {

        dataIndex: 'age',
        key: 'age',
    },

];

const data = [
    { name: "Yapılan(m)", value: 60 },
    { name: "Kalan(m)", value: 40 },
];
const data1 = [
    { name: "Toplam Uzunluk", value: 21000 },
];
const data2 = [
    { name: "Yapılan Menhol", value: 258 },
    { name: "Kalan Menhol", value: 40 },
];

const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderCustomizedLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    if (cx == null || cy == null || innerRadius == null || outerRadius == null) return null;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const ncx = Number(cx);
    const ncy = Number(cy);
    const x = ncx + radius * Math.cos(-((midAngle ?? 0) * RADIAN));
    const y = ncy + radius * Math.sin(-((midAngle ?? 0) * RADIAN));

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > ncx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${((percent ?? 0) * 100).toFixed(0)}%`}
        </text>
    );
};

const TelekomPage = () => {
    return (
        <div>
            <h1 className="telekom-genel-container-baslik" >TELEKOM GENEL BİLGİLER</h1>
            <div className="telekom-genel-container">
                {/* CHART 1 */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" aspect={1}>
                        <PieChart>
                            <Pie
                                data={data1}
                                dataKey="value"
                                nameKey="name"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                isAnimationActive
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* CHART 2 */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" aspect={1}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                isAnimationActive
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                {/* CHART 2 */}
                <div className="chart-box">
                    <ResponsiveContainer width="100%" aspect={1}>
                        <PieChart>
                            <Pie
                                data={data2}
                                dataKey="value"
                                nameKey="name"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                isAnimationActive
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="telekom-table">
                <div className="table-box">
                    <Table dataSource={dataSource} columns={columns} />
                </div>
                <div className="table-box">
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </div>
        </div>
    );
};

export default TelekomPage;
