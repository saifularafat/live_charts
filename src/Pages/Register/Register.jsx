import { Link } from "react-router-dom";

const Register = () => {

    const handleSubmit =(e) => {
        e.preventDefault();
        const form = e.target
        const displayName = form.displayName.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoUrl = form.photoUrl.value;
        console.log(displayName, email, password, photoUrl);
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
                <p className="text-sm">You do have an account? <Link to="/login" className="text-sm font-serif font-medium text-blue-800 hover:text-red-800">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;