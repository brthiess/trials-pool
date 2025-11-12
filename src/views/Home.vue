<template>
  <div class="home">
    <Leaderboard :teams="teams" :users="users" />
  </div>
</template>

<script>
// @ is an alias to /src
import Leaderboard from "@/components/Leaderboard.vue";

export default {
  name: "Home",
  components: {
    Leaderboard,
  },
  props: {
    teams: Array,
    users: Array,
  },
};
</script>
