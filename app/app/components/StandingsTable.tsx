import { Check, Minus, X } from "lucide-react";
import { useMemo } from "react";
import { useAppSelector } from "../store/store";
import { LeagueType, Theme } from "../types";
import Flag from "./Flag";
import {
  calculateStandings,
  getTeamName,
  getCountryCode,
} from "../utils/utils";

interface StandingsTableProps {
  league: LeagueType;
  variant?: Theme;
}

const StandingsTable: React.FC<StandingsTableProps> = ({
  league,
  variant = "table-centric",
}) => {
  const { teams, matches } = useAppSelector((state) => state.app);

  const standings = useMemo(() => {
    const leagueTeams = teams.filter((t) => t.league === league);
    const leagueMatches = matches.filter((m) => m.league === league);
    return calculateStandings(leagueTeams, leagueMatches);
  }, [teams, matches, league]);

  const icons = {
    "table-centric": {
      winIcon: <Check size={12} className="text-table-green" strokeWidth={3} />,
      lossIcon: <X size={12} className="text-red-500" strokeWidth={3} />,
      drawIcon: <Minus size={12} className="text-gray-400" strokeWidth={3} />,
    },
    "clean-minimal": {
      winIcon: (
        <div className="w-1.5 h-1.5 rounded-full bg-clean-blue mt-0.5"></div>
      ),
      lossIcon: (
        <div className="w-1.5 h-1.5 rounded-full bg-gray-200 mt-0.5"></div>
      ),
      drawIcon: (
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-0.5"></div>
      ),
    },

    "sporty-energetic": {
      winIcon: <span className="text-sporty-orange text-[10px]">W</span>,
      lossIcon: <span className="text-gray-600 text-[10px]">L</span>,
      drawIcon: <span className="text-gray-500 text-[10px]">D</span>,
    },
  };

  return (
    <div className="w-full flex flex-col h-full">
      <div className={`flex flex-col h-full standings-container-${variant}`}>
        {/* Table Body & Header Combined for alignment */}
        <div className="overflow-y-auto flex-1 max-h-[300px] relative scrollbar-thin">
          {/* Sticky Header */}
          <div
            className={`grid grid-cols-12 gap-2 px-4 py-3 text-xs font-bold uppercase sticky top-0 z-10 standings-header-${variant}`}
          >
            <div className="col-span-4">Team</div>
            <div className="col-span-1 text-center">P</div>
            <div className="col-span-2 text-center">W</div>
            <div className="col-span-2 text-center">D</div>
            <div className="col-span-2 text-center">L</div>
            <div className="col-span-1 text-center">Pts</div>
          </div>

          {/* Scrollable Rows */}
          <div className="flex flex-col">
            {standings.map((stat) => {
              const teamName = getTeamName(teams, stat.teamId);
              const countryCode = getCountryCode(teamName);

              return (
                <div
                  key={stat.teamId}
                  className={`grid grid-cols-12 gap-2 px-4 py-4 items-center transition-colors text-sm standings-row-${variant}`}
                >
                  <div className="col-span-4 truncate flex items-center gap-2">
                    {variant === "sporty-energetic" && countryCode && (
                      <Flag countryCode={countryCode} />
                    )}
                    <span className="truncate">{teamName}</span>
                  </div>

                  <div className="col-span-1 text-center text-gray-400 text-xs font-normal">
                    {stat.played}
                  </div>

                  <div className="col-span-2 flex items-center justify-center gap-1">
                    <span
                      className={`text-xs ${
                        variant === "clean-minimal" ? "font-normal" : ""
                      }`}
                    >
                      {stat.wins}
                    </span>
                    {stat.wins > 0 && icons[variant].winIcon}
                  </div>

                  <div className="col-span-2 flex items-center justify-center gap-1">
                    <span
                      className={`text-xs ${
                        variant === "clean-minimal" ? "font-normal" : ""
                      }`}
                    >
                      {stat.draws}
                    </span>
                    {stat.draws > 0 && icons[variant].drawIcon}
                  </div>

                  <div className="col-span-2 flex items-center justify-center gap-1">
                    <span
                      className={`text-xs ${
                        variant === "clean-minimal" ? "font-normal" : ""
                      }`}
                    >
                      {stat.losses}
                    </span>
                    {stat.losses > 0 && icons[variant].lossIcon}
                  </div>

                  <div
                    className={`col-span-1 text-center font-black standings-pts-${variant}`}
                  >
                    {stat.points}
                  </div>
                </div>
              );
            })}

            {standings.length === 0 && (
              <div
                className={`p-8 text-center italic text-xs ${
                  variant === "sporty-energetic"
                    ? "text-gray-600"
                    : "text-gray-400"
                }`}
              >
                No data
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandingsTable;
