"use client";

import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer,
    Legend,
    CartesianGrid
} from 'recharts';

const mockData = [
    { name: 'Minggu 1', Pemasukan: 0, Pengeluaran: 0 },
    { name: 'Minggu 2', Pemasukan: 0, Pengeluaran: 0 },
    { name: 'Minggu 3', Pemasukan: 0, Pengeluaran: 0 },
    { name: 'Minggu 4', Pemasukan: 0, Pengeluaran: 0 },
];

type ChartData = {
    name: string;
    Pemasukan: number;
    Pengeluaran: number;
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border rounded-md shadow-lg">
                <p className="font-semibold">{label}</p>
                <p style={{ color: '#22c55e' }}>
                    Pemasukan: {payload[0].value.toLocaleString('id-ID')}
                </p>
                <p style={{ color: '#ef4444' }}>
                    Pengeluaran: {payload[1].value.toLocaleString('id-ID')}
                </p>
            </div>
        );
    }
    return null;
};

export const TransactionChart = ({ data }: { data: ChartData[] }) => {
    const chartData = data && data.length > 0 ? data : mockData;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart 
                data={chartData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                    dataKey="name" 
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
            
                    tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
                <Bar dataKey="Pemasukan" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Pengeluaran" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}