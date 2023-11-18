import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase.config";
import { AuthContext } from "../context/AuthContext";

const Charts = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        const getChats = () => {

            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
                console.log("Current data: ", doc.data());
            });
            return () => {
                unsub();
            }
        }
        currentUser.uid && getChats();
    }, [currentUser.uid])

    console.log(Object.entries(chats));

    return (
        <div className=" space-y-2 pt-3 h-[378px] overflow-y-scroll myScroll">
            {
                Object.entries(chats).map((chat) => {
                    <div
                        key={chat[0]}
                        className="flex items-center gap-1 hover:bg-slate-800 py-2 cursor-pointer rounded-lg transition-all duration-200 pl-2">
                        <img src={chat[1].userInfo.photoURL} alt="photo" className="w-10 h-10 object-cover border-[1px] border-orange-300 rounded-full" />
                        <div className="pl-2">
                            <p className="text-sm font-medium text-white leading-none">{chat[1].userInfo.displayName}</p>
                            <span className="text-sm font-light text-slate-300 ">{chat[1].userInfo.lastMessage.text}</span>
                        </div>
                    </div>
                })
            }
            {/* <p className="pt-5 bg-slate-900"></p> */}
        </div>
    );
};

export default Charts;