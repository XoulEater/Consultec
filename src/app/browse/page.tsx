import { Searchbar } from "../components/Searchbar";
import { Table } from "../components/Table";



export default function Home() {
    return (
        <div className=" flex flex-col gap-6">
            <Searchbar />
            <hr className="border-t border-[#E8E8E8]" />
            <Table />
        </div>
    );   
        
}
