<template>
  <div class="player-page">
    <h1>{{ currentUser?.teamName || "Player" }}</h1>

    <div v-if="currentUser" class="player-card">
      <div class="player-header">
        <div class="player-name-block">
          <h2 class="player-title">{{ currentUser.teamName }}</h2>
          <p v-if="currentUser.realName" class="player-meta">
            Managed by <strong>{{ currentUser.realName }}</strong>
          </p>
        </div>

        <div class="player-total">
          <div class="label">Total Points</div>
          <div class="value">{{ totalPointsRounded }}</div>
        </div>
      </div>

      <div class="rules-reminder">
        <p class="rules-heading">How this score is calculated</p>
        <ul class="rules-list">
          <li>
            <span class="badge">1</span>
            <span><strong>Points per win</strong> based on each team’s value.</span>
          </li>
          <li>
            <span class="badge">2</span>
            <span><strong>Playoff wins are doubled</strong> compared to round robin wins.</span>
          </li>
          <li>
            <span class="badge">3</span>
            <span><strong>+50 bonus points</strong> if a picked team wins the event.</span>
          </li>
        </ul>
      </div>

      <h3 class="picks-title">Team Picks</h3>

      <ul class="picks-list">
        <li
          v-for="pick in pickDetails"
          :key="pick.teamName"
          class="pick-row"
        >
          <div class="team-logo">
            <img
              v-if="pick.team && pick.team.image"
              :src="pick.team.image"
              :alt="pick.team.name"
            />
          </div>

          <div class="team-info">
            <div class="team-name-main">
              <span class="team-name">{{ pick.team?.name }}</span>
            </div>
            <div class="team-sub" v-if="pick.team?.subName">
              {{ pick.team.subName }}
            </div>

            <div class="team-meta-row">
              <span class="chip">
                {{ pick.team?.pointsPerWin }} pts / win
              </span>
              <span
                v-if="typeof pick.team?.wins === 'number'"
                class="chip subtle"
              >
                {{ pick.team.wins }} RR wins
              </span>
              <span
                v-if="typeof pick.team?.playoffWins === 'number'"
                class="chip subtle"
              >
                {{ pick.team.playoffWins }} playoff wins
              </span>
              <span
                v-if="pick.team?.isTournamentChampion"
                class="chip champion"
              >
                Champion +50
              </span>
            </div>
          </div>

          <div class="team-points">
            <div class="team-total">
              {{ Math.round(pick.totalPoints * 10) / 10 }}
            </div>
            <div class="team-total-label">Total points</div>
          </div>
        </li>
      </ul>
    </div>

    <div v-else class="empty-state">
      <p>
        We could not find this player. Try going back to the leaderboard and
        selecting a player again.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { getTeamPoints } from "@/utilities/utility";
import { type Team, type User, TeamName } from "@/router/index"; // adjust path if needed

interface PickDetail {
  teamName: TeamName;
  team: Team | null;
  totalPoints: number;
}

export default {
  name: "PlayerDetail",
  props: {
    teams: {
      type: Array as () => Team[],
      required: true,
    },
    users: {
      type: Array as () => User[],
      required: true,
    },
  },
  computed: {
    currentUser(): User | null {
      if (!this.users || !this.users.length) return null;

      const idParam = this.$route.params.id as string | undefined;
      const id = Number(idParam);

      // Prefer matching by id if available, fall back to index-based
      const foundById = this.users.find((u: User) => u.id == id);
      if (foundById) return foundById;

      if (!isNaN(id) && id > 0 && id <= this.users.length) {
        return this.users[id - 1] ?? null;
      }

      return this.users[0] || null;
    },
    pickDetails(): PickDetail[] {
      if (!this.currentUser || !this.currentUser.picks) return [];

      return this.currentUser.picks.map((teamName: TeamName) => {
        const team = this.getTeamFromName(teamName);
        const totalPoints = this.getTeamPointsForTeam(teamName) || 0;
        return {
          teamName,
          team,
          totalPoints,
        };
      });
    },
    totalPoints(): number {
      return this.pickDetails.reduce(
        (sum, p) => sum + (p.totalPoints || 0),
        0
      );
    },
    totalPointsRounded(): number {
      return Math.round(this.totalPoints * 10) / 10;
    },
  },
  methods: {
    getTeamFromName(teamName: TeamName): Team | null {
      if (!this.teams) return null;
      for (let i = 0; i < this.teams.length; i++) {
        const team = this.teams[i];
        if (!team) continue;
        if (team.teamName === teamName) {
          return team;
        }
      }
      return null;
    },
    getTotalPoints(user: User): number {
      if (!user || !user.picks) return 0;
      let userPoints = 0;
      for (let i = 0; i < user.picks.length; i++) {
        userPoints += this.getTeamPointsForTeam(user.picks[i]) || 0;
      }
      return userPoints;
    },
    getTeamPointsForTeam(teamName?: TeamName): number {
      if (!this.teams) return 0;
      for (let i = 0; i < this.teams.length; i++) {
        const team = this.teams[i];
        if (!team) continue;
        if (team.teamName === teamName) {
          // Use shared utility so scoring matches the leaderboard
          return getTeamPoints(team);
        }
      }
      return 0;
    },
  },
};
</script>


