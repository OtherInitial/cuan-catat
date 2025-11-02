<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChartLogic extends Controller
{
    public function hitungRataRata()
    {
        // Hitung rata-rata nilai dari kolom 'nilai' pada tabel yang menyimpan data nilai selama satu hari
        $rataNilai = DB::table('dummy_data')
            ->selectRaw('AVG(nilai) AS rata_nilai')
            ->whereDate('waktu', now()->toDateString())
            ->value('rata_nilai');

        // Simpan hasil rata-rata ke dalam tabel lain
        DB::table('dummy_data2')->insert([
            'avg_ampere' => $rataNilai
        ]);

        // Kosongkan tabel yang menyimpan data nilai jika sudah ganti hari
        DB::table('dummy_data')->whereDate('waktu', '<', now()->toDateString())->delete();

        return response()->json(['message' => 'Operasi berhasil dilakukan.']);
    }
    public function getData1(Request $request)
    {
        $tanggalAwal = $request->input('startDate');
        $tanggalAkhir = $request->input('endDate');

        $data_panel = DB::table('avg1')
            ->select('day', 'avg_ampere')
            ->whereBetween('day', [$tanggalAwal, $tanggalAkhir])
            ->orderBy('day', 'asc')
            ->get();

        $labels = [];
        $data = [];

        foreach ($data_panel as $item) {
            $labels[] = $item->day;
            $data[] = $item->avg_ampere;
        }

        return response()->json(['labels' => $labels, 'data' => $data]);
    }
    public function getData2(Request $request)
    {
        $tanggalAwal = $request->input('startDate4');
        $tanggalAkhir = $request->input('endDate4');

        $data_panel = DB::table('avg2')
            ->select('day', 'avg_ampere')
            ->whereBetween('day', [$tanggalAwal, $tanggalAkhir])
            ->orderBy('day', 'asc')
            ->get();

        $labels = [];
        $data = [];

        foreach ($data_panel as $item) {
            $labels[] = $item->day;
            $data[] = $item->avg_ampere;
        }

        return response()->json(['labels' => $labels, 'data' => $data]);
    }
    public function getData3(Request $request)
    {
        $tanggalAwal = $request->input('startDate2');
        $tanggalAkhir = $request->input('endDate2');

        $data_panel = DB::table('avg3')
            ->select('day', 'avg_ampere')
            ->whereBetween('day', [$tanggalAwal, $tanggalAkhir])
            ->orderBy('day', 'asc')
            ->get();

        $labels = [];
        $data = [];

        foreach ($data_panel as $item) {
            $labels[] = $item->day;
            $data[] = $item->avg_ampere;
        }

        return response()->json(['labels' => $labels, 'data' => $data]);
    }
    public function getData4(Request $request)
    {
        $tanggalAwal = $request->input('startDate3');
        $tanggalAkhir = $request->input('endDate3');

        $data_panel = DB::table('avg4')
            ->select('day', 'avg_ampere')
            ->whereBetween('day', [$tanggalAwal, $tanggalAkhir])
            ->orderBy('day', 'asc')
            ->get();

        $labels = [];
        $data = [];

        foreach ($data_panel as $item) {
            $labels[] = $item->day;
            $data[] = $item->avg_ampere;
        }

        return response()->json(['labels' => $labels, 'data' => $data]);
    }
}