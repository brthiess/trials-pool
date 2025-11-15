<template>
  <div class="about">
    <h1>Stats</h1>

    <!-- Most Popular Teams -->
    <div class="stats-card">
      <h2>Most Popular Teams</h2>
      <p class="section-note">
        Based on how often each team is picked by users.
      </p>

      <ul class="team-list">
        <li
          v-for="team in mostPopularTeams"
          :key="team.id"
          class="team-row"
        >
          <div class="team-main">
            <div class="team-logo">
              <img :src="team.image" :alt="team.name" />
            </div>
            <div class="team-text">
              <div class="team-name">{{ team.name }}</div>
              <div class="team-sub">
                {{ team.subName }}
                <span
                  class="gender-pill"
                  :class="{
                    female: team.gender === Gender.Female,
                    male: team.gender === Gender.Male
                  }"
                >
                  {{ team.gender === Gender.Female ? "Women" : "Men" }}
                </span>
              </div>
            </div>
          </div>

          <div class="team-metrics">
            <div class="metric">
              <div class="metric-label">Picks</div>
              <div class="metric-value">{{ team.totalPicks }}</div>
            </div>
            <div class="metric">
              <div class="metric-label">% of all picks</div>
              <div class="metric-value">
                {{ Math.round(team.percentageOfTotalPicks * 10) / 10 }}%
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Best Performing Teams -->
    <div class="stats-card">
      <h2>Best Performing Teams</h2>
      <p class="section-note">
        Based on total fantasy points earned so far.
      </p>

      <ul class="team-list">
        <li
          v-for="team in bestTeams"
          :key="team.id"
          class="team-row"
        >
          <div class="team-main">
            <div class="team-logo">
              <img :src="team.image" :alt="team.name" />
            </div>
            <div class="team-text">
              <div class="team-name">{{ team.name }}</div>
              <div class="team-sub">
                {{ team.subName }}
                <span
                  class="gender-pill"
                  :class="{
                    female: team.gender === Gender.Female,
                    male: team.gender === Gender.Male
                  }"
                >
                  {{ team.gender === Gender.Female ? "Women" : "Men" }}
                </span>
              </div>
            </div>
          </div>

          <div class="team-metrics">
            <div class="metric">
              <div class="metric-label">Pts / Win</div>
              <div class="metric-value small">
                {{ team.pointsPerWin }}
              </div>
            </div>
            <div class="metric">
              <div class="metric-label">Total Points</div>
              <div class="metric-value">
                {{ Math.round(team.totalPoints * 10) / 10 }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTeamPoints } from "@/utilities/utility";
import { Gender } from "@/router/index"; // adjust path if needed

export default {
  name: "Stats",
  props: {
    teams: Array,
    users: Array,
  },
  data() {
    return {
      Gender,
    };
  },
  methods: {
    getTeamFromId(teamId) {
      for (let i = 0; i < this.teams.length; i++) {
        if (this.teams[i].id == teamId) {
          return this.teams[i];
        }
      }
    },
  },
  computed: {
    mostPopularTeams() {
      let popularTeams = [];
      let popularPicks = {};
      let totalPicks = 0;

      for (let i = 0; i < this.users.length; i++) {
        for (let j = 0; j < this.users[i].picks.length; j++) {
          const pick = this.users[i].picks[j];
          if (!popularPicks[pick]) {
            popularPicks[pick] = 0;
          }
          popularPicks[pick] += 1;
          totalPicks += 1;
        }
      }

      for (const teamId in popularPicks) {
        let team = this.getTeamFromId(teamId);
        if (!team) continue;
        team.totalPicks = popularPicks[teamId];
        // Keeping your original formula here
        team.percentageOfTotalPicks = (team.totalPicks / totalPicks) * 6 * 100;
        popularTeams.push(team);
      }

      return popularTeams.sort((a, b) =>
        a.percentageOfTotalPicks < b.percentageOfTotalPicks ? 1 : -1
      );
    },
    bestTeams() {
      let bestTeams = [];

      for (let i = 0; i < this.teams.length; i++) {
        const team = this.teams[i];
        bestTeams.push(team);
        team.totalPoints = getTeamPoints(team);
      }

      return bestTeams.sort((a, b) =>
        a.totalPoints < b.totalPoints ? 1 : -1
      );
    },
  },
};
</script>

<style scoped>
.about {
  margin-bottom: 100px;
  background: #f4f5fb;
  min-height: 100vh;
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

.stats-card {
  max-width: 960px;
  margin: 30px auto 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  padding: 24px 24px 28px;
}

h2 {
  text-align: left;
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 22px;
  color: #242460;
}

.section-note {
  margin: 0 0 20px;
  font-size: 13px;
  color: #666;
}

.team-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.team-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px;
  border-radius: 10px;
  background: #f8f8ff;
  border: 1px solid #e0e2f2;
  margin-bottom: 10px;
}

.team-row:nth-child(even) {
  background: #f2f3ff;
}

.team-main {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.team-logo {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04);
  margin-bottom: auto;
}

.team-logo img {
  height: 100%;
  width: 100%;
  object-position: center;
  object-fit: cover;
}

.team-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.team-name {
  font-size: 16px;
  font-weight: 600;
  color: #222;
}

.team-sub {
  font-size: 13px;
  color: #666;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

/* Gender pill like the rules page */
.gender-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid #d4d7f5;
  background: #ffffff;
}

.gender-pill.female {
  border-color: #f3bfd8;
  background: #fff4fa;
}

.gender-pill.male {
  border-color: #b4cff4;
  background: #f2f7ff;
}

.team-metrics {
  display: flex;
  gap: 18px;
  align-items: center;
  text-align: right;
}

.metric {
  min-width: 80px;
}

.metric-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #888;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 18px;
  font-weight: 700;
  color: #242460;
}

.metric-value.small {
  font-size: 16px;
}

/* Responsive tweaks */
@media (max-width: 720px) {
  .stats-card {
    margin: 16px;
    padding: 18px 14px 22px;
  }

  .team-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .team-metrics {
    width: 100%;
    justify-content: flex-start;
    text-align: left;
  }

  .metric {
    min-width: 0;
  }
}
</style>
