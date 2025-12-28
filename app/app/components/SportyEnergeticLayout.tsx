import { Trophy, Flame, ActivityIcon } from "lucide-react";
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
    <div className="bg-sporty-card rounded-lg shadow-2xl overflow-hidden flex flex-col w-full h-full border border-gray-800">
      {/* Header */}
      <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-800">
        <div className="text-white">{icon}</div>
        <h2 className="text-2xl font-header tracking-wider text-white uppercase">
          {title}
        </h2>
      </div>

      <div className="p-6 pb-12 flex-1 flex flex-col gap-8">
        {/* Col 1: Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="w-[42%]">
            <TeamForm league={league} variant="sporty" />
          </div>
          <div className="w-[42%]">
            <MatchForm league={league} variant="sporty" />
          </div>
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
    { id: "eurobasket", title: "Eurobasket", icon: <ActivityIcon /> },
    { id: "wimbledon", title: "Wimbledon", icon: <Flame /> },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-in zoom-in-95 duration-500 font-sporty">
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
