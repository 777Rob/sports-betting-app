import { appSlice, store, addTeam, addMatch, resetData } from "./store";
import { calculateStandings } from "../utils/utils";

// Fix for TypeScript error: "Cannot use namespace 'jest' as a value"
declare var jest: any;

jest.mock("uuid", () => ({
  v4: () => "test-id-" + Math.random().toString(36).substring(7),
}));

// Basic test suite for Redux Store
describe("Redux Store Tests", () => {
  beforeEach(() => {
    store.dispatch(resetData());
  });

  test("should initially have empty state after reset", () => {
    const state = store.getState().app;
    expect(state.teams.length).toBe(0);
    expect(state.matches.length).toBe(0);
  });

  test("should add a team correctly", () => {
    store.dispatch(addTeam({ name: "Test Team", league: "premier" }));
    const state = store.getState().app;
    expect(state.teams.length).toBe(1);
    expect(state.teams[0].name).toBe("Test Team");
    expect(state.teams[0].league).toBe("premier");
    expect(state.teams[0].id).toBeDefined();
    expect(state.teams[0].id).toContain("test-id-");
  });

  test("should add a match correctly", () => {
    // Setup teams
    store.dispatch(addTeam({ name: "Team A", league: "premier" }));
    store.dispatch(addTeam({ name: "Team B", league: "premier" }));
    const stateAfterTeams = store.getState().app;
    const teamA = stateAfterTeams.teams[0].id;
    const teamB = stateAfterTeams.teams[1].id;

    // Add match
    store.dispatch(
      addMatch({
        homeTeamId: teamA,
        awayTeamId: teamB,
        homeScore: 2,
        awayScore: 1,
        league: "premier",
      })
    );

    const stateAfterMatch = store.getState().app;
    expect(stateAfterMatch.matches.length).toBe(1);
    expect(stateAfterMatch.matches[0].homeScore).toBe(2);
    expect(stateAfterMatch.matches[0].awayScore).toBe(1);
  });
});

// Test suite for Business Logic (Standings)
describe("Standings Calculation Logic", () => {
  const mockTeams = [
    { id: "1", name: "A", league: "premier" as const },
    { id: "2", name: "B", league: "premier" as const },
  ];

  test("Win gives 3 points", () => {
    const mockMatches = [
      {
        id: "m1",
        homeTeamId: "1",
        awayTeamId: "2",
        homeScore: 1,
        awayScore: 0,
        league: "premier" as const,
        date: "",
      },
    ];
    const standings = calculateStandings(mockTeams, mockMatches);
    const winner = standings.find((s) => s.teamId === "1");
    const loser = standings.find((s) => s.teamId === "2");

    expect(winner?.points).toBe(3);
    expect(winner?.wins).toBe(1);
    expect(loser?.points).toBe(0);
    expect(loser?.losses).toBe(1);
  });

  test("Draw gives 1 point each", () => {
    const mockMatches = [
      {
        id: "m1",
        homeTeamId: "1",
        awayTeamId: "2",
        homeScore: 1,
        awayScore: 1,
        league: "premier" as const,
        date: "",
      },
    ];
    const standings = calculateStandings(mockTeams, mockMatches);
    const t1 = standings.find((s) => s.teamId === "1");
    const t2 = standings.find((s) => s.teamId === "2");

    expect(t1?.points).toBe(1);
    expect(t1?.draws).toBe(1);
    expect(t2?.points).toBe(1);
    expect(t2?.draws).toBe(1);
  });
});
