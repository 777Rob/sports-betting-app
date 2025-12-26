import { Plus, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector, addMatch } from "../store/store";
import { LeagueType } from "../types";

interface MatchFormProps {
  league: LeagueType;
}

const MatchForm: React.FC<MatchFormProps> = ({ league }) => {
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
    setIsExpanded(false);
  };

  return (
    <>
      <button
        onClick={() => setIsExpanded(true)}
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-md shadow-sm transition-all duration-200 bg-[#582c83] text-white hover:bg-[#401a6b] font-mono text-xs uppercase tracking-wider font-bold w-full"
      >
        <Plus size={16} />
        Add Score
      </button>

      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-2xl relative border-t-4 border-[#582c83]">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg mb-6 font-bold text-[#582c83] font-mono uppercase tracking-wider">
              Record Score
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded text-center font-bold font-mono">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase font-mono tracking-wider">
                    Home
                  </label>
                  <select
                    value={homeId}
                    onChange={(e) => setHomeId(e.target.value)}
                    className="w-full px-3 py-3 rounded border border-gray-300 bg-white text-gray-900 text-sm outline-none focus:border-[#582c83] focus:ring-1 focus:ring-[#582c83] font-mono shadow-sm appearance-none"
                    style={{ backgroundImage: "none" }} // Ensure no conflict with browser styles
                  >
                    <option value="" className="text-gray-500">
                      Select...
                    </option>
                    {leagueTeams.map((t) => (
                      <option key={t.id} value={t.id} className="text-gray-900">
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase font-mono tracking-wider">
                    Away
                  </label>
                  <select
                    value={awayId}
                    onChange={(e) => setAwayId(e.target.value)}
                    className="w-full px-3 py-3 rounded border border-gray-300 bg-white text-gray-900 text-sm outline-none focus:border-[#582c83] focus:ring-1 focus:ring-[#582c83] font-mono shadow-sm appearance-none"
                    style={{ backgroundImage: "none" }}
                  >
                    <option value="" className="text-gray-500">
                      Select...
                    </option>
                    {leagueTeams
                      .filter((t) => t.id !== homeId)
                      .map((t) => (
                        <option
                          key={t.id}
                          value={t.id}
                          className="text-gray-900"
                        >
                          {t.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 py-2">
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={homeScore}
                    onChange={(e) => setHomeScore(e.target.value)}
                    className="w-full text-center py-3 rounded border border-gray-300 bg-white text-gray-900 font-bold text-2xl outline-none focus:border-[#582c83] focus:ring-1 focus:ring-[#582c83] font-mono shadow-inner"
                  />
                </div>
                <span className="font-bold text-gray-300 text-xl">-</span>
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={awayScore}
                    onChange={(e) => setAwayScore(e.target.value)}
                    className="w-full text-center py-3 rounded border border-gray-300 bg-white text-gray-900 font-bold text-2xl outline-none focus:border-[#582c83] focus:ring-1 focus:ring-[#582c83] font-mono shadow-inner"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  disabled={!homeId || !awayId || homeScore === ""}
                  className="flex-1 py-3 rounded text-sm font-bold text-white bg-[#582c83] hover:bg-[#401a6b] transition-colors font-mono uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MatchForm;
