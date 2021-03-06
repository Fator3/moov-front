<template>
  <v-sheet id="search-form">
    <v-row class="mx-0">
      <v-col class="pb-0" :cols="$vuetify.breakpoint.smAndUp ? 4 : 12"
        ><label>O que você precisa?</label
        ><v-select
          solo
          :items="[
            { text: 'Alugar', value: true },
            { text: 'Comprar', value: false }
          ]"
          placeholder="Selecione"
          v-model="searchParams.isRent"
        ></v-select
      ></v-col>
      <v-col class="pb-0" :cols="$vuetify.breakpoint.smAndUp ? 4 : 12"
        ><label>Qual tipo?</label
        ><v-select
          solo
          :items="['Apartamento', 'Casa', 'Comercial']"
          placeholder="Selecione"
          v-model="searchParams.type"
        ></v-select
      ></v-col>
      <v-col class="pb-0" :cols="$vuetify.breakpoint.smAndUp ? 4 : 12"
        ><label>Onde procura seu imóvel?</label
        ><v-autocomplete
          solo
          v-model="searchParams.city"
          :value="searchParams.city"
          :items="items"
          item-text="nome"
          item-value="nome"
          :search-input.sync="search"
          :loading="isLoading"
          hide-no-data
          hide-selected
          placeholder="Digite a cidade"
        ></v-autocomplete
      ></v-col>
    </v-row>
    <v-row
      v-for="(reference, index) in references"
      :key="'ref' + index"
      class="reference-row mx-0"
      :class="{ 'mb-4': $vuetify.breakpoint.xs }"
    >
      <v-col class="pb-0" :cols="$vuetify.breakpoint.smAndUp ? 4 : 12"
        ><label v-if="index == 0">Ponto de referência</label
        ><v-text-field
          solo
          placeholder="Ex: Sua academia, seu trabalho, sua faculdade, metrô"
          v-model="reference.address"
        >
          <v-icon
            v-if="references.length > 1"
            slot="append"
            color="primary"
            @click="references.splice(index, 1)"
            title="Remover referência"
            >mdi-minus-circle-outline</v-icon
          >
          <v-icon
            slot="append"
            color="primary"
            @click="addReference()"
            title="Adicionar mais um ponto de referência"
            >mdi-plus-circle-outline</v-icon
          >
        </v-text-field></v-col
      >
      <v-col class="pb-0" :cols="$vuetify.breakpoint.smAndUp ? 4 : 12"
        ><label v-if="index == 0">Tempo em minutos</label
        ><v-text-field
          solo
          type="number"
          placeholder="Até a referência"
          v-model="reference.time"
        ></v-text-field
      ></v-col>
      <v-col class="pb-0" :cols="$vuetify.breakpoint.smAndUp ? 4 : 12"
        ><label v-if="index == 0">Meio de transporte</label
        ><v-select
          solo
          :items="[
            { text: 'Carro', value: 'car' },
            { text: 'Transporte público', value: 'bus' },
            { text: 'A pé', value: 'pedestrian' }
          ]"
          placeholder="Selecione"
          v-model="reference.transport"
        ></v-select
      ></v-col>
    </v-row>
    <v-row class="mx-0 mt-1" justify="end">
      <v-col
        md="4"
        lg="4"
        sm="8"
        xs="12"
        class="d-flex search-buttons mb-8"
        :class="{ 'flex-column': $vuetify.breakpoint.xs }"
      >
        <v-btn
          color="white"
          large
          class="text-none flex-grow-1"
          :class="$vuetify.breakpoint.smAndUp ? 'mr-3' : 'mb-3'"
          @click="clean()"
          >Limpar</v-btn
        >
        <v-btn
          color="primary"
          large
          class="text-none flex-grow-1"
          @click="searchProperties()"
          >Buscar</v-btn
        >
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script>
import nudoor from '@/services/PropertyService'
export default {
  name: 'SearchForm',
  props: ['searchInput', 'origin'],
  data() {
    return {
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      search: null,
      references: [
        {
          address: '',
          time: '',
          transport: '',
          routeTime: 0
        }
      ],
      searchParams: {
        isRent: null,
        type: null,
        city: null,
        references: []
      }
    }
  },
  computed: {
    fields() {
      if (!this.model) return []

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a'
        }
      })
    },
    items() {
      return this.entries.map(entry => {
        const Description =
          entry.nome.length > this.descriptionLimit
            ? entry.nome.slice(0, this.descriptionLimit) +
              '...' +
              ' - ' +
              entry.microrregiao.mesorregiao.UF.sigla
            : entry.nome + ' - ' + entry.microrregiao.mesorregiao.UF.sigla

        return Object.assign({}, entry, { nome: Description, id: entry.id })
      })
    }
  },

  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      nudoor
        .getCities()
        .then(res => {
          this.entries = res.data
        })
        .catch(err => {
          console.log(err)
          console.log(val)
        })
        .finally(() => (this.isLoading = false))
    }
  },
  methods: {
    addReference() {
      this.$ga.event('button', 'click', 'add-reference')
      this.references.push({
        address: '',
        time: '',
        transport: '',
        routeTime: 0
      })
    },
    clean() {
      this.$ga.event('button', 'click', 'clear-search')
      this.references = [
        {
          address: '',
          time: '',
          transport: ''
        }
      ]
      this.searchParams = {
        isRent: null,
        type: null,
        city: null,
        references: this.references
      }
    },
    searchProperties() {
      this.$ga.event('button', 'click', 'search')
      this.$ga.event('search', 'search', this.origin, {
        dimension1: this.searchParams.city,
        dimension2: this.searchParams.type,
        dimension3: this.searchParams.isRent,
        dimension4: JSON.stringify(this.references)
      })
      this.searchParams.isRent =
        this.searchParams.isRent == null ? true : this.searchParams.isRent

      this.references = this.references
        .filter(
          r =>
            r.address != null &&
            r.address.trim().length > 0 &&
            !isNaN(parseInt(r.time))
        )
        .map(r => ({
          address: r.address,
          time: parseInt(r.time),
          transport: r.transport == null ? 'car' : r.transport,
          routeTime: 0
        }))

      this.searchParams.references = [...this.references]
      this.$emit('search', { ...this.searchParams })

      if (this.references.length === 0) {
        this.references.push({
          address: '',
          time: '',
          transport: '',
          routeTime: 0
        })
      }
    }
  },
  created() {
    if (this.searchInput) {
      this.searchParams = { ...this.searchInput }
      this.references = [...this.searchParams.references]
      if (this.references.length === 0) {
        this.references.push({
          address: '',
          time: '',
          transport: '',
          routeTime: 0
        })
      }
    }
  }
}
</script>

<style scoped>
#search-form {
  background: transparent;
}
#search-form label {
  color: white;
  font-weight: normal;
}
.search-buttons button {
  border-radius: 7px;
}
label {
  display: block;
  position: relative;
}
</style>
<style>
.reference-row .v-text-field__details {
  display: none !important;
}
</style>
