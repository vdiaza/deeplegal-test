<template>
  <v-app-bar app absolute>
    <div class="d-flex align-center">
      <v-img
        alt="DeepLegal"
        class="shrink mr-2"
        contain
        src="@/assets/logo.png"
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
    darkMode: {
      get() {
        return this.$store.getters.darkMode;
      },
      set(value) {
        this.$vuetify.theme.dark = value;
        this.$store.dispatch("SET_MODE", value);
      }
    },
    lang: {
      get() {
        return this.$store.getters.lang;
      },
      set(value) {
        this.$i18n.locale = value
        this.$store.dispatch("SET_LANG", value);
      }
    }
  }
};
</script>

<style lang="scss">
.lang-selector {
  width: 100px;
  margin-right: 1rem !important;
}
</style>