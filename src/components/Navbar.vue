<template>
  <v-app-bar app absolute>
    <div class="d-flex align-center">
      <v-img
        alt="DeepLegal"
        class="shrink mr-2"
        contain
        :src="logo"
        transition="scale-transition"
        width="120"
      />
    </div>

    <v-spacer></v-spacer>

    <div class="d-flex align-center">
      <v-select
        class="lang-selector"
        v-model="lang"
        :items="languages"
        hide-details
        width="20"
        outlined
        dense
      ></v-select>
      <v-switch
        class="switch"
        inset
        v-model="darkMode"
        prepend-icon="mdi-weather-sunny"
        append-icon="mdi-weather-night"
        hide-details
      ></v-switch>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      languages: [
        { text: "🇨🇱", value: "es" },
        { text: "🇺🇸", value: "en" }
      ]
    };
  },
  computed: {
    logo() {
      return require(`@/assets/${this.darkMode ? "logo-dark" : "logo"}.png`);
    },
    darkMode: {
      get() {
        return this.$store.getters.darkMode;
      },
      set(value) {
        this.$store.dispatch("SET_MODE", value);
      }
    },
    lang: {
      get() {
        return this.$store.getters.lang;
      },
      set(value) {
        this.$store.dispatch("SET_LANG", value);
      }
    }
  }
};
</script>

<style lang="scss">
.lang-selector {
  width: 80px;
  margin-right: 1rem !important;
}
.switch {
  .v-input__append-outer {
    margin-left: -5px;
  }
}
</style>