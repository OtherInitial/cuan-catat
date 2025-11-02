<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class RealtimeChartController extends Controller
{
    public function areaChart()
    {
        // Replace this with your actual data retrieval logic
        $data_panel = DB::table('dummy_data')
            ->select('waktu', 'nilai')
            ->orderBy('waktu', 'desc')
            ->take(12)
            ->get();

        $labels = [];
        $data = [];

        foreach ($data_panel as $item) {
            $labels[] = $item->waktu;
            $data[] = $item->nilai;
        }

        return response()->json(['labels' => $labels, 'data' => $data]);
    }
    public function areaChart2()
    {
        // Replace this with your actual data retrieval logic
        $data_panel = DB::table('dummy_data2')
            ->select('waktu', 'nilai')
            ->orderBy('waktu', 'desc')
            ->take(12)
            ->get();

        $labels = [];
        $data = [];

        foreach ($data_panel as $item) {
            $labels[] = $item->waktu;
            $data[] = $item->nilai;
        }

        return response()->json(['labels' => $labels, 'data' => $data]);
    }

    public function areaChart3()
    {
        // Replace this with your actual data retrieval logic
        $data_panel = DB::table('dummy_data3')
            ->select('waktu', 'nilai')
            ->orderBy('waktu', 'desc')
            ->take(12)
            ->get();

        $labels = [];
        $data = [];

        foreach ($data_panel as $item) {
            $labels[] = $item->waktu;
            $data[] = $item->nilai;
        }

        return response()->json(['labels' => $labels, 'data' => $data]);
    }

    public function areaChart4()
    {
        // Replace this with your actual data retrieval logic
        $data_panel = DB::table('dummy_data4')
            ->select('waktu', 'nilai')
            ->orderBy('waktu', 'desc')
            ->take(12)
            ->get();

        $labels = [];
        $data = [];

        foreach ($data_panel as $item) {
            $labels[] = $item->waktu;
            $data[] = $item->nilai;
        }

        return response()->json(['labels' => $labels, 'data' => $data]);
    }
    public function areaChart5()
    {
        // Replace this with your actual data retrieval logic
        $data_panel = DB::table('dummy_data5')
            ->select('waktu', 'nilai')
            ->orderBy('waktu', 'desc')
            ->take(12)
            ->get();

        $labels = [];
        $data = [];

        foreach ($data_panel as $item) {
            $labels[] = $item->waktu;
            $data[] = $item->nilai;
        }

        return response()->json(['labels' => $labels, 'data' => $data]);
    }

    public function areaChart6()
    {
        // Replace this with your actual data retrieval logic
        $data_panel = DB::table('dummy_data6')
            ->select('waktu', 'nilai')
            ->orderBy('waktu', 'desc')
            ->take(12)
            ->get();

        $labels = [];
        $data = [];

        foreach ($data_panel as $item) {
            $labels[] = $item->waktu;
            $data[] = $item->nilai;
        }

        return response()->json(['labels' => $labels, 'data' => $data]);
    }
}
