import Link from "next/link"

export default function SettingPage (){
    const listSetting = [
        {
            title: "Profil",
            link: "/profil"
        },
        {
            title: "Daftar Produk",
            link: "/daftar-produk"
        },
        {
            title: "Kalkulator HPP",
            link: "/kalkulator-hpp"
        },
        {
            title: "Penyimpanan Data",
            link: "/penyimpanan-data"
        }
    ]


    return(
        <div className="p-8">
            <h1 className="font-semibold text-2xl mb-4">
                Pengaturan
            </h1>

            <div className="grid grid-cols-1 gap-2">
                {
                    listSetting.map((val, idx) => (
                        <div key={idx} className="rounded-lg p-6 shadow-lg hover:scale-100">
                            <Link 
                            href={val.link}
                            className="w-full font-medium"
                            >
                                {val.title}
                            </Link>
                            
                        </div>
                    ))
                }
            </div>

            
        </div>
    )
}