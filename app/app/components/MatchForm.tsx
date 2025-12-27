import { Plus, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector, addMatch } from "../store/store";
import { LeagueType } from "../types";

interface MatchFormProps {
  league: LeagueType;
  mode?: "modal" | "inline";
  buttonClass?: string;
  containerClass?: string;
  inputClass?: string;
  saveButtonClass?: string;
  labelClass?: string;
}

const MatchForm: React.FC<MatchFormProps> = ({
  league,
  mode = "modal",
  buttonClass = "bg-[#582c83] text-white hover:bg-[#401a6b] font-mono text-xs uppercase tracking-wider font-bold",
  containerClass = "bg-white p-6 rounded-lg shadow-2xl border-t-4 border-[#582c83]",
  inputClass = "border-gray-300 bg-white text-gray-900 focus:border-[#582c83] focus:ring-[#582c83] font-mono",
  saveButtonClass = "bg-[#582c83] hover:bg-[#401a6b] text-white font-mono uppercase tracking-widest",
  labelClass = "text-gray-500 font-mono uppercase tracking-wider",
}) => {
  const dispatch = useAppDispatch();
  const teams = useAppSelector((state) => state.app.teams);
  const matches = useAppSelector((state) => state.app.matches);

  const [isExpanded, setIsExpanded] = useState(false);

  const [homeId, setHomeId] = useState("");
  const [awayId, setAwayId] = useState("");
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [error, setError] = useState<string | null>(null);

  const leagueTeams = useMemo(
    () => teams.filter((t) => t.league === league),
    [teams, league]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!homeId || !awayId || homeScore === "" || awayScore === "") {
      setError("All fields are required.");
      return;
    }

    if (homeId === awayId) {
      setError("Participants must be different.");
      return;
    }

    const matchExists = matches.some(
      (m) =>
        m.league === league &&
        ((m.homeTeamId === homeId && m.awayTeamId === awayId) ||
          (m.homeTeamId === awayId && m.awayTeamId === homeId))
    );

    if (matchExists) {
      setError("Match already recorded.");
      return;
    }

    dispatch(
      addMatch({
        homeTeamId: homeId,
        awayTeamId: awayId,
        homeScore: parseInt(homeScore),
        awayScore: parseInt(awayScore),
        league,
      })
    );

    setAwayId("");
    setHomeScore("");
    setAwayScore("");
    setHomeId("");
    setError(null);
    if (mode === "modal") setIsExpanded(false);
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-2 rounded text-center font-bold">
          {error}
        </div>
      )}

      <div
        className={
          mode === "inline" ? "flex flex-col gap-2" : "grid grid-cols-2 gap-4"
        }
      >
        <div
          className={mode === "inline" ? "grid grid-cols-2 gap-2" : "space-y-1"}
        >
          <div className="space-y-1">
            {mode === "modal" && (
              <label className={`text-[10px] font-bold ${labelClass}`}>
                Home
              </label>
            )}
            <select
              value={homeId}
              onChange={(e) => setHomeId(e.target.value)}
              className={`w-full px-3 py-2 rounded border text-sm outline-none focus:ring-1 shadow-sm appearance-none ${inputClass}`}
              style={{ backgroundImage: "none" }}
            >
              <option value="" className="text-gray-500">
                Home Team
              </option>
              {leagueTeams.map((t) => (
                <option key={t.id} value={t.id} className="text-gray-900">
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            {mode === "modal" && (
              <label className={`text-[10px] font-bold ${labelClass}`}>
                Away
              </label>
            )}
            <select
              value={awayId}
              onChange={(e) => setAwayId(e.target.value)}
              className={`w-full px-3 py-2 rounded border text-sm outline-none focus:ring-1 shadow-sm appearance-none ${inputClass}`}
              style={{ backgroundImage: "none" }}
            >
              <option value="" className="text-gray-500">
                Away Team
              </option>
              {leagueTeams
                .filter((t) => t.id !== homeId)
                .map((t) => (
                  <option key={t.id} value={t.id} className="text-gray-900">
                    {t.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div
        className={
          mode === "inline"
            ? "grid grid-cols-2 gap-2"
            : "flex items-center gap-4 py-2"
        }
      >
        <div className="flex-1">
          <input
            type="number"
            min="0"
            placeholder="Home Score"
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            className={`w-full text-center py-2 rounded border font-bold text-lg outline-none focus:ring-1 shadow-inner ${inputClass}`}
          />
        </div>
        {mode === "modal" && (
          <span className="font-bold text-gray-300 text-xl">-</span>
        )}
        <div className="flex-1">
          <input
            type="number"
            min="0"
            placeholder="Away Score"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            className={`w-full text-center py-2 rounded border font-bold text-lg outline-none focus:ring-1 shadow-inner ${inputClass}`}
          />
        </div>
      </div>

      <div className={mode === "inline" ? "mt-1" : "flex gap-3 mt-4"}>
        <button
          type="submit"
          disabled={!homeId || !awayId || homeScore === ""}
          className={`w-full py-3 rounded text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${saveButtonClass}`}
        >
          Add Score
        </button>
      </div>
    </form>
  );

  if (mode === "inline") {
    return (
      <div className={containerClass}>
        <h3 className={`text-sm font-bold mb-3 ${labelClass}`}>Add Score</h3>
        {formContent}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsExpanded(true)}
        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md shadow-sm transition-all duration-200 w-full ${buttonClass}`}
      >
        <Plus size={16} />
        Add Score
      </button>

      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-md relative ${containerClass}`}>
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X size={20} />
            </button>

            <h3
              className={`text-lg mb-6 font-bold ${labelClass.replace(
                "text-[10px]",
                ""
              )}`}
            >
              Record Score
            </h3>

            {formContent}
          </div>
        </div>
      )}
    </>
  );
};

export default MatchForm;
