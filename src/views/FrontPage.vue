<template>
  <v-container class="ma-0 pa-0 wrapper" fluid>
    <v-sheet id="search">
      <v-sheet id="headline" class="display-2">
        <span class="white--text">O tempo é agora. </span
        ><span class="secondary--text">Qual<br />vida você quer viver?</span>
      </v-sheet>
      <SearchForm />
    </v-sheet>
    <ConceptVideo />
    <PropertyScroll
      :title="'Lançamentos'"
      :properties="newProperties"
      class="my-2"
    />
    <PropertyScroll
      :title="'Destaques'"
      :properties="featuredProperties"
      class="my-2"
    />
    <PropertyScroll
      :title="'Recentes'"
      :properties="recentProperties"
      class="my-2"
    />

    <v-sheet class="d-flex justify-space-between primary--text bottom" fluid
      ><span class="bottom-text">Estamos aqui pra ajudar em suas escolhas</span
      ><span><b>Anuncie com a NuDoor:</b> anuncie@nudoor.com.br</span></v-sheet
    >
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SearchForm from '@/components/SearchForm.vue'
import ConceptVideo from '@/components/ConceptVideo.vue'
import PropertyScroll from '@/components/PropertyScroll.vue'
import nudoor from '@/services/PropertyService'

export default {
  name: 'FrontPage',
  components: { SearchForm, ConceptVideo, PropertyScroll },
  data() {
    return {
      listUrl: '/list',
      showPassword: false,
      newProperties: [],
      featuredProperties: [],
      recentProperties: []
    }
  },

  methods: {
    ...mapActions(['fetchProperties']),
    ...mapGetters(['getProperties']),
    addReference() {
      this.searchParams.references.push('')
      this.searchParams.referencesMinutes.push('')
    },
    listProperties() {
      this.$router.push({
        name: 'list',
        params: { searchParams: this.searchParams }
      })
    }
  },
  created() {
    nudoor.getRandomNProperties(12).then(res => (this.newProperties = res.data))
    nudoor
      .getRandomNProperties(12)
      .then(res => (this.featuredProperties = res.data))
    nudoor
      .getRandomNProperties(12)
      .then(res => (this.recentProperties = res.data))
  }
}
</script>

<style>
.wrapper {
  width: 100% !important;
  max-width: 100% !important;
  position: relative;
}
#search {
  width: 100% !important;
  max-width: 100% !important;
  min-height: 770px;
  background: linear-gradient(
      90deg,
      rgba(127, 86, 195, 0.9) 0%,
      rgba(81, 194, 247, 0.9) 121.21%
    ),
    url('../assets/images/frontpage-background.png') no-repeat;
  background-size: cover;
  z-index: 1;
  padding-left: 70px;
  padding-right: 70px;
}
#headline {
  font-weight: bold;
  background: transparent;
  padding-top: 106px;
  margin-bottom: 100px;
  letter-spacing: 1.58256px !important;
}
.bottom-text {
  font-weight: normal;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 1.48194px;
}
.bottom {
  width: 100%;
  max-width: 100% !important;
  padding: 40px 80px;
}
</style>
