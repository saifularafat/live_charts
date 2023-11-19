import { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    const [realTimeAndDate, setRealTimeAndDate] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setRealTimeAndDate(new Date());
        }, 100000)
        return () => clearInterval(interval)
    }, [])
    const intervalDate = realTimeAndDate.toLocaleDateString();
    const intervalTime = realTimeAndDate.toLocaleTimeString();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    console.log(messages)
    return (
        <div className="min-h-[calc(84vh-108px)] space-y-4  h-[400px] pb-5 px-3 pt-2 overflow-y-scroll myScrollMain scroll-smooth">
            <div className="text-center pb-1">
                <span className="text-sm font-semibold">{intervalDate} and <span className="text-orange-800">{intervalTime}</span></span>
                <p className="text-base font-semibold">welcome to LiveChart</p>
            </div>

            {messages.map((m) => (
                <Message
                    key={m.id}
                    message={m}
                />
            ))}

        </div>
    );
};

export default Messages;