import DataCard from "@/components/DataCard";

export default function HomePage(){
    return(
        <div>
            <DataCard
                title="Saldo"
                date="01 - 30 Sept"
                nominal={50000}
                keterangan="-43% dari bulan sebelumnya"
            />
        </div>
    )
}