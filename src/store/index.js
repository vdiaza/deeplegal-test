import Vue from "vue"
import Vuex from "vuex"
import gql from "graphql-tag"
import { apolloClient } from "@/apollo-vue"
import $vuetify from '@/plugins/vuetify'
import $i18n from '@/i18n'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkMode: false,
    lang: "es",
    search: "",
    countries: [],
    countriesLoading: false,
    regions: [],
    regionsLoading: false,
    currencies: [],
    currenciesLoading: false,
    region: null,
    currency: null,
  },
  mutations: {
    SET_MODE(state, payload) {
      state.darkMode = payload
    },
    SET_LANG(state, payload) {
      state.lang = payload
    },
    SET_SEARCH(state, payload) {
      state.search = payload
    },
    SET_COUNTRIES(state, payload) {
      state.countries = payload
    },
    SET_COUNTRIES_LOADING(state, payload) {
      state.countriesLoading = payload
    },
    SET_REGIONS(state, payload) {
      state.regions = payload
    },
    SET_REGIONS_LOADING(state, payload) {
      state.regionsLoading = payload
    },
    SET_REGION(state, payload) {
      state.region = payload
    },
    SET_CURRENCIES(state, payload) {
      state.currencies = payload
    },
    SET_CURRENCIES_LOADING(state, payload) {
      state.currenciesLoading = payload
    },
    SET_CURRENCY(state, payload) {
      state.currency = payload
    },
  },
  
  actions: {
    SET_MODE({ commit }, payload) {
      $vuetify.framework.theme.isDark = payload;
      commit("SET_MODE", payload)
    },
    SET_LANG({ commit }, payload) {
      $vuetify.framework.lang.current = payload
      $i18n.locale = payload;
      commit("SET_LANG", payload)
    },
    SET_SEARCH({ commit }, payload) {
      commit("SET_SEARCH", payload) 
    },
    FETCH_INITIAL_DATA({ dispatch }) {
      dispatch("FETCH_COUNTRIES")
      dispatch("FETCH_REGIONS")
      dispatch("FETCH_CURRENCIES")
    },
    async FETCH_COUNTRIES({ commit }) {
      commit("SET_COUNTRIES_LOADING", true)
      const response = await apolloClient.query({
        query: gql`
          query {
            countries: Country {
              name
              nameTranslations(filter: { languageCode_in: ["es"] }) {
                value
              }
              subregion {
                _id
                name
              }
              currencies {
                _id
                name
                symbol
              }
              flag {
                emoji
              }
              timezones {
                name
              }
            }
          }
        `,
      })
      commit("SET_COUNTRIES_LOADING", false)
      commit("SET_COUNTRIES", response.data.countries)
    },
    async SET_REGION({ commit }, payload) {
      commit("SET_REGION", payload)
    },
    async FETCH_REGIONS({ commit }) {
      commit("SET_REGIONS_LOADING", true)
      const response = await apolloClient.query({
        query: gql`
          query {
            regions: Region {
              _id
              name
              subregions {
                _id
                name
              }
            }
          }
        `,
      })
      commit("SET_REGIONS_LOADING", false)
      commit("SET_REGIONS", response.data.regions)
    },
    async SET_CURRENCY({ commit }, payload) {
      commit("SET_CURRENCY", payload)
    },
    async FETCH_CURRENCIES({ commit }) {
      commit("SET_CURRENCIES_LOADING", true)
      const response = await apolloClient.query({
        query: gql`
          query {
            currencies: Currency {
              _id
              name
              symbol
              code
            }
          }
        `,
      })
      commit("SET_CURRENCIES_LOADING", false)
      commit("SET_CURRENCIES", response.data.currencies)
    },
  },
  getters: {
    darkMode: (state) => state.darkMode,
    lang: (state) => state.lang,
    countries: (state) => state.countries,
    countriesLoading: (state) => state.countriesLoading,
    regions: (state) => state.regions,
    regionsLoading: (state) => state.regionsLoading,
    region: (state) => state.region,
    currencies: (state) => state.currencies,
    currenciesLoading: (state) => state.currenciesLoading,
    currency: (state) => state.currency,
    search: (state) => state.search,
  },
})
