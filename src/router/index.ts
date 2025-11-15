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
  id: number;
  gender: Gender;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export interface User {
  teamName: string;
  realName: string;
  picks: number[];
  img: string;
  id: number;
}

const teams: Team[] = [
  {
    name: "Team Homan",
    subName: "Ottawa, Ont.",
    image: "/ontario.png",
    pointsPerWin: 8,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 1,
    gender: Gender.Female,
  },
  

  {
    name: "Team Einarson",
    subName: "Gimli, Man.",
    image: "/manitoba.png",
    pointsPerWin: 15,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 5,
    gender: Gender.Female,
  },
  {
    name: "Team Lawes",
    subName: "Winnipeg, Man.",
    image: "/manitoba.png",
    pointsPerWin: 20,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 6,
    gender: Gender.Female,
  },
    {
    name: "Team Cameron",
    subName: "St. Adolphe, Man.",
    image: "/manitoba.png",
    pointsPerWin: 30,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 4,
    gender: Gender.Female,
  },
  {
    name: "Team Black",
    subName: "Halifax, N.S.",
    image: "/nova-scotia.png",
    pointsPerWin: 35,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 2,
    gender: Gender.Female,
  },
  {
    name: "Team Brown",
    subName: "Kamloops, B.C.",
    image: "/bc.png",
    pointsPerWin: 35,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 3,
    gender: Gender.Female,
  },

  {
    name: "Team Sturmay",
    subName: "Edmonton, Alta.",
    image: "/alberta.png",
    pointsPerWin: 35,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 8,
    gender: Gender.Female,
  },
    {
    name: "Team Skrlik",
    subName: "Calgary, Alta.",
    image: "/alberta.png",
    pointsPerWin: 45,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 7,
    gender: Gender.Female,
  },
  {
    name: "Team Dunstone",
    subName: "Winnipeg, Man.",
    image: "/manitoba.png",
    pointsPerWin: 10,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 9,
    gender: Gender.Male,
  },
  {
    name: "Team Jacobs",
    subName: "Calgary, Alta.",
    image: "/alberta.png",
    pointsPerWin: 10,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 12,
    gender: Gender.Male,
  },
  {
    name: "Team Epping",
    subName: "Sudbury, Ont.",
    image: "/ontario.png",
    pointsPerWin: 18,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 10,
    gender: Gender.Male,
  },
  {
    name: "Team Gushue",
    subName: "St. John's, N.L.",
    image: "/newfoundland.png",
    pointsPerWin: 18,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 11,
    gender: Gender.Male,
  },

  {
    name: "Team McEwen",
    subName: "Saskatoon, Sask.",
    image: "/saskatchewan.png",
    pointsPerWin: 25,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 16,
    gender: Gender.Male,
  },
  {
    name: "Team McDonald",
    subName: "Winnipeg, Man.",
    image: "/manitoba.png",
    pointsPerWin: 30,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 15,
    gender: Gender.Male,
  },
  {
    name: "Team Koe",
    subName: "Calgary, Alta.",
    image: "/alberta.png",
    pointsPerWin: 35,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 14,
    gender: Gender.Male,
  },

  {
    name: "Team Kleiter",
    subName: "Saskatoon, Sask.",
    image: "/saskatchewan.png",
    pointsPerWin: 50,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 13,
    gender: Gender.Male,
  },
];

const users: User[] = [
  {
    id: 1,
    teamName: "Hazel's Picks",
    realName: "Hazel",
    picks: [6, 11, 15, 8, 1, 14],
    img: "rock.png",
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
