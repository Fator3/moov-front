<template>
  <div>
    </br>
    <h1>Aluguel rápido, online e seguro</h1>

    <v-card width="400" class="mx-auto mt-5">
      <v-card-text>
        <v-form>
          <v-select :items="cityItems" label="Cidade" prepend-icon="mdi-map" />
          <v-select :items="districtItems" label="Bairro" prepend-icon="mdi-map-marker-radius" />
          <v-text-field
            style="float: left;"
            label="Valor"
            prepend-icon="mdi-cash-multiple"
          />
          <v-text-field
            label="Quartos"
            v-model="searchParams.rooms"
            prepend-icon="mdi-hotel"
          />
          <v-divider></v-divider>
          <span>Referências</span>
          <div
            v-for="(reference, index) in searchParams.references"
            :key="index"
            class="row"
          >
            <div class="col-md-6">
              <v-text-field v-model="searchParams.references[index]" label="Endereço" />
            </div>
            <div class="col-md-3">
              <v-text-field label="Minutes" />
            </div>
            <div class="col-md-3">
              <v-btn color="info" v-on:click="addReference">+</v-btn>
            </div>
          </div>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions id="find-div">
        <v-btn color="success" v-on:click="search">Encontrar imóveis</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      listUrl: '/list',
      showPassword: false,
      searchParams: {
        rooms: '',
        references: ['']
      },
      cityItems: [{text: 'Todas as cidades', value: 'Todas as cidades'}],
      districtItems: [{text: 'Todos os bairros', value: 'Todos os bairros'}]
    }
  },
  methods: {
    ...mapActions(['fetchProperties']),
    ...mapGetters(['getProperties']),
    addReference() {
      this.searchParams.references.push('')
    },
    search() {
      this.$router.push({
        name: 'list',
        params: { searchParams: this.searchParams }
      })
    }
  }
}
</script>

<style>
#find-div {
  justify-content: center;
}
</style>
