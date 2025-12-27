import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, addTeam } from "../store/store";
import { LeagueType } from "../types";
interface TeamFormProps {
  league: LeagueType;
  mode?: "modal" | "inline";
  buttonClass?: string;
  containerClass?: string;
  inputClass?: string;
  saveButtonClass?: string;
  labelClass?: string;
}

const TeamForm: React.FC<TeamFormProps> = ({
  league,
  mode = "modal",
  buttonClass = "bg-[#004f30] text-white hover:bg-[#003822] font-mono text-xs uppercase tracking-wider font-bold",
  containerClass = "bg-white p-6 rounded-lg shadow-2xl border-t-4 border-[#004f30]",
  inputClass = "border-gray-300 bg-white text-gray-900 focus:border-[#004f30] focus:ring-[#004f30] font-mono",
  saveButtonClass = "bg-[#004f30] hover:bg-[#003822] text-white font-mono uppercase tracking-widest",
  labelClass = "text-gray-500 font-mono uppercase tracking-wider",
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

  const formContent = (
    <form
      onSubmit={handleSubmit}
      className={
        mode === "inline" ? "flex gap-2 items-end" : "flex flex-col gap-5"
      }
    >
      <div className={mode === "inline" ? "flex-1" : ""}>
        {mode === "modal" && (
          <label className={`block mb-2 text-[10px] font-bold ${labelClass}`}>
            Name
          </label>
        )}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-4 py-3 rounded border outline-none focus:ring-1 transition-all text-sm shadow-sm ${inputClass}`}
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
          className={`py-3 rounded text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            mode === "inline" ? "px-6" : "flex-1"
          } ${saveButtonClass}`}
        >
          {mode === "inline" ? "Add" : "Save"}
        </button>
      </div>
    </form>
  );

  if (mode === "inline") {
    return (
      <div className={containerClass}>
        <h3 className={`text-sm font-bold mb-3 ${labelClass}`}>Add Team</h3>
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
        Add {league === "wimbledon" ? "Player" : "Team"}
      </button>

      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-sm relative ${containerClass}`}>
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
