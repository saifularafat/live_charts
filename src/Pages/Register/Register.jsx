import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase.config";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import { useState } from "react";
const Register = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const form = e.target
        const displayName = form.displayName.value;
        const email = form.email.value;
        const password = form.password.value;
        const file = form.photoUrl.file;

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(

                (error) => {
                    setError(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName, 
                            email,
                            password, 
                            photoURL: downloadURL,
                        })
                    });

                }
            );
        } catch (error) {
            setError(true)
            setLoading(false)
        }
        // .then((userCredential) => {
        //     // Signed up 
        //     const user = userCredential.user;
        //     // ...
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // ..
        // });
    }
    return (
        <div className="flex items-center justify-center bg-blue-400 h-screen">
            <div className="flex-col items-center space-y-3 bg-white px-10 py-6 rounded-lg">
                <div className="font-serif text-center">
                    <h2 className="text-2xl font-semibold">Live Chart</h2>
                    <p className="text-base font-medium">Register</p>
                </div>
                <form onSubmit={handleSubmit}
                    className="flex-col items-center space-y-4">
                    <input type="text" name="displayName" id="" placeholder="display your name" required className="input_filed capitalize" /> <br />
                    <input type="email" name="email" id="" placeholder="your email" required className="input_filed lowercase" /><br />
                    <input type="password" name="password" id="" placeholder="*******" required className="font-normal input_filed" /><br />
                    <input type="file" name="photoUrl" id="file" placeholder="" className="hidden" />
                    <label htmlFor="file" name="photoUrl" required className="flex items-center cursor-pointer">
                        <img src="" alt="img" />
                        <span className="text-slate-500">+Avatar</span>
                    </label>
                    <input type="submit" value="Submit" className="w-full bg-blue-700 rounded-lg py-2 px-3 text-white text-xl font-medium cursor-pointer" />
                </form>
                {loading && <span className="text-blue-600 ">Loading..</span>}
                {error && <span className="text-red-600 ">something is error..</span>}
                <p className="text-sm">You do have an account? <Link to="/login" className="text-sm font-serif font-medium text-blue-800 hover:text-red-800">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;