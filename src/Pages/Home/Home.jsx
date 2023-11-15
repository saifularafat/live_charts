import Chart from "../../Components/Chart";
import Sidebar from "../../Components/Sidebar";

const Home = () => {
    return (
        <div className="border h-screen flex items-center justify-center bg-sky-200">
            <div className="border border-solid border-slate-500 rounded-lg w-full h-full sm:w-11/12 sm:h-11/12 md:w-4/5 md:h-5/6 grid grid-cols-6 overflow-hidden">
                <Sidebar />
                <Chart />
            </div>
        </div>
    );
};

export default Home;