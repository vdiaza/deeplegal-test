<template>
  <v-data-table
    :headers="headers"
    :items="filteredCountries"
    :loading="$apollo.loading"
    class="elevation-1"
  >
    <template v-slot:item.time="{ item }">{{ item.timezones[0].name | time }}</template>
  </v-data-table>
</template>

<script>
Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "flag.emoji"
        },
        { text: "País", value: "name" },
        { text: "Moneda", value: "currencies[0].name" },
        { text: "Hora", value: "time" }
      ]
    };
  },
  computed: {
    ...mapGetters(["currency", "countries", "region", "search"]),
    filteredCountries() {
      const query = this.search.toLowerCase();
      if (!this.countries.length) return [];
      return this.countries.filter(item => {
        let currency = true,
          name = true,
          region = true;
        if (this.currency) {
          currency = item.currencies[0]._id == this.currency;
        }
        if (this.region && item.subregion) {
          region = item.subregion._id == this.region;
        }
        if (query.length) {
          name =
            item.name
              .toString()
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .indexOf(query) >= 0;
        }
        if (currency && name && region) {
          return true;
        }
      });
    }
  },
  filters: {
    time(value) {
      const d = new Date();
      const utc = d.getTime() + d.getTimezoneOffset() * 60000;
      const offset = value
        .replace("UTC", "")
        .replace(":", ".")
        .replace("3", "5");
      const nd = new Date(utc + 3600000 * offset);

      return `${nd.getHours().pad(2)}:${nd.getMinutes().pad(2)}`;
    }
  }
};
</script>