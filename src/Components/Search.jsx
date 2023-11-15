
const Search = () => {
    return (
        <div className=" pt-2 border-0 border-b border-solid border-slate-300 bg-slate-700">
            <input type="text" name="" id="" placeholder="filter a user" className=" mx-2 outline-none border-none placeholder:text-slate-400 placeholder:text-base placeholder:caret-fuchsia-50 text-white rounded-md p-1 w-full bg-transparent" />
            <div className="flex items-center gap-1 hover:bg-slate-800 py-2 cursor-pointer rounded-lg transition-all duration-200 pl-2">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLQUXqMrzrmkxd3QpxGL5bzgxELsztrL1AgQ&usqp=CAU" alt="photo" className="w-8 h-8 object-cover border-[1px] border-orange-300 rounded-full" />
                <p className="text-sm font-medium text-white">Tim Shoutay</p>
            </div>
        </div>
    );
};

export default Search;