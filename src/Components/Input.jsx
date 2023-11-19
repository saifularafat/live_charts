import { MdKeyboardVoice } from "react-icons/md"
import { GrGallery } from "react-icons/gr"
import { RiVoiceprintLine } from "react-icons/ri"
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase.config";
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";

const Input = () => {
    const [voice, setVoice] = useState(false);

    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    /*TODO:Handle Error */
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
    };
console.log(handleSend);
    return (
        <div className=" py-[10px] px-4 bg-white shadow-2xl sticky bottom-0 z-10">
            <div className="flex items-center">
                <input
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder="Somethings type here.."
                    className="outline-none border-none text-sm text-slate-800 bg-transparent w-full placeholder:text-slate-400 placeholder:text-base"
                />
                <div className="flex items-center gap-2">
                    <button onClick={() => setVoice(!voice)}>
                        {
                            voice ?
                                <RiVoiceprintLine />
                                :
                                <MdKeyboardVoice className=" text-xl cursor-pointer" />
                        }
                    </button>
                    <input 
                    type="file" 
                    name="" 
                    id="file" 
                    onChange={(e) => setImg(e.target.files[0])}
                    className="hidden" />
                    <label htmlFor="file">
                        <GrGallery className=" text-xl cursor-pointer" />
                    </label>
                    <button 
                    onClick={handleSend}
                    className="bg-blue-700 text-sm text-white py-1 px-2 rounded-md">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Input;