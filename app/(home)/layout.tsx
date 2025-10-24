import { Navbar } from "@/components/Navbar";
import { Status } from "../../components/Status";
import DataCard from "../../components/DataCard";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return(
        <main className="bg-white relative">
            <Navbar/>
            <Status 
              status="Aman"
            />
            {children}
        </main>
    )
}