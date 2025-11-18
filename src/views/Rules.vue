<template>
  <div class="about">
    <h1>Rules</h1>

    <div class="rules-card">
      <p class="intro">
        The rules are simple. Pick <strong>6 teams</strong>. For each win one of
        your teams gets, you earn that team’s
        <strong>points per win</strong>.
        Stronger teams are worth fewer points per win, and underdogs are worth
        more.
      </p>

      <ul class="rules-list">
        <li>
          <span class="rules-badge">1</span>
          <span>
            <strong>X pts per win</strong> — each team has its own value shown
            in the table below.
          </span>
        </li>
        <li>
          <span class="rules-badge">2</span>
          <span>
            <strong>Playoff wins are doubled</strong> —
            if a team is worth 10 pts per round robin win, their playoff wins
            are worth 20 pts each.
          </span>
        </li>
        <li>
          <span class="rules-badge">3</span>
          <span>
            <strong>+50 bonus points</strong> if one of your teams
            <strong>wins the entire tournament</strong>.
          </span>
        </li>
      </ul>

      <p class="note">
        Every game that counts in the standings (round robin and playoffs)
        will count for points.
      </p>

      <h2 class="table-title">Team Points per Win</h2>

      <div class="table">
        <div class="row header-row">
          <p class="team-cell"><strong>Team</strong></p>
          <p class="location-cell"><strong>Location</strong></p>
          <p class="gender-cell"><strong>Gender</strong></p>
          <p class="points-cell"><strong>Pts / Win</strong></p>
        </div>

        <div
          v-for="team in teams"
          :key="team.teamName"
          class="row body-row"
        >
          <p class="team-cell">
            <span class="team-main">
              <img
                v-if="team.image"
                :src="team.image"
                :alt="team.name"
                class="flag"
              />
              <span class="team-name">{{ team.name }}</span>
            </span>
            <span class="team-sub">{{ team.subName }}</span>
          </p>
          <p class="location-cell">
            {{ team.subName }}
          </p>
          <p class="gender-cell">
            <span
              class="gender-pill"
              :class="{
                female: team.gender === Gender.Female,
                male: team.gender === Gender.Male
              }"
            >
              {{ team.gender === Gender.Female ? "Women" : "Men" }}
            </span>
          </p>
          <p class="points-cell">
            <span class="points-value">{{ team.pointsPerWin }} <span class="pts-win">pts/win</span></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { teams, Gender } from "@/router/index"; // adjust path if needed

export default defineComponent({
  name: "Rules",
  data() {
    return {
      teams,
      Gender,
    };
  },
});
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

.rules-card {
  max-width: 960px;
  margin: 30px auto 60px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  padding: 24px 24px 32px;
}
.intro {
  margin: 0 0 16px;
  line-height: 1.6;
  font-size: 15px;
}

.rules-list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}

.rules-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #ececf7;
}

.rules-list li:last-child {
  border-bottom: none;
}

.rules-badge {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  background: #242460;
}

.note {
  font-size: 13px;
  color: #555;
  margin: 4px 0 20px;
  font-style: italic;
}

.table-title {
  font-size: 20px;
  margin: 8px 0 14px;
  color: #242460;
}

.table {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e0e2f2;
  background: #f9f9ff;
}

.row {
  display: grid;
  grid-template-columns: 3fr 2fr 1.4fr 1.2fr;
  padding: 10px 16px;
  align-items: center;
  column-gap: 12px;
}

.header-row {
  background: #242460;
  color: #ffffff;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.body-row:nth-child(odd) {
  background: #ffffff;
}

.body-row:nth-child(even) {
  background: #f1f2ff;
}

.row p {
  margin: 0;
  font-size: 14px;
}

.team-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.team-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.flag {
  width: 26px;
  height: 18px;
  object-fit: contain;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
}

.team-name {
  font-weight: 600;
}

.team-sub {
  font-size: 12px;
  color: #666;
}

.location-cell {
  font-size: 13px;
  color: #555;
}

.gender-cell {
  display: flex;
  align-items: center;
}

.gender-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
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

.points-cell {
  text-align: right;
}

.points-value {
  font-weight: 700;
  font-size: 15px;
  color: #242460;
}
.pts-win {
  font-weight: 400;
  font-size: 12px;
  color: #777;
  margin-left: 4px;
}

/* Responsive tweaks */
@media (max-width: 720px) {
   .rules-card {
    margin: 16px;
    padding: 18px 14px 24px;
  }

  .row {
    grid-template-columns: 3fr 2fr;
    grid-template-rows: auto auto;
    row-gap: 6px;
  }

  .header-row {
    display: none;
  }

  .body-row {
    border-bottom: 1px solid #e0e2f2;
  }

  .body-row:last-child {
    border-bottom: none;
  }

  .location-cell,
  .gender-cell,
  .points-cell {
    font-size: 12px;
  }

  .gender-cell {
    justify-content: flex-start;
  }

  .points-cell {
    text-align: left;
  }
}

</style>
