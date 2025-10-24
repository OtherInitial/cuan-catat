import Link from 'next/link';

export default function HistoryPage() {
    const currentYear = new Date().getFullYear();

    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    return (
        <div className="bg-white shadow-xl rounded-xl p-5 absolute -mt-12 left-5 right-5 space-y-5">
            <h1 className="font-semibold text-2xl">Riwayat Keuangan</h1>

            <div className="flex items-center space-x-3">
                <p className="text-gray-600">Tahun: </p>
                <div className="bg-gray-100 px-4 py-1 rounded-full font-medium text-gray-800">
                    {currentYear}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
                {months.map((month) => (
                    <Link
                        key={month}
                        href={`/riwayat/${currentYear}/${month.toLowerCase()}`}
                        className="w-full text-left p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-blue-500 transition-all duration-200 ease-in-out"
                    >
                        <p className="font-semibold text-gray-700">{month}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}