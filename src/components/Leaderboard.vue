<template>
  <div class="leaderboard-page">
    <h1>Leaderboard</h1>

    <div class="leaderboard-card" v-if="leaders && leaders.length">
      <div class="leaderboard-intro">
        <p class="subtitle">
          Live standings based on your picks. Points include round robin wins,
          doubled playoff wins, and any championship bonuses.
        </p>
      </div>

      <div class="leaderboard-header-row">
        <span class="col-rank">Rank</span>
        <span class="col-name">Team</span>
        <span class="col-points">Points</span>
      </div>

      <ul class="leaderboard-list">
        <li
          v-for="(leader, index) in leaders"
          :key="leader.id"
          class="leader-row"
        >
          <router-link
            class="row-link"
            :to="'/player/' + leader.id"
            :aria-label="'View details for ' + leader.teamName"
          ></router-link>

          <div class="rank" :class="getLeaderboardClass(index + 1)">
            <span class="rank-number">{{ index + 1 }}</span>
            <span class="ordinal">
              {{ getLeaderboardPlaceText(index + 1) }}
            </span>
          </div>

          <div class="team-cell">
            <div class="team-name">{{ leader.teamName }}</div>
            <div class="team-meta" v-if="leader.realName">
              Managed by {{ leader.realName }}
            </div>
          </div>

          <div class="points-cell">
            <span class="points-value">
              {{ Math.round(leader.totalPoints * 10) / 10 }}
            </span>
            <span class="pts">pts</span>
          </div>

          <div class="chevron">›</div>
        </li>
      </ul>
    </div>

    <div class="empty-state" v-else>
      <p>
        No entries yet. Once players have made their picks, the leaderboard will
        appear here.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { getTeamPoints } from "@/utilities/utility";
import { TeamName, type Team, type User } from "@/router/index"; // adjust path if needed

interface LeaderWithPoints extends User {
  totalPoints: number;
}

export default {
  name: "Leaderboard",
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
    leaders(): LeaderWithPoints[] {
      if (!this.users || !this.users.length) {
        return [];
      }

      const leadersWithPoints: LeaderWithPoints[] = this.users.map(
        (user: User) => {
          const totalPoints = this.getUserPoints(user);
          // Return a shallow copy so we are not mutating props
          return {
            ...user,
            totalPoints,
          };
        }
      );

      return leadersWithPoints.sort((a, b) =>
        a.totalPoints < b.totalPoints ? 1 : -1
      );
    },
  },
  methods: {
    getUserPoints(user: User): number {
      if (!user || !user.picks || !user.picks.length) {
        return 0;
      }

      let userPoints = 0;

      for (let i = 0; i < user.picks.length; i++) {
        const teamName = user.picks[i]; // TeamName
        if (!teamName) continue;
        userPoints += this.getTeamPointsByName(teamName) || 0;
      }

      return userPoints;
    },

    getTeamPointsByName(teamName: TeamName): number {
      if (!this.teams || !this.teams.length) {
        return 0;
      }

      for (let i = 0; i < this.teams.length; i++) {
        const team = this.teams[i];
        if (!team) continue;
        if (team.teamName === teamName) {
          return getTeamPoints(team);
        }
      }

      return 0;
    },

    getLeaderboardClass(index: number): string {
      if (index === 1) {
        return "first shimmer";
      }
      if (index === 2) {
        return "second";
      }
      if (index === 3) {
        return "third";
      }
      return "";
    },

    getLeaderboardPlaceText(index: number): string {
      return this.ordinal_suffix_of(index);
    },

    ordinal_suffix_of(i: number): string {
      const j = i % 10;
      const k = i % 100;
      if (j === 1 && k !== 11) return "st";
      if (j === 2 && k !== 12) return "nd";
      if (j === 3 && k !== 13) return "rd";
      return "th";
    },
  },
};
</script>


<style scoped>
.leaderboard-page {
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

.leaderboard-card {
  max-width: 960px;
  margin: 30px auto 0;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  padding: 20px 20px 24px;
}

.leaderboard-intro {
  margin-bottom: 8px;
}

.subtitle {
  margin: 0 0 10px;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

.leaderboard-header-row {
  display: grid;
  grid-template-columns: 1.1fr 4fr 2fr;
  align-items: center;
  padding: 10px 16px;
  background: #242460;
  color: #ffffff;
  border-radius: 10px;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.col-rank {
  text-align: left;
}
.col-name {
  text-align: left;
}
.col-points {
  text-align: right;
}

.leaderboard-list {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
}

.leader-row {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 4fr 2fr 24px;
  align-items: center;
  padding: 10px 16px;
  margin-top: 6px;
  border-radius: 10px;
  background: #f8f8ff;
  box-shadow: 0 1px 4px rgba(8, 19, 60, 0.06);
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
}

.leader-row:nth-child(odd) {
  background: #ffffff;
}

.leader-row:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(8, 19, 60, 0.12);
  background: #f3f4ff;
}

.row-link {
  position: absolute;
  inset: 0;
}

/* Rank */
.rank {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 62px;
  height: 52px;
  border-radius: 12px;
  background: #e3e5fb;
  font-weight: 700;
  font-size: 18px;
  color: #242460;
  flex-flow: row;
}

.rank-number {
  line-height: 1;
}

.ordinal {
  font-size: 11px;
  margin-top: 2px;
}

/* Medal colors */
.rank.first {
  background: linear-gradient(135deg, #f7b930 0%, #f4a321 100%);
  color: #fff;
}
.rank.second {
  background: linear-gradient(135deg, #cfd4dd 0%, #aeb4c2 100%);
  color: #fff;
}
.rank.third {
  background: linear-gradient(135deg, #d18b5c 0%, #b56034 100%);
  color: #fff;
}

/* shimmer retained for first place */
.shimmer {
  -webkit-mask: linear-gradient(-60deg, #000 30%, #0005, #000 70%) right/400%
    100%;
  background-repeat: no-repeat;
  animation: shimmer 4s infinite;
}

@keyframes shimmer {
  20% {
    -webkit-mask-position: left;
  }
  100% {
    -webkit-mask-position: left;
  }
}

/* Team cell */
.team-cell {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  grid-row: 1 / span 2;
  grid-column: 2;
}

.team-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.team-meta {
  font-size: 12px;
  color: #777;
  margin-top: 2px;
}

/* Points cell */
.points-cell {
  text-align: right;
}

.points-value {
  font-size: 20px;
  font-weight: 700;
  color: #242460;
}

.pts {
  font-size: 12px;
  margin-left: 4px;
  color: #777;
}

/* Chevron */
.chevron {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  background: #f40e04aa;
  color: #ffffff;
  margin-left: 6px;
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

/* Responsive tweaks */
@media (max-width: 720px) {
  .leaderboard-card {
    margin: 18px 14px 0;
    padding: 18px 12px 22px;
  }

  .leaderboard-header-row {
    display: none;
  }

  .leader-row {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    row-gap: 6px;
    padding: 10px 12px;
  }

  .rank {
    grid-row: span 2;
    width: 52px;
    height: 46px;
    font-size: 16px;
    display: flex;
    flex-flow: row;
  }

  .team-cell {
    padding: 0 8px 0 10px;
  }

  .points-cell {
    text-align: right;
    align-self: center;
  }

  .points-value {
    font-size: 18px;
  }

  .chevron {
    grid-column: 3;
    grid-row: 2;
    justify-self: flex-end;
  }
}
</style>
