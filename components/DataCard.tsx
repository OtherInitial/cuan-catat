type Props = {
    title: string,
    date: string,
    nominal: number,
    keterangan: string 
}

export default function DataCard({
    title, 
    date, 
    nominal, 
    keterangan
}: Props){
    return(
        <div className="bg-white shadow-xl rounded-xl p-5 absolute -mt-12 left-9 right-9">
            <p className="text-lg">{title}</p>
            <p className="">{date}</p>
            <p className="text-xl">Rp {nominal}</p>
            <p className="text-md">{keterangan}</p>
        </div>
    )
}