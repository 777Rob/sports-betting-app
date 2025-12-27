"use client";
import { useState } from "react";
import CleanMinimalLayout from "./components/CleanMinimalLayout";
import Basketball from "./components/icons/BasketballIcon";
import SoccerBall from "./components/icons/SoccerIcon";
import TennisBall from "./components/icons/TennisIcon";
import MatchForm from "./components/MatchForm";
import SportyEnergeticLayout from "./components/SportyEnergeticLayout";
import StandingsTable from "./components/StandingsTable";
import TableCentricLayout from "./components/TableCentricLayout";
import TeamForm from "./components/TeamForm";
import { LeagueType } from "./types";
type Theme = "table-centric" | "clean-minimal" | "sporty-energetic";

function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("table-centric");

  const renderLayout = () => {
    switch (currentTheme) {
      case "table-centric":
        return <TableCentricLayout />;
      case "clean-minimal":
        return <CleanMinimalLayout />;
      case "sporty-energetic":
        return <SportyEnergeticLayout />;
      default:
        return <TableCentricLayout />;
    }
  };

  const getBackgroundClass = () => {
    switch (currentTheme) {
      case "table-centric":
        return "bg-table-bg";
      case "clean-minimal":
        return "bg-clean-bg";
      case "sporty-energetic":
        return "bg-sporty-bg";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div
      className={`min-h-screen w-full p-6 md:p-12 transition-colors duration-500 ${getBackgroundClass()}`}
    >
      {/* Theme Switcher */}
      <div className="max-w-[1400px] mx-auto mb-10 flex justify-center">
        <div className="bg-white/90 backdrop-blur-md p-1 rounded-full border border-gray-200 shadow-sm flex gap-1 sticky top-4 z-50 overflow-hidden">
          <button
            onClick={() => setCurrentTheme("table-centric")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              currentTheme === "table-centric"
                ? "bg-table-green text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Table Centric
          </button>
          <button
            onClick={() => setCurrentTheme("clean-minimal")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              currentTheme === "clean-minimal"
                ? "bg-clean-header text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Clean & Minimal
          </button>
          <button
            onClick={() => setCurrentTheme("sporty-energetic")}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              currentTheme === "sporty-energetic"
                ? "bg-sporty-orange text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Sporty
          </button>
        </div>
      </div>

      {/* Layout Content */}
      <div className="max-w-[1400px] mx-auto">{renderLayout()}</div>
    </div>
  );
}
export default App;
