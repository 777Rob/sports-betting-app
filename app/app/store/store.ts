import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { LeagueType, Match, Team } from "./types";
import { v4 as uuidv4 } from "uuid";

// State Interface
interface AppState {
  teams: Team[];
  matches: Match[];
  currentLeague: LeagueType;
}

// Initial Data
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
    date: new Date().toISOString(),
  },
  {
    id: "m2",
    homeTeamId: "e4",
    awayTeamId: "e2",
    homeScore: 82,
    awayScore: 77,
    league: "eurobasket",
    date: new Date().toISOString(),
  },
  {
    id: "m3",
    homeTeamId: "e1",
    awayTeamId: "e3",
    homeScore: 71,
    awayScore: 71,
    league: "eurobasket",
    date: new Date(Date.now() - 100000).toISOString(),
  },
  {
    id: "w_m1",
    homeTeamId: "w1",
    awayTeamId: "w2",
    homeScore: 3,
    awayScore: 2,
    league: "wimbledon",
    date: new Date().toISOString(),
  },
];

// Load from LocalStorage
const loadState = (): AppState => {
  try {
    const serializedState = localStorage.getItem("sports-standings-redux");
    if (serializedState === null) {
      return {
        teams: defaultTeams,
        matches: defaultMatches,
        currentLeague: "premier",
      };
    }
    const loaded = JSON.parse(serializedState);
    return {
      teams: loaded.teams || defaultTeams,
      matches: loaded.matches || defaultMatches,
      currentLeague: loaded.currentLeague || "premier",
    };
  } catch (err) {
    return {
      teams: defaultTeams,
      matches: defaultMatches,
      currentLeague: "premier",
    };
  }
};

const initialState: AppState = loadState();

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
    setLeague: (state, action: PayloadAction<LeagueType>) => {
      state.currentLeague = action.payload;
    },
  },
});

export const { addTeam, addMatch, resetData, setLeague } = appSlice.actions;

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
    const serializedState = JSON.stringify(state.app);
    localStorage.setItem("sports-standings-redux", serializedState);
  } catch {
    // Ignore write errors
  }
});

// Types and Hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
