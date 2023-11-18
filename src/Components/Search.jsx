import { useContext, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase.config";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
    const [error, setError] = useState(false);
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState(null);
    const { currentUser } = useContext(AuthContext)

    const handleSearch = async () => {
        const q = query(collection(db, "users"),
            where("displayName", "==", userName))

        try {

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
                console.log(doc.id, " => ", doc.data());
            });
        } catch (error) {
            setError(true)
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;

        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            if (!res.exists) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                /* user create chats */
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }
        } catch (error) {
            // setError(true)
        }
        setUser(null);
        setUserName("")
    }
    return (
        <div className=" pt-2 border-0 border-b border-solid border-slate-300 bg-slate-700">
            <input type="text"
                onKeyDown={handleKey}
                onChange={(e) => setUserName(e.target.value)}
                name=""
                id=""
                value={userName}
                placeholder="filter a user"
                className=" mx-2 outline-none border-none placeholder:text-slate-400 placeholder:text-base placeholder:caret-fuchsia-50 text-white rounded-md p-1 w-full bg-transparent" />
            {error && <span className="text-sm text-red-500">User not found</span>}
            {user &&
                <div
                    onClick={handleSelect}
                    className="flex items-center gap-1 mt-2 hover:bg-slate-800 py-2 cursor-pointer rounded-lg transition-all duration-200 pl-2">
                    <img src={user.photoURL} alt="photo" className="w-8 h-8 object-cover border-[1px] border-orange-300 rounded-full" />
                    <p className="text-sm font-medium text-white">{user.displayName}</p>
                </div>
            }
        </div>
    );
};

export default Search;