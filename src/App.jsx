import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { Projects } from "./components/Projects";
import { Workout } from "./components/Workout";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Community from "./components/Community";
import ParentDashboard from "./components/ParentDashboard";
import ChatBot from "./components/Chatbot"; // ✅ Chatbot imported

const App = () => {
  const [step, setStep] = useState("landing"); // 'landing', 'login', 'signup', 'main'
  const [role, setRole] = useState(""); // 'parent' or 'child'

  const handleRoleSelection = () => setStep("login");

  const handleLoginSuccess = (userRole) => {
    setRole(userRole);
    setStep("main");
  };

  const handleSignupSuccess = (userRole) => {
    setRole(userRole);
    setStep("main");
  };

  if (step === "landing") {
    return <LandingPage onSelect={handleRoleSelection} />;
  }

  if (step === "login") {
    return (
      <Login
        onLogin={handleLoginSuccess}
        goToSignup={() => setStep("signup")}
      />
    );
  }

  if (step === "signup") {
    return (
      <Signup
        onSignup={handleSignupSuccess}
        goToLogin={() => setStep("login")}
      />
    );
  }

  return (
    <Router>
      <div className="overflow-x-hidden text-stone-300">
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </div>
        <div className="container mx-auto px-8">
          {role !== "parent" && <Navbar />}

          <Routes>
            {/* Redirect to proper dashboard based on role */}
            <Route path="/" element={<Navigate to={role === "parent" ? "/dashboard" : "/hero"} />} />

            {/* Routes for all users */}
            {role !== "parent" && (
              <>
                <Route path="/hero" element={<Hero />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/workout" element={<Workout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/community" element={<Community />} />
              </>
            )}

            {/* Parent-only route */}
            {role === "parent" && (
              <Route path="/dashboard" element={<ParentDashboard />} />
            )}
          </Routes>

          {/* ✅ ChatBot component appears for non-parent users */}
          {role !== "parent" && <ChatBot />}
        </div>
      </div>
    </Router>
  );
};

export default App;
