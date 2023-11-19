import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase.config";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Charts = () => {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user });
    };

    return (
        <div className=" space-y-2 pt-3 h-[378px] overflow-y-scroll myScroll">
            {
                Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                    <div
                        key={chat[0]}
                        onClick={() => handleSelect(chat?.userInfo)}
                        className="flex items-center gap-1 hover:bg-slate-800 py-2 cursor-pointer rounded-lg transition-all duration-200 pl-2">
                        <img src={chat[1].userInfo.photoURL} alt="photo" className="w-10 h-10 object-cover border-[1px] border-orange-300 rounded-full" />
                        <div className="pl-2">
                            <p className="text-sm font-medium text-white leading-none">{chat[1].userInfo.displayName}</p>
                            <span className="text-sm font-light text-slate-300 ">{chat[1].userInfo.lastMessage.text}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Charts;