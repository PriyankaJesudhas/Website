// ─── src/App.jsx (router-aware shell only) ───────────────────────────
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./index.css";

/* ── shared assets ─────────────────────────────────────────────────── */
import logo    from "./assets/AVTEKS_logo_white_bg.png";
import bgimage from "./assets/bg_img.png";   // warm‑gradient texture

/* ── page components (already created under src/pages/) ───────────── */
/*import Home         from "./pages/Home";
import About        from "./pages/About";
import Technologies from "./pages/Technologies";
import Contact      from "./pages/Contact";

/* ── lightweight splash ───────────────────────────────────────────── */
function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white space-y-4">
      <img src={logo} alt="AVTEKS logo" className="w-32 h-32 object-contain" />
      <p className="text-lg font-medium tracking-wide text-center">One Stop For Your Technological Needs</p>
      <div className="w-8 h-8 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin" />
    </div>
  );
}

/* ── main shell: header + route outlet ────────────────────────────── */
function Shell() {
  return (
    <div
      className="relative min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      {/* subtle dark veil */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* ── sticky header / nav bar ───────────────────────────── */}
        <header className="sticky top-0 z-50 bg-[#1b0d18]/70 backdrop-blur text-white border-b border-[#ff4c5a]/40">
          <div className="flex flex-col items-center pt-4">
            <img src={logo} alt="AVTEKS" className="w-20 h-20 object-contain" />
            <p className="text-sm mb-2 text-[#ffb6a0]">One Stop For Your Technological Needs</p>
          </div>

          <nav>
            <ul className="flex justify-center gap-8 py-2 text-sm font-semibold">
              {[
                { to: "/",             label: "Home",          end: true },
                { to: "/about",        label: "About" },
                { to: "/technologies", label: "Technologies" },
                { to: "/contact",      label: "Contact" },
              ].map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      isActive ? "text-[#ffb6a0]" : "hover:text-[#ffb6a0]"
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* ── routed pages ─────────────────────────────────────── */}
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/about"        element={<About />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/contact"      element={<Contact />} />
          <Route path="*"             element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

/* ── root component with splash timer ─────────────────────────────── */
export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);
  return ready ? <Shell /> : <Loader />;
}
