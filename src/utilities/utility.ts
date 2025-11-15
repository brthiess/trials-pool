import type { Team } from "@/router";

export function getTeamPoints(team: Team): number {
  const regularPoints = team.wins * team.pointsPerWin;
  const playoffPoints = (team.playoffWins || 0) * team.pointsPerWin * 2;
  const championBonus = team.isTournamentChampion ? 50 : 0;
  return regularPoints + playoffPoints + championBonus;
}
