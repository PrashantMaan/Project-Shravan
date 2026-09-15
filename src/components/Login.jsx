import React, { useState } from "react";

const Login = ({ onLogin, goToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("child"); // default to 'child'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(role); // Pass selected role
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white relative">
      {/* Background glow */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      <form
        onSubmit={handleSubmit}
        className="bg-stone-900 p-10 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-stone-800 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-stone-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role selector */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Login as:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 bg-stone-800 rounded text-white"
          >
            <option value="child">Child</option>
            <option value="parent">Parent</option>
          </select>
        </div>

        <button type="submit" className="glow-button w-full">
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={goToSignup}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
