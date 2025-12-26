import { Check, X } from "lucide-react";
import { useMemo } from "react";
import { useAppSelector } from "../store/store";
import { calculateStandings, getTeamName } from "../store/utils";
import { LeagueType } from "../types";

interface StandingsTableProps {
  league: LeagueType;
}

const StandingsTable: React.FC<StandingsTableProps> = ({ league }) => {
  const teams = useAppSelector((state) => state.app.teams);
  const matches = useAppSelector((state) => state.app.matches);

  const standings = useMemo(() => {
    const leagueTeams = teams.filter((t) => t.league === league);
    const leagueMatches = matches.filter((m) => m.league === league);
    return calculateStandings(leagueTeams, leagueMatches);
  }, [teams, matches, league]);

  return (
    <div className="w-full">
      <div className="overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 px-3 py-3 bg-gray-100 rounded-t-md text-xs font-bold uppercase tracking-wider text-gray-600 font-mono">
          <div className="col-span-5 pl-2">Player</div>
          <div className="col-span-2 text-center">M</div>
          <div className="col-span-2 text-center">W</div>
          <div className="col-span-2 text-center">L</div>
          <div className="col-span-1 text-center">Pts</div>
        </div>

        {/* Table Body */}
        <div className="bg-white">
          {standings.map((stat, index) => (
            <div
              key={stat.teamId}
              className="grid grid-cols-12 gap-2 px-3 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors font-mono text-sm"
            >
              <div className="col-span-5 pl-2 truncate font-medium text-gray-800">
                {getTeamName(teams, stat.teamId)}
              </div>

              <div className="col-span-2 text-center text-gray-600">
                {stat.played}
              </div>

              <div className="col-span-2 flex items-center justify-center gap-1 text-gray-800">
                <span>{stat.wins}</span>
                {stat.wins > 0 && (
                  <Check size={12} className="text-green-600" strokeWidth={3} />
                )}
              </div>

              <div className="col-span-2 flex items-center justify-center gap-1 text-gray-800">
                <span>{stat.losses}</span>
                {stat.losses > 0 && (
                  <X size={12} className="text-red-500" strokeWidth={3} />
                )}
              </div>

              <div className="col-span-1 text-center font-bold text-gray-900">
                {stat.points}
              </div>
            </div>
          ))}

          {standings.length === 0 && (
            <div className="p-8 text-center text-gray-400 italic text-xs font-mono">
              No matches recorded.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StandingsTable;
