<template>
  <div class="filters">
    <v-row>
      <v-col cols="12" sm="6" lg="4">
        <v-text-field :label="$t('Buscar por país')" v-model="search" outlined></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <v-select
          :label="$t('Filtrar por moneda')"
          outlined
          v-model="currency"
          :items="currencies"
          item-text="name"
          item-value="_id"
          ref="currency"
        >
          <template v-slot:prepend-item>
            <v-list-item @click="emptySelection('currency')">
              <v-list-item-content>
                <v-list-item-title>{{$t('Ver Todos')}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
          </template>
            <template v-slot:item="{item}">
              {{ item.name }} ({{item.symbol}})
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <v-select
          :label="$t('Filtrar por zona')"
          outlined
          v-model="region"
          :items="regions"
          item-text="name"
          item-value="_id"
          ref="region"
        >
          <template v-slot:prepend-item>
            <v-list-item @click="emptySelection('region')">
              <v-list-item-content>
                <v-list-item-title>{{$t('Ver Todos')}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
          </template>
          <template v-slot:item="{item}">
            <strong v-if="item.disabled">{{item.name}}</strong>
            <small v-else>{{item.name}}</small>
          </template>
        </v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    currencies() {
      return this.$store.getters.currencies;
    },
    regions() {
      const regions = [];
      this.$store.getters.regions.map(item => {
        regions.push({ name: item.name, _id: item._id, disabled: true });
        item.subregions.map(item => {
          regions.push({ name: item.name, _id: item._id });
        });
      });
      return regions;
    },
    search: {
      get() {
        return this.$store.getters.search;
      },
      set(value) {
        return this.$store.dispatch("SET_SEARCH", value);
      }
    },
    region: {
      get() {
        return this.$store.getters.region;
      },
      set(value) {
        return this.$store.dispatch("SET_REGION", value);
      }
    },
    currency: {
      get() {
        return this.$store.getters.currency;
      },
      set(value) {
        return this.$store.dispatch("SET_CURRENCY", value);
      }
    }
  },
  methods: {
      emptySelection(value){
          this[value] = null
          this.$refs[value].blur();
      }
  }
};
</script>