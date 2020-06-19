<template>
  <v-app :dark="$store.getters.darkMode">
    <Navbar />
    <v-main>
      <CountryFilter />
      <CountryTable :key="countryTableKey" />
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
  data(){
    return{
      countryTableKey: 0,
    }
  },
  watch: {
    lang() {
      // necesary to change rendered texts in table.
      this.countryTableKey++;
    }
  },
  mounted() {
    this.$store.dispatch("FETCH_INITIAL_DATA");
  },
  computed: {
    lang() {
      return this.$store.getters.lang;
    }
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