
const Message = () => {
    return (
        <div className="flex gap-2 mb-3 owner">
            <div className="flex-col text-green-400 font-medium">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLQUXqMrzrmkxd3QpxGL5bzgxELsztrL1AgQ&usqp=CAU"
                    alt="" className="w-10 h-10 rounded-full object-cover" />
                <p className="text-sm">just now</p>
            </div>
            <div className="max-w-[80%] flex-col gap-2 space-y-1 ownerContent">
                <p className="bg-white max-w-max py-2 px-3 rounded-tr-lg rounded-br-lg rounded-bl-xl mt-2 text-sm font-normal">Hello Brother</p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLQUXqMrzrmkxd3QpxGL5bzgxELsztrL1AgQ&usqp=CAU" alt="" className="w-4/5"/>
            </div>

        </div>
    );
};

export default Message;