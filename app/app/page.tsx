"use client";
import Image from "next/image";
import Flag from "./components/Flag";
import { useAppDispatch, useAppSelector } from "./store/store";

export default function Home() {
  const dispatch = useAppDispatch();
  const teams = useAppSelector((state) => state.app.teams);
  const matches = useAppSelector((state) => state.app.matches);

  return (
    <div>
      {teams.map((team) => (
        <div key={team.id}>{team.name}</div>
      ))}
      <hr />
      {matches.map((match) => (
        <div key={match.id}>
          {teams.find((t) => t.id === match.homeTeamId)?.name} {match.homeScore}{" "}
          - {match.awayScore}{" "}
          {teams.find((t) => t.id === match.awayTeamId)?.name}
        </div>
      ))}

      <button
        onClick={() => {
          dispatch({
            type: "app/addTeam",
            payload: { name: "New Team", league: "premier" },
          });
        }}
      >
        Add Team
      </button>
    </div>
  );
}
