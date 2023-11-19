import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    return (
        <div
            ref={ref}

            className={`flex gap-2 mb-3  ${message?.senderId === currentUser.uid && "owner"}`}>
            <div className="flex-col text-green-400 font-medium">
                <img
                    src={
                        message.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : data.user.photoURL
                    }
                    alt="" className="w-10 h-10 rounded-full object-cover" />
                <p className="text-sm">just now</p>
            </div>
            <div className="max-w-[80%] flex-col gap-2 space-y-1 ownerContent">
                <p className="bg-white max-w-max py-2 px-3 rounded-tr-lg rounded-br-lg rounded-bl-xl mt-2 text-sm font-normal">{message?.text}</p>
                {message.img && <img src={message?.img} alt="" className="w-4/5"/>}
            </div>

        </div>
    );
};

export default Message;