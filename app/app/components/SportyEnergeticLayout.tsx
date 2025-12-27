import { Trophy, Flame } from "lucide-react";
import { Activity } from "react";
import { LeagueType } from "../types";
import MatchForm from "./MatchForm";
import MatchList from "./MatchList";
import StandingsTable from "./StandingsTable";
import TeamForm from "./TeamForm";

interface LeagueCardProps {
  league: LeagueType;
  title: string;
  icon: React.ReactNode;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league, title, icon }) => {
  return (
    <div className="bg-[#011613] rounded-lg shadow-2xl overflow-hidden flex flex-col w-full h-full border border-gray-800">
      {/* Header */}
      <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-800">
        <div className="text-white">{icon}</div>
        <h2 className="text-2xl font-header tracking-wider text-white uppercase">
          {title}
        </h2>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-8">
        {/* Col 1: Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <TeamForm
            league={league}
            buttonClass="bg-[#fe6800] text-white hover:bg-orange-600 font-header text-lg uppercase tracking-wider py-2"
            containerClass="bg-gray-900 border border-gray-700 text-white"
            labelClass="text-euro-orange font-header"
            inputClass="bg-gray-800 border-gray-700 text-white focus:border-euro-orange"
            saveButtonClass="bg-[#fe6800] hover:bg-orange-600 text-white font-header"
          />
          <MatchForm
            league={league}
            buttonClass="bg-[#fe6800] text-white hover:bg-orange-600 font-header text-lg uppercase tracking-wider py-2"
            containerClass="bg-gray-900 border border-gray-700 text-white"
            labelClass="text-euro-orange font-header"
            inputClass="bg-gray-800 border-gray-700 text-white focus:border-euro-orange"
            saveButtonClass="bg-[#fe6800] hover:bg-orange-600 text-white font-header"
          />
        </div>

        {/* Col 2: Match Results */}
        <div>
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-3">
            Recent Matches
          </h3>
          <MatchList league={league} />
        </div>

        {/* Col 3: Score Table */}
        <div className="flex-1">
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-3">
            Score Table:
          </h3>
          <StandingsTable league={league} variant="sporty" />
        </div>
      </div>
    </div>
  );
};

const SportyEnergeticLayout = () => {
  const leagues: Array<{
    id: LeagueType;
    title: string;
    icon: React.ReactNode;
  }> = [
    { id: "premier", title: "Premier League", icon: <Trophy /> },
    { id: "eurobasket", title: "Eurobasket", icon: <Activity /> },
    { id: "wimbledon", title: "Wimbledon", icon: <Flame /> },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-in zoom-in-95 duration-500">
      {leagues.map((lg) => (
        <LeagueCard
          key={lg.id}
          league={lg.id}
          title={lg.title}
          icon={lg.icon}
        />
      ))}
    </div>
  );
};

export default SportyEnergeticLayout;
