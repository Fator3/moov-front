<template>
  <v-sheet id="search-form">
    <v-row>
      <v-col
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
      <v-col
        ><label>Qual tipo?</label
        ><v-select
          solo
          :items="['Apartamento', 'Casa', 'Comercial']"
          placeholder="Selecione"
          v-model="searchParams.type"
        ></v-select
      ></v-col>
      <v-col
        ><label>Onde procura seu imóvel?</label
        ><v-autocomplete
          solo
          v-model="searchParams.city"
          :items="items"
          item-text="nome"
          item-value="id"
          :search-input.sync="search"
          :loading="isLoading"
          hide-no-data
          hide-selected
          return-object
          placeholder="Digite a cidade"
        ></v-autocomplete
      ></v-col>
    </v-row>
    <v-row v-for="(reference, index) in references" :key="'ref' + index">
      <v-col
        ><label>Ponto de referência</label
        ><v-text-field
          solo
          placeholder="Adicione uma referência"
          v-model="reference.address"
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
      <v-col
        ><label>Tempo em minutos</label
        ><v-text-field
          solo
          placeholder="Até a referência"
          v-model="reference.time"
        ></v-text-field
      ></v-col>
      <v-col
        ><label>Meio de transporte</label
        ><v-select
          solo
          :items="['Carro', 'Transporte público', 'A pé']"
          placeholder="Selecione"
          v-model="reference.trnasport"
        ></v-select
      ></v-col>
    </v-row>
    <v-row>
      <v-col></v-col>
      <v-col></v-col>
      <v-col class="d-flex justify-space-between search-buttons">
        <v-btn
          color="white"
          large
          class="text-none flex-grow-1 mr-3"
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
  props: ['searchInput'],
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
          transport: ''
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
              ' / ' +
              entry.microrregiao.mesorregiao.UF.sigla
            : entry.nome + ' / ' + entry.microrregiao.mesorregiao.UF.sigla

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
        })
        .finally(() => (this.isLoading = false))
    }
  },
  methods: {
    addReference() {
      this.references.push({ address: '', time: '', transport: '' })
    },
    clean() {
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
        references: []
      }
    },
    searchProperties() {
      this.searchParams.references = this.references
      this.$router.push({
        name: 'list',
        params: { searchParams: this.searchParams }
      })
    }
  },
  created() {
    if (this.searchInput) {
      this.searchParams = this.searchInput
      this.references = this.searchParams.references
    }
  }
}
</script>

<style>
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
</style>
