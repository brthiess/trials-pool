import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Rules from "../views/Rules.vue";
import Stats from "../views/Stats.vue";

export interface Team {
  name: string;
  subName: string;
  image: string;
  pointsPerWin: number;
  wins: number;
  playoffWins: number;
  isTournamentChampion: boolean;
  gender: Gender;
  teamName: TeamName;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum TeamName {
  TeamHoman = "Team Homan",
  TeamEinarson = "Team Einarson",
  TeamLawes = "Team Lawes",
  TeamCameron = "Team Cameron",
  TeamBlack = "Team Black",
  TeamBrown = "Team Brown",
  TeamSturmay = "Team Sturmay",
  TeamSkrlik = "Team Skrlik",
  TeamDunstone = "Team Dunstone",
  TeamJacobs = "Team Jacobs",
  TeamEpping = "Team Epping",
  TeamGushue = "Team Gushue",
  TeamMcEwen = "Team McEwen",
  TeamMcDonald = "Team McDonald",
  TeamKoe = "Team Koe",
  TeamKleiter = "Team Kleiter",
}

export interface User {
  teamName: string;
  realName: string;
  picks: Array<TeamName>;
  img: string;
  id: number;
}

const teams: Team[] = [
  {
    name: "Team Homan",
    subName: "Ottawa, Ont.",
    image: "/ontario.png",
    pointsPerWin: 7,
    wins: 5,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Female,
    teamName: TeamName.TeamHoman,
  },
  

  {
    name: "Team Einarson",
    subName: "Gimli, Man.",
    image: "/manitoba.png",
    pointsPerWin: 15,
    wins: 6,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Female,
    teamName: TeamName.TeamEinarson,
  },
  {
    name: "Team Lawes",
    subName: "Winnipeg, Man.",
    image: "/manitoba.png",
    pointsPerWin: 20,
    wins: 3,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Female,
    teamName: TeamName.TeamLawes,
  },
    {
    name: "Team Cameron",
    subName: "St. Adolphe, Man.",
    image: "/manitoba.png",
    pointsPerWin: 30,
    wins: 1,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Female,
    teamName: TeamName.TeamCameron,
  },
  {
    name: "Team Black",
    subName: "Halifax, N.S.",
    image: "/nova-scotia.png",
    pointsPerWin: 35,
    wins: 3,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Female,
    teamName: TeamName.TeamBlack,
  },
  {
    name: "Team Brown",
    subName: "Kamloops, B.C.",
    image: "/bc.png",
    pointsPerWin: 35,
    wins: 1,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Female,
    teamName: TeamName.TeamBrown,
  },

  {
    name: "Team Sturmay",
    subName: "Edmonton, Alta.",
    image: "/alberta.png",
    pointsPerWin: 35,
    wins: 3,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Female,
    teamName: TeamName.TeamSturmay,
  },
    {
    name: "Team Skrlik",
    subName: "Calgary, Alta.",
    image: "/alberta.png",
    pointsPerWin: 45,
    wins: 2,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Female,
    teamName: TeamName.TeamSkrlik,
  },
  {
    name: "Team Dunstone",
    subName: "Winnipeg, Man.",
    image: "/manitoba.png",
    pointsPerWin: 10,
    wins: 4,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Male,
    teamName: TeamName.TeamDunstone,
  },
  {
    name: "Team Jacobs",
    subName: "Calgary, Alta.",
    image: "/alberta.png",
    pointsPerWin: 10,
    wins: 4,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Male,
    teamName: TeamName.TeamJacobs,
  },
  {
    name: "Team Epping",
    subName: "Sudbury, Ont.",
    image: "/ontario.png",
    pointsPerWin: 18,
    wins: 1,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Male,
    teamName: TeamName.TeamEpping,
  },
  {
    name: "Team Gushue",
    subName: "St. John's, N.L.",
    image: "/newfoundland.png",
    pointsPerWin: 20,
    wins: 4,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Male,
    teamName: TeamName.TeamGushue,
  },

  {
    name: "Team McEwen",
    subName: "Saskatoon, Sask.",
    image: "/saskatchewan.png",
    pointsPerWin: 25,
    wins: 3,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Male,
    teamName: TeamName.TeamMcEwen,
  },
  {
    name: "Team McDonald",
    subName: "Winnipeg, Man.",
    image: "/manitoba.png",
    pointsPerWin: 35,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Male,
    teamName: TeamName.TeamMcDonald,
  },
  {
    name: "Team Koe",
    subName: "Calgary, Alta.",
    image: "/alberta.png",
    pointsPerWin: 35,
    wins: 3,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Male,
    teamName: TeamName.TeamKoe,
  },

  {
    name: "Team Kleiter",
    subName: "Saskatoon, Sask.",
    image: "/saskatchewan.png",
    pointsPerWin: 50,
    wins: 1,
    playoffWins: 0,
    isTournamentChampion: false,
    gender: Gender.Male,
    teamName: TeamName.TeamKleiter,
  },
];

const users: User[] = [
  {
    id: 1,
    teamName: "Hazel's Picks",
    realName: "Hazel",
    picks: [TeamName.TeamHoman, TeamName.TeamKoe, TeamName.TeamGushue, TeamName.TeamEinarson, TeamName.TeamJacobs, TeamName.TeamSturmay],
    img: "rock.png",
  },
  {
    id: 2,
    teamName: "Broom for Improvement",
    realName: "Alison",
    picks: [TeamName.TeamHoman, TeamName.TeamEpping, TeamName.TeamJacobs, TeamName.TeamBlack, TeamName.TeamSturmay, TeamName.TeamBrown],
    img: "broom.png",
  },
  {
    id: 3,
    teamName: "Lawes & no order ",
    realName: "Nevin",
    picks: [TeamName.TeamEinarson, TeamName.TeamCameron, TeamName.TeamLawes, TeamName.TeamGushue, TeamName.TeamMcEwen, TeamName.TeamKoe],
    img: "third.png",
  },
  {
    id: 4,
    teamName: "NOORDZEE",
    realName: "Emile",
    picks: [TeamName.TeamHoman, TeamName.TeamSkrlik, TeamName.TeamSturmay, TeamName.TeamDunstone, TeamName.TeamGushue, TeamName.TeamMcEwen],
    img: "noordzee.png",
  },
  {
    id: 5,
    teamName: "Rock On",
    realName: "Dennis",
    picks: [TeamName.TeamDunstone, TeamName.TeamJacobs, TeamName.TeamEpping, TeamName.TeamEinarson, TeamName.TeamLawes, TeamName.TeamBlack],
    img: "rockon.png",
  },
  {
    id: 6,
    teamName: "Broom with a View",
    realName: "Lori",
    picks: [TeamName.TeamEinarson, TeamName.TeamLawes, TeamName.TeamCameron, TeamName.TeamKoe, TeamName.TeamDunstone, TeamName.TeamMcDonald],
    img: "broomview.png",
  },
  {
    id: 7,
    teamName: "Button Buster",
    realName: "Jason",
    picks: [TeamName.TeamEinarson, TeamName.TeamCameron, TeamName.TeamLawes, TeamName.TeamEpping, TeamName.TeamMcEwen, TeamName.TeamJacobs],
    img: "buttonbuster.png",
  },
  {
    id: 8,
    teamName: "Zoey and the Tiny2",
    realName: "Zoey",
    picks: [TeamName.TeamHoman, TeamName.TeamEinarson, TeamName.TeamBlack, TeamName.TeamDunstone, TeamName.TeamEpping, TeamName.TeamMcEwen],
    img: "zoey.png",
  },
  {
    id: 9,
    teamName: "Jetstones",
    realName: "Nic",
    picks: [TeamName.TeamHoman, TeamName.TeamCameron, TeamName.TeamBrown, TeamName.TeamDunstone, TeamName.TeamJacobs, TeamName.TeamGushue],
    img:"",
  },
  {
    id: 10,
    teamName: "Team Rock'n Roll",
    realName: "Louise",
    picks: [TeamName.TeamHoman, TeamName.TeamEinarson, TeamName.TeamSturmay, TeamName.TeamEpping, TeamName.TeamJacobs, TeamName.TeamMcEwen],
    img:"",
  },
  {
    id: 11,
    teamName: "Jimmy Jazz",
    realName: "Kevin",
    picks: [TeamName.TeamLawes, TeamName.TeamCameron, TeamName.TeamEinarson, TeamName.TeamJacobs, TeamName.TeamEpping, TeamName.TeamGushue],
    img:"",
  },
  {
    id: 12,
    teamName: "Chinese Takeout",
    realName: "Bernie & Linda",
    picks: [TeamName.TeamHoman, TeamName.TeamSturmay, TeamName.TeamBlack, TeamName.TeamDunstone, TeamName.TeamMcEwen, TeamName.TeamGushue],
    img:"",
  },
  {
    id: 13,
    teamName: "Curl Power",
    realName: "Bernie",
    picks: [TeamName.TeamHoman, TeamName.TeamSturmay, TeamName.TeamBrown, TeamName.TeamDunstone, TeamName.TeamJacobs, TeamName.TeamGushue],
    img:"",
  },
  {
    id: 14,
    teamName: "Painful Kidney Stones",
    realName: "Matt",
    picks: [TeamName.TeamHoman, TeamName.TeamCameron, TeamName.TeamSkrlik, TeamName.TeamKoe, TeamName.TeamJacobs, TeamName.TeamGushue],
    img:"",
  },
  {
    id: 15,
    teamName: "Get Your Sheet Together",
    realName: "Julie",
    picks: [TeamName.TeamHoman, TeamName.TeamGushue, TeamName.TeamJacobs, TeamName.TeamEinarson, TeamName.TeamMcEwen, TeamName.TeamKoe],
    img:"",
  },
  {
    id: 16,
    teamName: "Sheet Happens",
    realName: "Jarred",
    picks: [TeamName.TeamDunstone, TeamName.TeamKoe, TeamName.TeamBlack, TeamName.TeamSturmay, TeamName.TeamMcEwen, TeamName.TeamEinarson],
    img:"",
  },
  {
    id: 17,
    teamName: "Marie",
    realName: "Marie",
    picks: [TeamName.TeamHoman, TeamName.TeamEinarson, TeamName.TeamCameron, TeamName.TeamDunstone, TeamName.TeamGushue, TeamName.TeamMcDonald],
    img:"",
  },
];

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Leaderboard",
    component: Home,
    props: { users, teams },
  },
  {
    path: "/player/:id",
    name: "Player",
    component: About,
    props: { users, teams },
  },
  {
    path: "/stats/",
    name: "Stats",
    component: Stats,
    props: { users, teams },
  },
  {
    path: "/rules/",
    name: "Rules",
    component: Rules,
    props: { users, teams },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
export { teams, users };





