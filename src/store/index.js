import Vue from "vue"
import Vuex from "vuex"

import gql from "graphql-tag"

import { apolloClient } from "@/apollo-vue"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkMode: false,
    lang: "es",
    search: "",
    countries: [],
    regions: [],
    currencies: [],
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
    SET_REGIONS(state, payload) {
      state.regions = payload
    },
    SET_REGION(state, payload) {
      state.region = payload
    },
    SET_CURRENCIES(state, payload) {
      state.currencies = payload
    },
    SET_CURRENCY(state, payload) {
      state.currency = payload
    },
  },
  actions: {
    SET_MODE({ commit }, payload) {
      commit("SET_MODE", payload)
    },
    SET_LANG({ commit }, payload) {
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
      const response = await apolloClient.query({
        query: gql`
          query {
            countries: Country {
              name
              subregion {
                _id
                name
                region {
                  _id
                  name
                }
              }
              currencies {
                _id
                name
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

      commit("SET_COUNTRIES", response.data.countries)
    },
    async SET_REGION({ commit }, payload) {
      commit("SET_REGION", payload)
    },
    async FETCH_REGIONS({ commit }) {
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
      // response.data.regions.unshift({ name: "", _id: null })
      commit("SET_REGIONS", response.data.regions)
    },
    async SET_CURRENCY({ commit }, payload) {
      commit("SET_CURRENCY", payload)
    },
    async FETCH_CURRENCIES({ commit }) {
      const response = await apolloClient.query({
        query: gql`
          query {
            currencies: Currency {
              _id
              name
            }
          }
        `,
      })
      // response.data.currencies.unshift({ name: "", _id: null })
      commit("SET_CURRENCIES", response.data.currencies)
    },
  },
  getters: {
    darkMode: (state) => state.darkMode,
    lang: (state) => state.lang,
    countries: (state) => state.countries,
    regions: (state) => state.regions,
    region: (state) => state.region,
    currencies: (state) => state.currencies,
    currency: (state) => state.currency,
    search: (state) => state.search,
  },
})
