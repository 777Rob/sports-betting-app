import { LeagueType } from "../types";
import BasketballIcon from "./icons/BasketballIcon";
import SoccerIcon from "./icons/SoccerIcon";
import TennisIcon from "./icons/TennisIcon";
import MatchForm from "./MatchForm";
import StandingsTable from "./StandingsTable";
import TeamForm from "./TeamForm";

interface LeagueCardProps {
  league: LeagueType;
  title: string;
  icon: React.ReactNode;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league, title, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col w-full h-full border border-gray-200">
      {/* Header */}
      <div className="px-6 py-5 flex items-center gap-3 bg-table-green text-white">
        <div>{icon}</div>
        <h2 className="text-xl font-bold tracking-wider font-mono">{title}</h2>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col gap-8 bg-white">
        {/* Actions Row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <TeamForm
              league={league}
              buttonClass="bg-table-green text-white hover:bg-[#003822] font-mono text-xs uppercase tracking-wider font-bold"
              containerClass="bg-white p-6 rounded-lg shadow-2xl border-t-4 border-table-green"
              inputClass="border-gray-300 bg-white text-gray-900 focus:border-table-green focus:ring-table-green font-mono"
              saveButtonClass="bg-table-green hover:bg-[#003822] text-white font-mono uppercase tracking-widest"
            />
          </div>
          <div className="flex-1">
            <MatchForm
              league={league}
              buttonClass="bg-table-purple text-white hover:bg-[#2d053d] font-mono text-xs uppercase tracking-wider font-bold"
              containerClass="bg-white p-6 rounded-lg shadow-2xl border-t-4 border-table-purple"
              inputClass="border-gray-300 bg-white text-gray-900 focus:border-table-purple focus:ring-table-purple font-mono"
              saveButtonClass="bg-table-purple hover:bg-[#2d053d] text-white font-mono uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Standings */}
        <div className="flex-1">
          <StandingsTable league={league} variant="table-centric" />
        </div>
      </div>
    </div>
  );
};

const TableCentricLayout = () => {
  const leagues: Array<{
    id: LeagueType;
    title: string;
    icon: React.ReactNode;
  }> = [
    { id: "premier", title: "Premier League", icon: <SoccerIcon /> },
    { id: "eurobasket", title: "Eurobasket", icon: <BasketballIcon /> },
    { id: "wimbledon", title: "Wimbledon", icon: <TennisIcon /> },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-in fade-in duration-500 font-mono">
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

export default TableCentricLayout;
