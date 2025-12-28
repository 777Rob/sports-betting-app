import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, addTeam } from "../store/store";
import { LeagueType, ThemeVariant } from "../types";
interface TeamFormProps {
  league: LeagueType;
  variant: ThemeVariant;
  mode?: "modal" | "inline";
}

const TeamForm: React.FC<TeamFormProps> = ({
  league,
  variant,
  mode = "modal",
}) => {
  const [name, setName] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addTeam({ name: name.trim(), league }));
      setName("");
      if (mode === "modal") setIsExpanded(false);
    }
  };

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

  const formContent = (
    <form
      onSubmit={handleSubmit}
      className={
        mode === "inline" ? "flex gap-2 items-end" : "flex flex-col gap-5"
      }
    >
      <div className={mode === "inline" ? "flex-1" : ""}>
        {mode === "modal" && <label className={styles.label}>Name</label>}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder={
            league === "wimbledon" ? "e.g. Roger Federer" : "e.g. Team Name"
          }
          autoFocus={mode === "modal"}
        />
      </div>

      <div className={mode === "inline" ? "" : "flex gap-3 mt-2"}>
        <button
          type="submit"
          disabled={!name.trim()}
          className={`${styles.btn} ${mode === "inline" ? "px-6" : "flex-1"}`}
        >
          {mode === "inline" ? "Add" : "Save"}
        </button>
      </div>
    </form>
  );

  if (mode === "inline") {
    return (
      <div className={variant === "clean" ? "" : styles.card}>
        {variant === "clean" && <h3 className={styles.label}>Add Team</h3>}
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
        Add {league === "wimbledon" ? "Player" : "Team"}
      </button>

      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-sm relative ${styles.card}`}>
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
              Add Participant
            </h3>

            {formContent}
          </div>
        </div>
      )}
    </>
  );
};

export default TeamForm;
