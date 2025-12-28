"use client";
import { useEffect, useState } from "react";
import CleanMinimalLayout from "./components/CleanMinimalLayout";
import SportyEnergeticLayout from "./components/SportyEnergeticLayout";
import TableCentricLayout from "./components/TableCentricLayout";
import {
  useAppDispatch,
  hydrateState,
  resetData,
  resetToDemo,
} from "./store/store";
import { AlertTriangle, RotateCcw, Trash2 } from "lucide-react";
type Theme = "table-centric" | "clean-minimal" | "sporty-energetic";

function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("table-centric");
  const [confirmClear, setConfirmClear] = useState(false);
  const dispatch = useAppDispatch();

  // Load state from localStorage on client mount only
  useEffect(() => {
    try {
      const serializedState = localStorage.getItem("sports-standings-redux");
      if (serializedState) {
        const loadedState = JSON.parse(serializedState);
        dispatch(hydrateState(loadedState));
      }
    } catch (e) {
      console.error("Failed to load state", e);
    }
  }, [dispatch]);

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

  const handleClearData = () => {
    if (confirmClear) {
      dispatch(resetData());
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      // Reset confirmation state after 3 seconds if not clicked again
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  const handleResetToDemo = () => {
    dispatch(resetToDemo());
    setConfirmClear(false);
  };

  return (
    <div
      className={`min-h-screen w-full p-4 md:p-12 transition-colors duration-500 relative flex flex-col ${getBackgroundClass()}`}
    >
      {/* Theme Switcher */}
      <div className="max-w-[1400px] mx-auto mb-6 md:mb-10 flex justify-center pointer-events-none relative z-50 w-full">
        <div className="bg-white/90 backdrop-blur-md p-1 rounded-full border border-gray-200 shadow-sm flex gap-1 sticky top-4 pointer-events-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setCurrentTheme("table-centric")}
            className={`px-3 md:px-5 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              currentTheme === "table-centric"
                ? "bg-table-green text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Table Centric
          </button>
          <button
            onClick={() => setCurrentTheme("clean-minimal")}
            className={`px-3 md:px-5 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              currentTheme === "clean-minimal"
                ? "bg-clean-header text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Clean & Minimal
          </button>
          <button
            onClick={() => setCurrentTheme("sporty-energetic")}
            className={`px-3 md:px-5 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
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
      <div className="max-w-[1400px] mx-auto w-full flex-1">
        {renderLayout()}
      </div>

      {/* Footer Data Controls - Moved to bottom for better mobile UX */}
      <div className="max-w-[1400px] mx-auto w-full mt-12 pb-8 border-t border-black/5 pt-8 flex flex-col md:flex-row justify-center items-center gap-4 opacity-90">
        <div className="flex gap-3">
          <button
            onClick={handleResetToDemo}
            className="bg-white/90 hover:bg-white px-4 py-2.5 rounded-md shadow-sm border border-gray-200 text-xs font-bold text-gray-600 flex items-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Load Demo Data</span>
          </button>

          <button
            onClick={handleClearData}
            className={`px-4 py-2.5 rounded-md shadow-sm border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              confirmClear
                ? "bg-red-600 border-red-700 text-white animate-pulse"
                : "bg-white/90 hover:bg-red-50 border-gray-200 text-red-500"
            }`}
          >
            {confirmClear ? <AlertTriangle size={14} /> : <Trash2 size={14} />}
            <span>{confirmClear ? "Confirm Clear?" : "Clear All"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
