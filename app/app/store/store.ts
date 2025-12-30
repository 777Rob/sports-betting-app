import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { LeagueType, Match, Team } from "../types";
import { v4 as uuidv4 } from "uuid";

interface AppState {
  teams: Team[];
  matches: Match[];
  currentLeague: LeagueType;
}

const defaultTeams: Team[] = [
  // Premier League
  { id: "t1", name: "Man U", league: "premier" },
  { id: "t2", name: "Liverpool", league: "premier" },
  { id: "t3", name: "Arsenal", league: "premier" },
  { id: "t4", name: "Chelsea", league: "premier" },

  // Eurobasket
  { id: "e1", name: "France", league: "eurobasket" },
  { id: "e2", name: "Spain", league: "eurobasket" },
  { id: "e3", name: "Germany", league: "eurobasket" },
  { id: "e4", name: "Lithuania", league: "eurobasket" },

  // Wimbledon
  { id: "w1", name: "Djokovic", league: "wimbledon" },
  { id: "w2", name: "Nadal", league: "wimbledon" },
  { id: "w3", name: "Alcaraz", league: "wimbledon" },
  { id: "w4", name: "Murray", league: "wimbledon" },
  { id: "w5", name: "Zverev", league: "wimbledon" },
];

const defaultMatches: Match[] = [
  {
    id: "m1",
    homeTeamId: "t1",
    awayTeamId: "t2",
    homeScore: 2,
    awayScore: 1,
    league: "premier",
    date: "2024-01-15T14:30:00.000Z",
  },
  {
    id: "m2",
    homeTeamId: "e4",
    awayTeamId: "e2",
    homeScore: 82,
    awayScore: 77,
    league: "eurobasket",
    date: "2024-01-16T18:00:00.000Z",
  },
  {
    id: "m3",
    homeTeamId: "e1",
    awayTeamId: "e3",
    homeScore: 71,
    awayScore: 71,
    league: "eurobasket",
    date: "2024-01-14T16:45:00.000Z",
  },
  {
    id: "w_m1",
    homeTeamId: "w1",
    awayTeamId: "w2",
    homeScore: 3,
    awayScore: 2,
    league: "wimbledon",
    date: "2024-01-12T10:00:00.000Z",
  },
];

// Initial state must be deterministic (same on server and client) to prevent hydration errors
const initialState: AppState = {
  teams: defaultTeams,
  matches: defaultMatches,
  currentLeague: "premier",
};

// Redux Slice
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addTeam: (
      state,
      action: PayloadAction<{ name: string; league: LeagueType }>
    ) => {
      state.teams.push({
        id: uuidv4(),
        name: action.payload.name,
        league: action.payload.league,
      });
    },
    addMatch: (
      state,
      action: PayloadAction<{
        homeTeamId: string;
        awayTeamId: string;
        homeScore: number;
        awayScore: number;
        league: LeagueType;
      }>
    ) => {
      state.matches.push({
        id: uuidv4(),
        homeTeamId: action.payload.homeTeamId,
        awayTeamId: action.payload.awayTeamId,
        homeScore: action.payload.homeScore,
        awayScore: action.payload.awayScore,
        league: action.payload.league,
        date: new Date().toISOString(),
      });
    },
    resetData: (state) => {
      state.teams = [];
      state.matches = [];
      state.currentLeague = "premier";
    },
    resetToDemo: (state) => {
      // Use JSON parse/stringify for a simple deep copy to ensure we break references
      // This prevents any potential mutation issues with the default arrays
      state.teams = JSON.parse(JSON.stringify(defaultTeams));
      state.matches = JSON.parse(JSON.stringify(defaultMatches));
      state.currentLeague = "premier";
    },
    setLeague: (state, action: PayloadAction<LeagueType>) => {
      state.currentLeague = action.payload;
    },
    hydrateState: (state, action: PayloadAction<AppState>) => {
      return action.payload;
    },
  },
});

export const {
  addTeam,
  addMatch,
  resetData,
  resetToDemo,
  setLeague,
  hydrateState,
} = appSlice.actions;

// Configure Store
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

// Subscribe to store updates to persist state
store.subscribe(() => {
  try {
    const state = store.getState();
    if (typeof window !== "undefined") {
      const serializedState = JSON.stringify(state.app);
      localStorage.setItem("sports-standings-redux", serializedState);
    }
  } catch {
    // Ignore write errors
  }
});

// Types and Hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
