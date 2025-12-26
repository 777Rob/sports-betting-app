export type LeagueType = "premier" | "eurobasket" | "wimbledon";

export interface Team {
  id: string;
  name: string;
  league: LeagueType;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  league: LeagueType;
  date: string;
}

export interface Standing {
  teamId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
}
