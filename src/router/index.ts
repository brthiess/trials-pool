import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
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
    subName: "Women",
    image: "/ontario.png",
    pointsPerWin: 1.2,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 1,
    gender: Gender.Female,
    
  },
  {
    name: "Team Black",
    subName: "Halifax, N.S.",
    image: "/nova-scotia.png",
    pointsPerWin: 2.8,
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
    pointsPerWin: 1.8,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 3,
    gender: Gender.Female,
  },
  {
    name: "Team Cameron",
    subName: "St. Adolphe, Man.",
    image: "/manitoba.png",
    pointsPerWin: 3.0,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 4,
    gender: Gender.Female,
  },
  {
    name: "Team Einarson",
    subName: "Gimli, Man.",
    image: "/manitoba.png",
    pointsPerWin: 12,
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
    pointsPerWin: 1.1,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 6,
    gender: Gender.Female,
  },
  {
    name: "Team Skrlik",
    subName: "Calgary, Alta.",
    image: "/alberta.png",
    pointsPerWin: 1.4,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 7,
    gender: Gender.Female,
  },
  {
    name: "Team Sturmay",
    subName: "Edmonton, Alta.",
    image: "/alberta.png",
    pointsPerWin: 1.3,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 8,
    gender: Gender.Female,
  },
  {
    name: "Team Dunstone",
    subName: "Winnipeg, Man.",
    image: "/manitoba.png",
    pointsPerWin: 3.0,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 9,
    gender: Gender.Male,
  },
  {
    name: "Team Epping",
    subName: "Sudbury, Ont.",
    image: "/ontario.png",
    pointsPerWin: 11,
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
    pointsPerWin: 1.9,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 11,
    gender: Gender.Male,
  },
  {
    name: "Team Jacobs",
    subName: "Calgary, Alta.",
    image: "/alberta.png",
    pointsPerWin: 2.0,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 12,
    gender: Gender.Male,
  },
  {
    name: "Team Kleiter",
    subName: "Saskatoon, Sask.",
    image: "/saskatchewan.png",
    pointsPerWin: 3.0,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 13,
    gender: Gender.Male,
  },
  {
    name: "Team Koe",
    subName: "Calgary, Alta.",
    image: "/alberta.png",
    pointsPerWin: 4.5,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 14,
    gender: Gender.Male,
  },
  {
    name: "Team McDonald",
    subName: "Winnipeg, Man.",
    image: "/manitoba.png",
    pointsPerWin: 3.0,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 15,
    gender: Gender.Male,
  },
  {
    name: "Team McEwen",
    subName: "Saskatoon, Sask.",
    image: "/saskatchewan.png",
    pointsPerWin: 1.7,
    wins: 0,
    playoffWins: 0,
    isTournamentChampion: false,
    id: 16,
    gender: Gender.Male,
  },
];

const users: User[] = [
  {
    teamName: "Up Your Arsenault",
    realName: "",
    picks: [6, 11, 15, 8, 1, 14],
    img: "rock.png",
    id: 1,
  },
  {
    teamName: "Wide & Heavy",
    realName: "",
    picks: [15, 12, 3, 1, 8, 6],
    img: "rock.png",
    id: 2,
  },
  {
    teamName: "Cool Rockin' Grandpa",
    realName: "",
    picks: [7, 3, 4, 2, 1, 15],
    img: "rock.png",
    id: 3,
  },
  {
    teamName: "Cool Rockin' Grandma",
    realName: "",
    picks: [11, 1, 13, 15, 8, 6],
    img: "rock.png",
    id: 4,
  },
  {
    teamName: "Ken D.",
    realName: "",
    picks: [15, 2, 7, 8, 6, 3],
    img: "rock.png",
    id: 5,
  },
  {
    teamName: "Manitoba Tuckers",
    realName: "",
    picks: [15, 6, 9, 2, 12, 3],
    img: "rock.png",
    id: 6,
  },
  {
    teamName: "Count 'em up",
    realName: "",
    picks: [15, 8, 6, 4, 13, 1],
    img: "rock.png",
    id: 7,
  },
  {
    teamName: "Manitoba Hearts Sweep Faster",
    realName: "",
    picks: [3, 6, 7, 9, 15, 13],
    img: "rock.png",
    id: 8,
  },
  {
    teamName: "Housekeepers",
    realName: "",
    picks: [1, 8, 3, 9, 15, 13],
    img: "rock.png",
    id: 9,
  },
  {
    teamName: "Sweeping Beauties",
    realName: "",
    picks: [6, 1, 3, 9, 15, 13],
    img: "rock.png",
    id: 10,
  },
  {
    teamName: "TinyTwo",
    realName: "",
    picks: [6, 1, 8, 15, 15, 13],
    img: "rock.png",
    id: 11,
  },
  {
    teamName: "Chance of Fleury",
    realName: "",
    picks: [9, 12, 13, 15, 15, 13],
    img: "rock.png",
    id: 12,
  },
  {
    teamName: "1 against 7",
    realName: "",
    picks: [15, 6, 9, 12, 11, 13],
    img: "rock.png",
    id: 13,
  },
  {
    teamName: "McCarvelous Shot",
    realName: "",
    picks: [1, 3, 6, 12, 16, 13],
    img: "rock.png",
    id: 14,
  },
  {
    teamName: "Sweeping Beauty",
    realName: "",
    picks: [3, 4, 6, 8, 12, 15],
    img: "rock.png",
    id: 15,
  },
  {
    teamName: "Rock Stars",
    realName: "",
    picks: [1, 6, 8, 12, 15, 13],
    img: "rock.png",
    id: 16,
  },
  {
    teamName: "What a Miskew",
    realName: "",
    picks: [3, 8, 12, 15, 15, 13],
    img: "rock.png",
    id: 17,
  },
  {
    teamName: "Curl Power",
    realName: "",
    picks: [1, 6, 11, 15, 15, 13],
    img: "rock.png",
    id: 18,
  },
  {
    teamName: "Rock 'Em",
    realName: "",
    picks: [3, 4, 7, 13, 15, 13],
    img: "rock.png",
    id: 19,
  },
  {
    teamName: "House of Heys",
    realName: "",
    picks: [1, 2, 3, 5, 6, 13],
    img: "rock.png",
    id: 20,
  },
  {
    teamName: "Rolling Stones",
    realName: "",
    picks: [1, 3, 7, 10, 14, 13],
    img: "rock.png",
    id: 21,
  },
  {
    teamName: "Hazel's Picks",
    realName: "",
    picks: [4, 13, 2, 5, 13, 1],
    img: "rock.png",
    id: 22,
  },
  {
    teamName: "Matt's Mistakes",
    realName: "",
    picks: [3, 1, 14, 15, 15, 13],
    img: "rock.png",
    id: 23,
  },
  {
    teamName: "Sheet Disturbers",
    realName: "",
    picks: [16, 13, 1, 3, 6, 12],
    img: "rock.png",
    id: 24,
  },
  {
    teamName: "Picked based on team pictures",
    realName: "",
    picks: [2, 8, 5, 11, 4, 13],
    img: "rock.png",
    id: 25,
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