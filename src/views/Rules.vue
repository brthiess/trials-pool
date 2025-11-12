<template>
  <div class="about">
    <h1>Rules</h1>
    <div class="rules">
      <p>
        The rules are simple. Pick 6 teams, and for each win one of your teams
        get, you get a certain amount of points per win. The amount of points
        you get per win depends on which teams you pick. Better teams get less
        points per win and worse teams get more points per win.
      </p>

      <p>Every draw (including tie-breakers and playoffs) will count.</p>

      <div class="row">
        <p class="province"><strong>Province</strong></p>
        <p class="team-name"><strong>Team</strong></p>
        <p class="points-per-win"><strong>Pts/Win</strong></p>
      </div>
      <div class="row">
        <p class="province">WC1</p>
        <p class="team-name">Fleury</p>
        <p class="points-per-win">1.1</p>
      </div>
      <div class="row">
        <p class="province">WC3</p>
        <p class="team-name">Miskew</p>
        <p class="points-per-win">1.3</p>
      </div>
      <div class="row">
        <p class="province">WC2</p>
        <p class="team-name">Carey</p>
        <p class="points-per-win">1.4</p>
      </div>
      <div class="row">
        <p class="province">NO</p>
        <p class="team-name">McCarville</p>
        <p class="points-per-win">1.7</p>
      </div>
      <div class="row">
        <p class="province">SK</p>
        <p class="team-name">Barker</p>
        <p class="points-per-win">2.8</p>
      </div>
      <div class="row">
        <p class="province">PEI</p>
        <p class="team-name">Birt</p>
        <p class="points-per-win">3.0</p>
      </div>
      <div class="row">
        <p class="province">NB</p>
        <p class="team-name">Crawford</p>
        <p class="points-per-win">3.0</p>
      </div>
      <div class="row">
        <p class="province">NFLD</p>
        <p class="team-name">Hill</p>
        <p class="points-per-win">5.0</p>
      </div>
      <div class="row">
        <p class="province">NU</p>
        <p class="team-name">Macphail</p>
        <p class="points-per-win">12</p>
      </div>

      <br /><br />
      <div class="row">
        <p class="province">CA</p>
        <p class="team-name">Einarson</p>
        <p class="points-per-win">1</p>
      </div>
      <div class="row">
        <p class="province">AB</p>
        <p class="team-name">Walker</p>
        <p class="points-per-win">1.2</p>
      </div>
      <div class="row">
        <p class="province">MB</p>
        <p class="team-name">Zacharias</p>
        <p class="points-per-win">1.8</p>
      </div>
      <div class="row">
        <p class="province">ON</p>
        <p class="team-name">Duncan</p>
        <p class="points-per-win">1.9</p>
      </div>
      <div class="row">
        <p class="province">QC</p>
        <p class="team-name">St. Georges</p>
        <p class="points-per-win">2.0</p>
      </div>
      <div class="row">
        <p class="province">BC</p>
        <p class="team-name">Arsenault</p>
        <p class="points-per-win">3.0</p>
      </div>
      <div class="row">
        <p class="province">NWT</p>
        <p class="team-name">Galusha</p>
        <p class="points-per-win">3.0</p>
      </div>
      <div class="row">
        <p class="province">NS</p>
        <p class="team-name">Black</p>
        <p class="points-per-win">4.5</p>
      </div>
      <div class="row">
        <p class="province">YK</p>
        <p class="team-name">Birnie</p>
        <p class="points-per-win">11</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rules",
};
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 30px 20px;
  background: #242460;
  color: white;
  font-size: 40px;
}
p {
  margin: 20px 0;
  padding: 0 20px;
}
.row {
  display: flex;
}
.row p {
  margin: 0;
}
.province {
  width: 100px;
}
.team-name {
  width: 140px;
}
.about {
  margin-bottom: 100px;
}
</style>
