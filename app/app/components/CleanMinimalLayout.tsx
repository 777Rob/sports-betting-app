import { LeagueType } from "../types";
import MatchForm from "./MatchForm";
import StandingsTable from "./StandingsTable";
import TeamForm from "./TeamForm";

interface LeagueCardProps {
  league: LeagueType;
  title: string;
  subtitle: string;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league, title, subtitle }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col w-full h-full border border-gray-100">
      {/* Header */}
      <div className="px-6 py-4 bg-[#37013d] border-b border-gray-100">
        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
      </div>

      {/* Body: 3 vertical sections */}
      <div className="p-6 flex-1 flex flex-col gap-8 bg-white">
        {/* Section 1: Add Team */}
        <div>
          <TeamForm
            league={league}
            mode="inline"
            containerClass="bg-white p-0 rounded-none border-none"
            inputClass="bg-[#333333] border-none text-white placeholder-gray-500 text-sm py-3 px-4 rounded"
            saveButtonClass="bg-[#8ba4f9] hover:bg-[#7290f5] text-white font-bold rounded shadow-sm"
            labelClass="text-gray-900 font-bold text-[11px] uppercase tracking-wider mb-2 block"
          />
        </div>

        {/* Section 2: Add Score */}
        <div>
          <MatchForm
            league={league}
            mode="inline"
            containerClass="bg-white p-0 rounded-none border-none"
            inputClass="bg-[#333333] border-none text-white placeholder-gray-500 text-sm py-3 px-4 rounded"
            saveButtonClass="bg-[#8ba4f9] hover:bg-[#7290f5] text-white font-bold rounded shadow-sm py-3"
            labelClass="text-gray-900 font-bold text-[11px] uppercase tracking-wider mb-2 block"
          />
        </div>

        {/* Section 3: Table */}
        <div className="border rounded-md border-gray-100 mt-2">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Standings
          </div>
          <StandingsTable league={league} variant="clean" />
        </div>
      </div>
    </div>
  );
};

const CleanMinimalLayout = () => {
  const leagues: Array<{ id: LeagueType; title: string; subtitle: string }> = [
    { id: "premier", title: "Premier League", subtitle: "Football" },
    { id: "eurobasket", title: "Eurobasket", subtitle: "Basketball" },
    { id: "wimbledon", title: "Wimbledon", subtitle: "Tennis" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-[1400px] mx-auto animate-in fade-in duration-500">
      {leagues.map((lg) => (
        <LeagueCard
          key={lg.id}
          league={lg.id}
          title={lg.title}
          subtitle={lg.subtitle}
        />
      ))}
    </div>
  );
};

export default CleanMinimalLayout;
