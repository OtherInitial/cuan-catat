import { NextResponse } from "next/server";

async function getCategoriesFromDB() {
    return [
        { id: "c_1", name: "Gaji" },
        { id: "c_2", name: "Makanan" },
        { id: "c_3", name: "Transportasi" },
    ];
}

export async function GET() {
    try {
        const categories = await getCategoriesFromDB();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: "Gagal mengambil kategori" }, { status: 500 });
    }
}