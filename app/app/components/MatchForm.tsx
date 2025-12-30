import { Plus, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector, addMatch } from "../store/store";
import { LeagueType, ThemeVariant } from "../types";

interface MatchFormProps {
  league: LeagueType;
  variant: ThemeVariant;
  mode?: "modal" | "inline";
}

const MatchForm: React.FC<MatchFormProps> = ({
  league,
  variant,
  mode = "modal",
}) => {
  const dispatch = useAppDispatch();
  const { teams, matches } = useAppSelector((state) => state.app);

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

  const getVariantClasses = () => {
    switch (variant) {
      case "table-green":
        return {
          btn: "btn-table-green",
          input: "input-table-green",
          card: "card-table-green",
          label: "label-table",
        };
      case "table-purple":
        return {
          btn: "btn-table-purple",
          input: "input-table-purple",
          card: "card-table-purple",
          label: "label-table",
        };
      case "clean":
        return {
          btn: "btn-clean",
          input: "input-clean",
          card: "card-clean",
          label: "label-clean",
        };
      case "sporty":
        return {
          btn: "btn-sporty",
          input: "input-sporty",
          card: "card-sporty",
          label: "label-sporty",
        };
      default:
        return {
          btn: "btn-table-green",
          input: "input-table-green",
          card: "card-table-green",
          label: "label-table",
        };
    }
  };

  const styles = getVariantClasses();

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

      {/* Team Selection Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          {mode === "modal" && <label className={styles.label}>Home</label>}
          <select
            value={homeId}
            onChange={(e) => setHomeId(e.target.value)}
            className={`${styles.input}`}
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
          {mode === "modal" && <label className={styles.label}>Away</label>}
          <select
            value={awayId}
            onChange={(e) => setAwayId(e.target.value)}
            className={`${styles.input}`}
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
            className={`${styles.input} text-center font-bold text-lg`}
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
            className={`${styles.input} text-center font-bold text-lg`}
          />
        </div>
      </div>

      <div className={mode === "inline" ? "mt-1" : "flex gap-3 mt-4"}>
        <button
          type="submit"
          disabled={!homeId || !awayId || homeScore === ""}
          className={`${styles.btn} w-full`}
        >
          Add Score
        </button>
      </div>
    </form>
  );

  if (mode === "inline") {
    return (
      <div className={variant === "clean" ? "" : styles.card}>
        {variant === "clean" && <h3 className={styles.label}>Add Score</h3>}
        {formContent}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsExpanded(true)}
        className={`${styles.btn} w-full`}
      >
        <Plus size={16} className="mr-2" />
        Add Score
      </button>

      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-md relative ${styles.card}`}>
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
                  : styles.label
              }`}
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