<style scoped>
.player-page {
  min-height: 100vh;
  background: #f4f5fb;
  padding-bottom: 80px;
}

h1 {
  text-align: center;
  padding: 30px 20px;
  font-size: 42px;
  font-weight: 800;
  background: linear-gradient(90deg, #242460, #5d5dff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  margin-bottom: 25px;
}

h1::after {
  content: "";
  display: block;
  margin: 10px auto 0;
  width: 90px;
  height: 4px;
  border-radius: 4px;
  background: #5d5dff;
  opacity: 0.7;
}

.player-card {
  max-width: 960px;
  margin: 30px auto 0;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  padding: 22px 22px 28px;
}

/* Header section */
.player-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #e1e3f2;
  padding-bottom: 12px;
}

.player-name-block {
  display: flex;
  flex-direction: column;
}

.player-title {
  margin: 0;
  font-size: 22px;
  color: #222;
}

.player-meta {
  margin: 4px 0 0;
  font-size: 13px;
  color: #666;
}

.player-total {
  text-align: right;
}

.player-total .label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #777;
}

.player-total .value {
  font-size: 28px;
  font-weight: 700;
  color: #242460;
  margin-top: 4px;
}

/* Rules reminder */
.rules-reminder {
  margin: 10px 0 14px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f7f7ff;
  border: 1px dashed #d4d7f5;
}

.rules-heading {
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 4px;
  color: #242460;
}

.rules-list {
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
}

.rules-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  padding: 4px 0;
}

.rules-list .badge {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
  background: #242460;
}

/* Picks list */
.picks-title {
  font-size: 18px;
  margin: 12px 0 10px;
  color: #242460;
}

.picks-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pick-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  column-gap: 14px;
  padding: 10px 12px;
  margin-top: 8px;
  border-radius: 12px;
  background: #f8f8ff;
  box-shadow: 0 1px 4px rgba(8, 19, 60, 0.06);
}

.pick-row:nth-child(odd) {
  background: #ffffff;
}

/* Team logo */
.team-logo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid #dde1f5;
  margin-bottom: auto;
}

.team-logo img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

/* Team info */
.team-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.team-name-main {
  display: flex;
  align-items: center;
  gap: 6px;
}

.team-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.team-sub {
  font-size: 13px;
  color: #666;
}

.team-meta-row {
  margin-top: 2px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid #d4d7f5;
  background: #ffffff;
  color: #444;
}

.chip.subtle {
  background: #f5f6ff;
}

.chip.champion {
  border-color: #f4b13a;
  background: #fff5dd;
  color: #8a5a00;
  font-weight: 600;
}

/* Team points */
.team-points {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.team-total {
  font-size: 20px;
  font-weight: 700;
  color: #242460;
}

.team-total-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #777;
  margin-top: 2px;
}

/* Empty state */
.empty-state {
  max-width: 640px;
  margin: 40px auto 0;
  text-align: center;
  color: #555;
  font-size: 14px;
  padding: 16px;
}

/* Responsive */
@media (max-width: 720px) {
  .player-card {
    margin: 18px 14px 0;
    padding: 18px 14px 24px;
  }

  .player-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .player-total {
    align-self: flex-end;
  }

  .pick-row {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    row-gap: 6px;
  }

  .team-points {
    grid-column: 1 / -1;
    align-items: flex-start;
    margin-top: 4px;
  }
}
</style>
