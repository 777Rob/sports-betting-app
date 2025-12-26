import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, addTeam } from "../store/store";
import { LeagueType } from "../types";

interface TeamFormProps {
  league: LeagueType;
}

const TeamForm: React.FC<TeamFormProps> = ({ league }) => {
  const [name, setName] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addTeam({ name: name.trim(), league }));
      setName("");
      setIsExpanded(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsExpanded(true)}
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-md shadow-sm transition-all duration-200 bg-[#004f30] text-white hover:bg-[#003822] font-mono text-xs uppercase tracking-wider font-bold w-full"
      >
        <Plus size={16} />
        Add {league === "wimbledon" ? "Player" : "Team"}
      </button>

      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-2xl relative border-t-4 border-[#004f30]">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg mb-6 font-bold text-[#004f30] font-mono uppercase tracking-wider">
              Add Participant
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block mb-2 text-[10px] font-bold text-gray-500 uppercase font-mono tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded border border-gray-300 bg-white text-gray-900 outline-none focus:border-[#004f30] focus:ring-1 focus:ring-[#004f30] transition-all font-mono text-sm shadow-sm"
                  placeholder={
                    league === "wimbledon"
                      ? "e.g. Roger Federer"
                      : "e.g. Team Name"
                  }
                  autoFocus
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="flex-1 py-3 rounded text-sm font-bold text-white bg-[#004f30] hover:bg-[#003822] transition-colors font-mono uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamForm;
