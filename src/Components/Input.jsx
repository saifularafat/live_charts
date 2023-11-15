import { MdKeyboardVoice } from "react-icons/md"
import { GrGallery } from "react-icons/gr"
import { RiVoiceprintLine } from "react-icons/ri"
import { useState } from "react";
const Input = () => {
    const [voice, setVoice] = useState(false)
    return (
        <div className=" py-[10px] px-4 bg-white shadow-2xl sticky bottom-0 z-10">
            <div className="flex items-center">
                <input type="text" name="" id="" placeholder="Somethings type here.." className="outline-none border-none text-sm text-slate-800 bg-transparent w-full placeholder:text-slate-400 placeholder:text-base" />
                <div className="flex items-center gap-2">
                    <button onClick={() => setVoice(!voice)}>
                        {
                            voice ?
                                <RiVoiceprintLine />
                                :
                                <MdKeyboardVoice className=" text-xl cursor-pointer" />
                        }
                    </button>
                    <input type="file" name="" id="file" className="hidden" />
                    <label htmlFor="file">
                        <GrGallery className=" text-xl cursor-pointer" />
                    </label>
                    <button className="bg-blue-700 text-sm text-white py-1 px-2 rounded-md">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Input;