import Charts from "./Charts";
import Navber from "./Navber";
import Search from "./Search";

const Sidebar = () => {
    return (
        <div className="col-span-2 bg-slate-700">
                <Navber />
                <Search />
                <Charts />
        </div>
    );
};

export default Sidebar;