import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navber = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className="flex items-center justify-between bg-slate-800 py-3 px-3">
            <h3 className="text-xl font-semibold text-white">Live<span className="text-orange-600">Chat</span> </h3>
            <div className="flex items-center gap-1">
                <img src={currentUser?.photoURL} alt="user photo" className="w-9 h-9 object-cover border-[2px] border-orange-600 rounded-full"  title={currentUser?.displayName}/>
                <p className="text-sm font-medium text-white">{currentUser?.displayName}</p>
                <button
                    onClick={() => signOut(auth)}
                    className="py-1 px-2 text-sm bg-gray-700 text-white rounded-lg hover:bg-transparent border-gray-600 border-[2px] hover:border-orange-600 hover:text-orange-600 transition-all duration-200">
                    logout
                </button>
            </div>
        </div>
    );
};

export default Navber;