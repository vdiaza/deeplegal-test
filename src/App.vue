<template>
  <v-app :dark="$store.getters.darkMode">
    <Navbar />
    <v-main>
      <CountryFilter :currencies="[]" />
      <CountryTable :items="[]" />
    </v-main>
    <v-footer absolute app class="d-flex justify-center">
      <span>© 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import CountryFilter from "./components/CountryFilter";
import CountryTable from "./components/CountryTable";
import Navbar from "./components/Navbar";

export default {
  name: "App",

  components: {
    CountryFilter,
    CountryTable,
    Navbar
  },

  mounted() {
    this.$store.dispatch("FETCH_INITIAL_DATA");
  }
};
</script>

<style lang="scss">
.v-main {
  width: 1200px;
  max-width: calc(100% - 30px);
  margin: 2.5rem auto;
}
</style>