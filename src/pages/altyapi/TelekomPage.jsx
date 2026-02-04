import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Table, Typography, Tag, Card } from "antd";
import "../../styles/telekom.css";

const { Title, Text } = Typography;



const lineStats = [
    { name: "Yapılan(m)", value: 12600 },
    { name: "Kalan(m)", value: 8400 },
];

const menholStats = [
    { name: "Yapılan Menhol", value: 258 },
    { name: "Kalan Menhol", value: 42 },
];
const deneme = 5
const yolColumns = [
    {
        title: 'Yol No',
        dataIndex: 'yolId',
        key: 'yolId',
        fixed: 'left',
        render: (text) => <Text strong>{text || "İsimsiz Yol"}</Text>
    },
    {
        title: 'Toplam Metraj',
        dataIndex: 'toplamUzunluk_m',
        key: 'toplamUzunluk_m',
        render: (val) => `${val} m`
    },
    {
        title: 'Yapılan Metraj',
        dataIndex: 'yapilanUzunluk_m',
        key: 'yapilanUzunluk_m',
        render: (val) => <Text type="success">{val} m</Text>
    },
    {
        title: 'T1 Sayısı',
        dataIndex: 't1Sayisi',
        key: 't1Sayisi',
    },
    {
        title: 'T2 Sayısı',
        dataIndex: 't2Sayisi',
        key: 't2Sayisi',
    },
    {
        title: 'Durum',
        dataIndex: 'bittiMi',
        key: 'bittiMi',
        render: (bitti) => (
            <Tag color={bitti ? 'green' : 'orange'}>
                {bitti ? 'TAMAMLANDI' : 'DEVAM EDİYOR'}
            </Tag>
        ),
    },
];
const columns = [
    {
        title: 'Parametre',
        dataIndex: 'label',
        key: 'label',
        render: (text) => <Text strong>{text}</Text>
    },
    {
        title: 'Değer',
        dataIndex: 'value',
        key: 'value',
    },
    {
        title: 'Durum',
        dataIndex: 'status',
        key: 'status',
        render: (status, record) => (
            <Tag color={record.color}>{status.toUpperCase()}</Tag>
        ),
    },
];

