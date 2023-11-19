import { BsCameraVideoFill, BsCameraVideoOffFill } from "react-icons/bs"
import { IoMdPersonAdd } from "react-icons/io"
import { FaUsers } from "react-icons/fa"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { useContext, useState } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chart = () => {
    const [videoCamera, setVideoCamera] = useState(false);
    const [addUsers, setAddUsers] = useState(false);
    const [menuBar, setMenuBar] = useState(false);

    const { data } = useContext(ChatContext);
    console.log(data);

    return (
        <div className="col-span-4 bg-slate-200 ">
            {/* Header section start*/}
            <div className="flex items-center justify-between py-[10px] px-4 bg-slate-500 sticky top-0 z-10">
                <div>
                    <h2 className="text-xl font-medium text-white leading-none">{data.user?.displayName}</h2>
                    <div className="flex items-center gap-1">
                        <span className="bg-green-500 h-2 w-2 rounded-full"></span>
                        <span className="text-sm text-green-600">Active</span>
                    </div>
                </div>
                <div className="flex items-center gap-5 relative">
                    <button onClick={() => setVideoCamera(!videoCamera)}>
                        {
                            videoCamera ?
                                <BsCameraVideoOffFill className="text-2xl text-white" />
                                :
                                <BsCameraVideoFill className="text-2xl text-white" />
                        }
                    </button>
                    <button onClick={() => setAddUsers(!addUsers)}>
                        {
                            addUsers ?
                                <FaUsers className="text-2xl text-white" />
                                :
                                <IoMdPersonAdd className="text-2xl text-white" />
                        }
                    </button>
                    <button onClick={() => setMenuBar(!menuBar)}>
                        <HiOutlineDotsVertical className="text-2xl text-white" />
                        {
                            menuBar &&
                            <div className="absolute top-10 right-3 bg-slate-100 rounded-md overflow-hidden">
                                <button className="hover:bg-slate-300 py-1 px-3 w-full">Refresh</button>
                                <button className="hover:bg-slate-300 py-1 w-full ">Setting</button>
                                <button className="hover:bg-slate-300 py-1 w-full ">Block</button>
                            </div>
                        }
                    </button>
                </div>
            </div>
            {/* Header section end*/}
            <Messages />
            <Input />
        </div>
    );
};

export default Chart;