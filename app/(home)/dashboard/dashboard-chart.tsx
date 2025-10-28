"use client";

import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer,
    Legend,
    CartesianGrid
} from 'recharts';

type ChartData = {
    day: string;
    Pemasukan: number;
    Pengeluaran: number;
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border rounded-md shadow-lg">
                <p className="font-semibold">{label}</p>
                <p style={{ color: '#22c55e' }}>
                    Pemasukan: Rp {payload[0].value.toLocaleString('id-ID')}
                </p>
                <p style={{ color: '#ef4444' }}>
                    Pengeluaran: Rp {payload[1].value.toLocaleString('id-ID')}
                </p>
            </div>
        );
    }
    return null;
};

export const DashboardChart = ({ data }: { data: ChartData[] }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart 
                data={data}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
                <defs>
                    <linearGradient id="colorPemasukan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPengeluaran" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                    dataKey="day" 
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    // Hanya tampilkan beberapa label agar tidak tumpang tindih
                    interval="preserveStartEnd" 
                />
                <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    // Format tick agar ringkas (misal: 10000 -> 10k)
                    tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
                
                {/* Area Pemasukan */}
                <Area 
                    type="monotone" 
                    dataKey="Pemasukan" 
                    stroke="#22c55e" 
                    fillOpacity={1} 
                    fill="url(#colorPemasukan)" 
                    strokeWidth={2}
                />
                {/* Area Pengeluaran */}
                <Area 
                    type="monotone" 
                    dataKey="Pengeluaran" 
                    stroke="#ef4444" 
                    fillOpacity={1} 
                    fill="url(#colorPengeluaran)"
                    strokeWidth={2}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}