import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("creatorUser"));

    if (!user) {
      alert("No account found. Please register first.");
      return;
    }

    if (email === user.email && password === user.password) {
      alert("Login Successful");

      localStorage.setItem("isLoggedIn", "true");

      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 flex justify-center items-center">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-xl p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border rounded-xl p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-4 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>

          </div>

          <div className="flex justify-between text-sm">

            <label>
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-blue-600"
            >
              Forgot Password?
            </button>

          </div>

          <button
            className="w-full bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-xl"
          >
            Login
          </button>

          <p className="text-center mt-5">

            Don't have an account?

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-600 ml-2"
            >
              Register
            </button>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;