// --- YARDIMCI FONKSİYONLAR ---

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="bold">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const TelekomPage = () => {


    const [telekomData, setTelekomData] = useState(null);

    useEffect(() => {
        const veriyiGetir = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                if (!querySnapshot.empty) {
                    // Sadece ham veriyi state'e atıyoruz
                    setTelekomData(querySnapshot.docs[0].data().telekom);
                }
            } catch (hata) {
                console.error("Firestore Error:", hata);
            }
           
        };
        veriyiGetir();
    }, []);
 console.log(telekomData)
    // Tablo verilerini telekomData geliştikçe otomatik hesaplar
    const detailedData1 = useMemo(() => {
        if (!telekomData) return [];
        const { genelBilgi: g } = telekomData;
        const oran = ((g?.toplamYapilanUzunluk_m / g?.toplamUzunluk_m) * 100 || 0).toFixed(1);

        return [
            { key: '1', label: 'Proje Hat Uzunluğu', value: `${g?.toplamUzunluk_m ?? "0"} m`, status: 'Target', color: 'blue' },
            { key: '2', label: 'Yapılan Hat Uzunluğu', value: `${g?.toplamYapilanUzunluk_m ?? "0"} m`, status: 'Completed', color: 'green' },
            { key: '3', label: 'Kalan Hat Uzunluğu', value: `${(g?.toplamUzunluk_m - g?.toplamYapilanUzunluk_m) || 0} m`, status: 'Available', color: 'purple' },
            { key: '4', label: 'İlerleme Oranı', value: `%${oran}`, status: 'In Progress', color: 'orange' },
        ];
    }, [telekomData]);

    const detailedData2 = useMemo(() => {
        if (!telekomData) return [];
        const { genelBilgi: g } = telekomData;

        return [
            { key: '1', label: 'Proje Menhol Sayısı T1/T2', value: `${g?.t1Toplam ?? "0"} / ${g?.t2Toplam ?? "0"} Adet`, status: 'Target', color: 'blue' },
            {
                key: '2',
                label: 'Yapılan Menhol',
                value: `${g?.kullanilanMenhol?.t1Kullanilan ?? 0} / ${g?.kullanilanMenhol?.t2Kullanilan ?? 0} Adet`,
                status: 'Completed', color: 'green'
            },
            {
                key: '3',
                label: 'İhtiyaç T1 / T2',
                value: `${g?.t1Toplam ?? "0"} / ${g?.t2Toplam ?? "0"} Adet`,
                status: 'Available', color: 'purple'
            },
        ];
    }, [telekomData]);

    // Hat İlerleme Grafiği (Metraj)
    const lineStats = useMemo(() => {
        if (!telekomData?.genelBilgi) return [];
        const yapilan = Number(telekomData.genelBilgi.toplamYapilanUzunluk_m) || 0;
        const toplam = Number(telekomData.genelBilgi.toplamUzunluk_m) || 0;
        const kalan = Math.max(0, toplam - yapilan);

        return [
            { name: "Yapılan (m)", value: yapilan },
            { name: "Kalan (m)", value: kalan }
        ];
    }, [telekomData]);

    // Menhol Montaj Grafiği (Adet)
    const menholStats = useMemo(() => {
        if (!telekomData?.genelBilgi?.kullanilanMenhol) return [];
        const t1 = Number(telekomData.genelBilgi.kullanilanMenhol.t1Kullanilan) || 0;
        const t2 = Number(telekomData.genelBilgi.kullanilanMenhol.t2Kullanilan) || 0;
        const toplamMenhol = Number(telekomData.genelBilgi.t1Toplam + telekomData.genelBilgi.t2Toplam) || 0;
        return [
            { name: "Toplam Menhol", value: toplamMenhol },
            { name: "Kalan Menhol", value: toplamMenhol - (t1 + t2) }
        ];
    }, [telekomData]);



    return (
        <div className="telekom-main-container">
            <header className="telekom-header">
                <Title level={2} className="telekom-baslik">TELEKOM GENEL BİLGİLER</Title>
                <Text type="secondary">Saha operasyon ve envanter takip paneli</Text>
            </header>

            {/* GRAFİKLER */}
            <div className="telekom-grid-layout">
                <Card className="chart-box" title="Hat İlerleme Metrajı (m)">
                    {lineStats.length > 0 && lineStats.some(s => s.value > 0) ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={lineStats}
                                    dataKey="value"
                                    nameKey="name"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                >
                                    {lineStats.map((entry, index) => (
                                        <Cell key={`cell-line-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Text type="secondary">Henüz metraj verisi girilmedi</Text>
                        </div>
                    )}
                </Card>

                {/* MENHOL MONTAJ */}
                <Card className="chart-box" title="Menhol Montaj Durumu (Adet)">
                    {menholStats.length > 0 && menholStats.some(s => s.value > 0) ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={menholStats}
                                    dataKey="value"
                                    nameKey="name"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                >
                                    {menholStats.map((entry, index) => (
                                        <Cell key={`cell-menhol-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Text type="secondary">Henüz menhol montajı yapılmadı</Text>
                        </div>
                    )}
                </Card>

            </div>

            {/* TABLOLAR */}
            <div className="telekom-grid-layout">
                <div className="table-box">
                    <Title level={4}>Saha İlerleme Raporu</Title>
                    <Table
                        pagination={false}
                        dataSource={detailedData1}
                        columns={columns}
                        size="middle"
                    />
                </div>
                <div className="table-box">
                    <Title level={4}>Malzeme ve Stok Durumu</Title>
                    <Table
                        pagination={false}
                        dataSource={detailedData2}
                        columns={columns}
                        size="middle"
                    />
                </div>
            </div>
            <Card
                title="Detaylı Yol İlerleme Listesi"
                className="table-box"
                style={{ marginTop: '24px', width: '100%' }}
            >
                <Table
                    dataSource={telekomData?.yolDetaylari || []} // Görseldeki Array(45) buraya bağlanır
                    columns={yolColumns}
                    rowKey="yolId" // Firebase'den gelen yolId'yi anahtar yapıyoruz
                    pagination={{ pageSize: 10, showSizeChanger: false }}
                    scroll={{ x: 800 }} // Mobilde tablonun taşmasını engeller
                    size="small"
                />
            </Card>
        </div>
    );
};

export default TelekomPage;