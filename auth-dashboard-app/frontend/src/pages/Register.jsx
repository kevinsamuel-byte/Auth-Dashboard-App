import { useState } from "react";
import axios from "axios";

const Register = () => {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      alert("Registration successful");

      window.location.href =
        "/login";

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Registration failed"
      );

    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-8">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-6"
        >

          {/* NAME */}
          <div>

            <label className="text-gray-300 text-sm">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full mt-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none"
              required
            />

          </div>

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

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full mt-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none pr-16"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-400"
              >
                {
                  showPassword
                    ? "Hide"
                    : "Show"
                }
              </button>

            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-xl text-lg font-semibold"
          >
            Register
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-400 mt-6">

          Already have an account?{" "}

          <span
            onClick={() =>
              (
                window.location.href =
                "/login"
              )
            }
            className="text-blue-400 cursor-pointer"
          >
            Login
          </span>

        </p>

      </div>

    </div>

  );
};

export default Register;