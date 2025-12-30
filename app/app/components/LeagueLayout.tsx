import React from "react";
import TeamForm from "./TeamForm";
import MatchForm from "./MatchForm";
import StandingsTable from "./StandingsTable";
import MatchList from "./MatchList";
import { LeagueType } from "../types";
import { Flame, Activity, Trophy } from "lucide-react";
import { Theme } from "../types";
import SoccerIcon from "./icons/SoccerIcon";
import BasketballIcon from "./icons/BasketballIcon";
import TennisIcon from "./icons/TennisIcon";

interface LeagueCardProps {
  league: LeagueType;
  title: string;
  theme: Theme;
  icon?: React.ReactNode;
}

interface LeagueData {
  id: LeagueType;
  title: string;
  tableIcon: React.ReactNode;
  sportyIcon: React.ReactNode;
}

const LeagueCard: React.FC<LeagueCardProps> = ({
  league,
  title,
  theme,
  icon,
}) => {
  // Styles based on theme
  const getContainerClass = () => {
    switch (theme) {
      case "table-centric":
        return "bg-white rounded-lg shadow-sm border border-gray-200";
      case "clean-minimal":
        return "bg-white rounded-lg shadow-xl border border-clean-border";
      case "sporty-energetic":
        return "bg-sporty-card rounded-lg shadow-2xl border border-gray-800";
    }
  };

  const getHeaderClass = () => {
    switch (theme) {
      case "table-centric":
        return "px-6 py-5 flex items-center gap-3 bg-table-green text-white";
      case "clean-minimal":
        return "px-6 py-4 bg-clean-header border-b border-clean-border";
      case "sporty-energetic":
        return "px-6 py-5 flex items-center gap-3 border-b border-gray-800";
    }
  };

  const getTitleClass = () => {
    switch (theme) {
      case "table-centric":
        return "text-xl font-bold tracking-wider font-mono";
      case "clean-minimal":
        return "text-xl font-bold text-white tracking-tight";
      case "sporty-energetic":
        return "text-2xl font-header tracking-wider text-white uppercase";
    }
  };

  const renderContent = () => {
    if (theme === "table-centric") {
      return (
        <div className="p-6 flex-1 flex flex-col gap-8 bg-white">
          <div className="flex gap-4">
            <div className="flex-1">
              <TeamForm league={league} variant="table-green" />
            </div>
            <div className="flex-1">
              <MatchForm league={league} variant="table-purple" />
            </div>
          </div>
          <div className="flex-1">
            <StandingsTable league={league} variant="table-centric" />
          </div>
        </div>
      );
    }

    if (theme === "clean-minimal") {
      return (
        <div className="p-6 flex-1 flex flex-col gap-8 bg-white">
          <div>
            <TeamForm league={league} variant="clean" mode="inline" />
          </div>
          <div>
            <MatchForm league={league} variant="clean" mode="inline" />
          </div>
          <div className="border rounded-md border-clean-border mt-2">
            <div className="bg-clean-bg px-4 py-3 border-b border-clean-border text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Standings
            </div>
            <StandingsTable league={league} variant="clean" />
          </div>
        </div>
      );
    }

    // sporty-energetic
    return (
      <div className="p-6 pb-12 flex-1 flex flex-col gap-8">
        <div className="flex justify-between items-center gap-2">
          <div className="w-[48%]">
            <TeamForm league={league} variant="sporty" />
          </div>
          <div className="w-[48%]">
            <MatchForm league={league} variant="sporty" />
          </div>
        </div>
        <div>
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-3">
            Recent Matches
          </h3>
          <MatchList league={league} />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-3">
            Score Table:
          </h3>
          <StandingsTable league={league} variant="sporty" />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`overflow-hidden flex flex-col w-full h-full ${getContainerClass()}`}
    >
      <div className={getHeaderClass()}>
        {icon && theme !== "clean-minimal" && (
          <div className={theme === "sporty-energetic" ? "text-white" : ""}>
            {icon}
          </div>
        )}
        <h2 className={getTitleClass()}>{title}</h2>
      </div>
      {renderContent()}
    </div>
  );
};

const LeagueLayout: React.FC<{ theme: Theme }> = ({ theme }) => {
  const leagues: LeagueData[] = [
    {
      id: "premier",
      title: "Premier League",
      tableIcon: <SoccerIcon />,
      sportyIcon: <Trophy />,
    },
    {
      id: "eurobasket",
      title: "Eurobasket",
      tableIcon: <BasketballIcon />,
      sportyIcon: <Activity />,
    },
    {
      id: "wimbledon",
      title: "Wimbledon",
      tableIcon: <TennisIcon />,
      sportyIcon: <Flame />,
    },
  ];

  const getGridClass = () => {
    switch (theme) {
      case "clean-minimal":
        return "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full animate-in fade-in duration-500 font-sans";
      case "sporty-energetic":
        return "grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full animate-in zoom-in-95 duration-500 font-sporty";
      default:
        return "grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full animate-in fade-in duration-500 font-mono";
    }
  };

  return (
    <div className={getGridClass()}>
      {leagues.map((lg) => (
        <LeagueCard
          key={lg.id}
          league={lg.id}
          title={lg.title}
          theme={theme}
          icon={theme === "sporty-energetic" ? lg.sportyIcon : lg.tableIcon}
        />
      ))}
    </div>
  );
};

export default LeagueLayout;
