import Flag from "./Flag";
import { useAppSelector } from "../store/store";
import { LeagueType } from "../types";
import { getTeamName, getCountryCode } from "../utils/utils";

interface MatchListProps {
  league: LeagueType;
}

const MatchList: React.FC<MatchListProps> = ({ league }) => {
  const teams = useAppSelector((state) => state.app.teams);
  const matches = useAppSelector((state) => state.app.matches);

  // Get last 5 matches for this league, sorted by date (newest first if date existed, here just reverse order)
  const leagueMatches = matches
    .filter((m) => m.league === league)
    .slice(-4)
    .reverse();

  return (
    <div className="space-y-3 font-sporty">
      {leagueMatches.map((m) => {
        const homeName = getTeamName(teams, m.homeTeamId);
        const awayName = getTeamName(teams, m.awayTeamId);
        const homeCode = getCountryCode(homeName);
        const awayCode = getCountryCode(awayName);

        return (
          <div
            key={m.id}
            className="flex items-center justify-between text-sm py-1 border-b border-gray-800 pb-1 gap-2"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="w-1 h-3 bg-sporty-orange rounded-full shrink-0"></span>

              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                {homeCode && <Flag countryCode={homeCode} />}
                <span className="text-gray-300 font-medium truncate">
                  {homeName}
                </span>
              </div>

              <span className="text-gray-500 text-xs px-1 shrink-0">vs</span>

              <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end text-right">
                <span className="text-gray-300 font-medium truncate">
                  {awayName}
                </span>
                {awayCode && <Flag countryCode={awayCode} />}
              </div>
            </div>

            <div className="font-header text-white text-lg tracking-wider shrink-0 pl-2">
              {m.homeScore}-{m.awayScore}
            </div>
          </div>
        );
      })}
      {leagueMatches.length === 0 && (
        <div className="text-gray-600 text-xs italic py-2">
          No recent matches
        </div>
      )}
    </div>
  );
};

export default MatchList;
