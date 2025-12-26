import { Match, Standing, Team } from "./types";

export const calculateStandings = (
  teams: Team[],
  matches: Match[]
): Standing[] => {
  const stats: Record<string, Standing> = {};

  // Initialize stats for all teams
  teams.forEach((t) => {
    stats[t.id] = {
      teamId: t.id,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      points: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    };
  });

  // Calculate stats based on matches
  matches.forEach((m) => {
    const home = stats[m.homeTeamId];
    const away = stats[m.awayTeamId];

    // Skip if team IDs don't exist in the current list (e.g. deleted teams)
    if (!home || !away) return;

    home.played++;
    away.played++;

    home.goalsFor += m.homeScore;
    home.goalsAgainst += m.awayScore;
    away.goalsFor += m.awayScore;
    away.goalsAgainst += m.homeScore;

    if (m.homeScore > m.awayScore) {
      // Home Win
      home.wins++;
      home.points += 3;
      away.losses++;
    } else if (m.homeScore < m.awayScore) {
      // Away Win
      away.wins++;
      away.points += 3;
      home.losses++;
    } else {
      // Draw
      home.draws++;
      home.points += 1;
      away.draws++;
      away.points += 1;
    }
  });

  // Sort by Points (Descending), then Goals Difference (optional, but good practice), then Goals For
  return Object.values(stats).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const diffA = a.goalsFor - a.goalsAgainst;
    const diffB = b.goalsFor - b.goalsAgainst;
    if (diffB !== diffA) return diffB - diffA;
    return b.goalsFor - a.goalsFor;
  });
};

export const getTeamName = (teams: Team[], id: string): string => {
  return teams.find((t) => t.id === id)?.name || "Unknown";
};
