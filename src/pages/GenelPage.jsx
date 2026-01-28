import React from 'react';
import "../styles/genelpage.css";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
    ResponsiveContainer,
    LineChart, Line,
} from 'recharts';

const data = [
    { name: 'TİP-1 (32 m)', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'TİP-2 (20 m)', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'TİP-3 (15 m)', uv: 2000, pv: 8, amt: 2290 },
    { name: 'TİP-4 (12 m)', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'TİP-5 (10 m)', uv: 18, pv: 4800, amt: 2181 },
];
const dataHaftalik = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];


const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const radius = 10;
    const text = typeof value === 'string' ? (value.split(' ')[1] || value) : value;

    return (
        <g>
            <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
            <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
                {text}
            </text>
        </g>
    );
};

const GenelPage = () => {
    return (
        <div className='genel-page'>
            <div className='genel-page-head'> GENEL İLERLEME RAPOR</div>
            <div className="genel-page-1">          
                <ResponsiveContainer height={"100%"} className="left-col">
                    <BarChart
                        data={data}
                        margin={{ top: 50, right: 30, left: 20, bottom: 24 }}
                        barSize={25}
                    >
                        <text
                            x="50%"
                            y={24}
                            textAnchor="start"
                            style={{ fontSize: 18, fontWeight: 700 }}
                        >
                            Genel İmalat Görünümü (KAZI DOLGU)
                        </text>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" minPointSize={5}>
                            <LabelList dataKey="name" content={renderCustomizedLabel} />
                        </Bar>
                        <Bar dataKey="uv" fill="#82ca9d" minPointSize={10} >
                            <LabelList dataKey="name" content={renderCustomizedLabel} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

                {/* Sağ kısım (1 birimlik, üst–alt iki bölmeli) */}
                <div className="right-col">
                   
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                        
                          
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>

                    <div className="right-col-two">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenelPage;
