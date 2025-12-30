import { Plus, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector, addMatch } from "../store/store";
import { LeagueType, Team, Theme } from "../types";
import { checkMatchExists } from "../utils/utils";

interface FormContentProps {
  mode: string;
  variant: string;
  league: LeagueType;
  setIsExpanded: (expanded: boolean) => void;
}

const FormContent: React.FC<FormContentProps> = ({
  mode,
  variant,
  league,
  setIsExpanded,
}) => {
  const dispatch = useAppDispatch();
  const { teams, matches } = useAppSelector((state) => state.app);

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

    const matchExists = checkMatchExists(matches, league, homeId, awayId);

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-2 rounded text-center font-bold">
          {error}
        </div>
      )}

      {/* Team Selection Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          {mode === "modal" && (
            <label className={`label-${variant}`}>Home</label>
          )}
          <select
            value={homeId}
            onChange={(e) => setHomeId(e.target.value)}
            className={`input-${variant}`}
          >
            <option value="" className="text-gray-500">
              Select
            </option>
            {leagueTeams.map((t) => (
              <option
                key={t.id}
                value={t.id}
                className="bg-inherit text-inherit"
              >
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          {mode === "modal" && (
            <label className={`label-${variant}`}>Away</label>
          )}
          <select
            value={awayId}
            onChange={(e) => setAwayId(e.target.value)}
            className={`input-${variant}`}
          >
            <option value="" className="text-gray-500">
              Select
            </option>
            {leagueTeams
              .filter((t) => t.id !== homeId)
              .map((t) => (
                <option
                  key={t.id}
                  value={t.id}
                  className="bg-inherit text-inherit"
                >
                  {t.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Score Inputs Row */}
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
            placeholder="0"
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            className={`input-${variant} text-center font-bold text-lg`}
          />
        </div>
        {mode === "modal" && (
          <span className="font-bold text-gray-300 text-xl">-</span>
        )}
        <div className="flex-1">
          <input
            type="number"
            min="0"
            placeholder="0"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            className={`input-${variant} text-center font-bold text-lg`}
          />
        </div>
      </div>

      <div className={mode === "inline" ? "mt-1" : "flex gap-3 mt-4"}>
        <button
          type="submit"
          disabled={!homeId || !awayId || homeScore === ""}
          className={`btn-${variant} w-full`}
        >
          Add Score
        </button>
      </div>
    </form>
  );
};

interface MatchFormProps {
  league: LeagueType;
  variant: Theme;
  mode?: "modal" | "inline";
}

const MatchForm: React.FC<MatchFormProps> = ({
  league,
  variant,
  mode = "modal",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (mode === "inline") {
    return (
      <div className={variant === "clean-minimal" ? "" : `card-${variant}`}>
        {variant === "clean-minimal" && (
          <h3 className={`label-${variant}`}>Add Score</h3>
        )}
        <FormContent
          league={league}
          variant={variant}
          mode={mode}
          setIsExpanded={setIsExpanded}
        />
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsExpanded(true)}
        className={`btn-${variant} w-full`}
      >
        <Plus size={16} className="mr-2" />
        Add Score
      </button>

      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-md relative card-${variant}`}>
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
            <h3
              className={`text-lg mb-6 font-bold ${
                variant.startsWith("table")
                  ? "text-gray-500 font-mono uppercase tracking-wider"
                  : `label-${variant}`
              }`}
            >
              Record Score
            </h3>
            <FormContent
              league={league}
              variant={variant}
              mode={mode}
              setIsExpanded={setIsExpanded}
            />{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default MatchForm;
