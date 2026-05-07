import { useState } from "react";
import axios from "axios";

const Login = () => {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      // REDIRECT
      window.location.href =
        "/dashboard";

    } catch (err) {

      console.log(err);

      alert("Invalid credentials");

    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-8">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* EMAIL */}
          <div>

            <label className="text-gray-300 text-sm">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full mt-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none"
              required
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="text-gray-300 text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full mt-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none"
              required
            />

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl text-lg font-semibold"
          >
            Login
          </button>

        </form>

        {/* REGISTER LINK */}
        <p className="text-center text-gray-400 mt-6">

          Don’t have an account?{" "}

          <span
            onClick={() =>
              (window.location.href = "/register")
            }
            className="text-blue-400 cursor-pointer"
          >
            Register
          </span>

        </p>

      </div>
    </div>
  );
};

export default Login;