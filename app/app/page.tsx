"use client";
import Basketball from "./components/icons/Basketball";
import SoccerBall from "./components/icons/SoccerBall";
import TennisBall from "./components/icons/TennisBall";
import MatchForm from "./components/MatchForm";
import StandingsTable from "./components/StandingsTable";
import TeamForm from "./components/TeamForm";
import { LeagueType } from "./types";

interface LeagueCardProps {
  league: LeagueType;
  title: string;
  icon: React.ReactNode;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league, title, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col w-full h-full border border-gray-200">
      {/* Header */}
      <div className="px-6 py-5 flex items-center gap-3 bg-[#004f30] text-white">
        <div>{icon}</div>
        <h2 className="text-xl font-bold tracking-wider font-mono">{title}</h2>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col gap-8 bg-white">
        {/* Actions Row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <TeamForm league={league} />
          </div>
          <div className="flex-1">
            <MatchForm league={league} />
          </div>
        </div>

        {/* Standings */}
        <div className="flex-1">
          <StandingsTable league={league} />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const leagues: Array<{
    id: LeagueType;
    title: string;
    icon: React.ReactNode;
  }> = [
    { id: "premier", title: "Premier League", icon: <SoccerBall /> },
    { id: "eurobasket", title: "Eurobasket", icon: <Basketball /> },
    { id: "wimbledon", title: "Wimbledon", icon: <TennisBall /> },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {leagues.map((lg) => (
            <LeagueCard
              key={lg.id}
              league={lg.id}
              title={lg.title}
              icon={lg.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
