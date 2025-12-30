import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, addTeam, useAppSelector } from "../store/store";
import { LeagueType, Theme } from "../types";
interface TeamFormProps {
  league: LeagueType;
  variant: Theme;
  mode?: "modal" | "inline";
}

interface FormContentProps {
  mode: "modal" | "inline";
  variant: Theme;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  league: LeagueType;
  setIsExpanded: (expanded: boolean) => void;
}

const AddTeamForm: React.FC<FormContentProps> = ({
  mode,
  variant,
  name,
  setName,
  error,
  setError,
  league,
  setIsExpanded,
}) => {
  const dispatch = useAppDispatch();
  const { teams } = useAppSelector((state) => state.app);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim()) {
      const trimmedName = name.trim();

      // Check for duplicates in the current league (case-insensitive)
      const exists = teams.some(
        (t) =>
          t.league === league &&
          t.name.toLowerCase() === trimmedName.toLowerCase()
      );

      if (exists) {
        setError("Name already exists.");
        return;
      }

      dispatch(addTeam({ name: trimmedName, league }));
      setName("");
      if (mode === "modal") setIsExpanded(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        mode === "inline" ? "flex gap-2 items-start" : "flex flex-col gap-5"
      }
    >
      <div className={mode === "inline" ? "flex-1" : ""}>
        {mode === "modal" && (
          <label
            className={
              variant.startsWith("table") ? "label-table" : `label-${variant}`
            }
          >
            Name
          </label>
        )}
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null);
          }}
          className={`input-${variant} ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
              : ""
          }`}
          placeholder={
            league === "wimbledon" ? "e.g. Roger Federer" : "e.g. Team Name"
          }
          autoFocus={mode === "modal"}
        />
        {error && (
          <p className="text-red-500 text-[10px] mt-1.5 font-bold animate-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>

      <div className={mode === "inline" ? "" : "flex gap-3 mt-2"}>
        <button
          type="submit"
          disabled={!name.trim()}
          className={`btn-${variant} ${
            mode === "inline" ? "px-6 h-[46px]" : "flex-1"
          }`}
        >
          {mode === "inline" ? "Add" : "Save"}
        </button>
      </div>
    </form>
  );
};

const TeamForm: React.FC<TeamFormProps> = ({
  league,
  variant,
  mode = "modal",
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  if (mode === "inline") {
    return (
      <div className={variant === "clean-minimal" ? "" : `card-${variant}`}>
        {variant === "clean-minimal" && (
          <h3
            className={
              variant.startsWith("table") ? "label-table" : `label-${variant}`
            }
          >
            Add Team
          </h3>
        )}
        <AddTeamForm
          mode={mode}
          variant={variant}
          name={name}
          setName={setName}
          error={error}
          setIsExpanded={setIsExpanded}
          setError={setError}
          league={league}
        />
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          setIsExpanded(true);
          setError(null);
          setName("");
        }}
        className={`btn-${
          variant === "table-centric" ? "table-centric-green" : variant
        } w-full`}
      >
        <Plus size={16} className="mr-2" />
        Add {league === "wimbledon" ? "Player" : "Team"}
      </button>

      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-sm relative card-${variant}`}>
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
              Add Participant
            </h3>

            <AddTeamForm
              mode={mode}
              variant={variant}
              name={name}
              setName={setName}
              error={error}
              setIsExpanded={setIsExpanded}
              setError={setError}
              league={league}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TeamForm;
