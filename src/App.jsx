import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Hello Tailwind v4!</h1>
        <a href="#" className="font-medium text-blue-400 hover:text-blue-500 mb-4 inline-block">
          Tailwind Link
        </a>
        <div>
          <button className="rounded-lg border border-transparent px-6 py-2 font-medium bg-gray-800 hover:border-red-400 transition">
            Click Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
