import { Link } from "react-router-dom";

const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;
        console.log( email, password);
    }
    return (
        <div className="flex items-center justify-center bg-blue-400 h-screen">
            <div className="flex-col items-center space-y-3 bg-white px-10 py-6 rounded-lg">
                <div className="font-serif text-center">
                    <h2 className="text-2xl font-semibold">Live Chart</h2>
                    <p className="text-base font-medium">Login</p>
                </div>
                <form onSubmit={handleSubmit}
                    className="flex-col items-center space-y-4">
                    <input type="email" name="email" id="" placeholder="your email" required className="input_filed lowercase" /><br />
                    <input type="password" name="password" id="" placeholder="*******" required className="font-normal input_filed" /><br />
                    <input type="submit" value="Submit" className="w-full bg-blue-700 rounded-lg py-2 px-3 text-white text-xl font-medium cursor-pointer" />
                </form>
                <p className="text-sm">You don't have an account? <Link to="/register" className="text-sm font-serif font-medium text-blue-800 hover:text-red-800">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;