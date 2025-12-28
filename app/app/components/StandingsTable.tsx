import { Check, X } from "lucide-react";
import { useMemo } from "react";
import { useAppSelector } from "../store/store";
import { LeagueType } from "../types";
import Flag from "./Flag";
import {
  calculateStandings,
  getTeamName,
  getCountryCode,
} from "../utils/utils";

interface StandingsTableProps {
  league: LeagueType;
  variant?: "table-centric" | "clean" | "sporty";
}

const StandingsTable: React.FC<StandingsTableProps> = ({
  league,
  variant = "table-centric",
}) => {
  const teams = useAppSelector((state) => state.app.teams);
  const matches = useAppSelector((state) => state.app.matches);

  const standings = useMemo(() => {
    const leagueTeams = teams.filter((t) => t.league === league);
    const leagueMatches = matches.filter((m) => m.league === league);
    return calculateStandings(leagueTeams, leagueMatches);
  }, [teams, matches, league]);

  // Style Config
  const styles = {
    "table-centric": {
      container:
        "border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm font-mono",
      header: "bg-gray-100 border-b border-gray-200 text-gray-600 font-mono",
      row: "border-b border-gray-100 text-gray-800 font-mono hover:bg-gray-50",
      winIcon: <Check size={12} className="text-table-green" strokeWidth={3} />,
      lossIcon: <X size={12} className="text-red-500" strokeWidth={3} />,
      drawIcon: <Minus size={12} className="text-gray-400" strokeWidth={3} />,
      ptsClass: "text-gray-900",
    },
    clean: {
      container: "bg-white font-sans",
      header:
        "bg-white border-b border-clean-border text-gray-400 font-sans text-[10px] tracking-wider font-bold",
      row: "border-b border-clean-border text-gray-700 font-bold font-sans hover:bg-clean-bg",
      winIcon: (
        <div className="w-1.5 h-1.5 rounded-full bg-clean-blue mt-0.5"></div>
      ),
      lossIcon: (
        <div className="w-1.5 h-1.5 rounded-full bg-gray-200 mt-0.5"></div>
      ),
      drawIcon: (
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-0.5"></div>
      ),
      ptsClass: "text-clean-blue text-base",
    },
    sporty: {
      container: "bg-sporty-bg/30 rounded-lg overflow-hidden font-sporty",
      header:
        "bg-sporty-bg text-gray-400 font-header tracking-wider text-[11px]",
      row: "border-b border-gray-800 text-gray-200 hover:bg-white/5",
      winIcon: <span className="text-sporty-orange text-[10px]">W</span>,
      lossIcon: <span className="text-gray-600 text-[10px]">L</span>,
      drawIcon: <span className="text-gray-500 text-[10px]">D</span>,
      ptsClass: "text-white text-lg",
    },
  };

  const s = styles[variant];

  return (
    <div className="w-full flex flex-col h-full">
      <div className={`flex flex-col h-full ${s.container}`}>
        {/* Table Body & Header Combined for alignment */}
        <div className="overflow-y-auto flex-1 max-h-[300px] relative scrollbar-thin">
          {/* Sticky Header */}
          <div
            className={`grid grid-cols-12 gap-2 px-4 py-3 text-xs font-bold uppercase sticky top-0 z-10 ${s.header}`}
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
                  className={`grid grid-cols-12 gap-2 px-4 py-4 items-center transition-colors text-sm ${s.row}`}
                >
                  <div className="col-span-4 truncate flex items-center gap-2">
                    {variant === "sporty" && countryCode && (
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
                        variant === "clean" ? "font-normal" : ""
                      }`}
                    >
                      {stat.wins}
                    </span>
                    {stat.wins > 0 && s.winIcon}
                  </div>

                  <div className="col-span-2 flex items-center justify-center gap-1">
                    <span
                      className={`text-xs ${
                        variant === "clean" ? "font-normal" : ""
                      }`}
                    >
                      {stat.draws}
                    </span>
                    {stat.draws > 0 && s.drawIcon}
                  </div>

                  <div className="col-span-2 flex items-center justify-center gap-1">
                    <span
                      className={`text-xs ${
                        variant === "clean" ? "font-normal" : ""
                      }`}
                    >
                      {stat.losses}
                    </span>
                    {stat.losses > 0 && s.lossIcon}
                  </div>

                  <div
                    className={`col-span-1 text-center font-black ${s.ptsClass}`}
                  >
                    {stat.points}
                  </div>
                </div>
              );
            })}

            {standings.length === 0 && (
              <div
                className={`p-8 text-center italic text-xs ${
                  variant === "sporty" ? "text-gray-600" : "text-gray-400"
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
