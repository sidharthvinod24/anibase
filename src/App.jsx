import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import NotFoundPage from "./pages/NotFoundPage";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<Info indicator={"anime"} />} />
        <Route path="/manga/:id" element={<Info indicator={"manga"} />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <SpeedInsights />
    </div>
  );
}

export default App;
