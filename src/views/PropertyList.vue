<template>
  <v-container class="ma-0 pa-0 wrapper" fluid>
    <v-sheet id="search" class="py-8">
      <SearchForm :searchInput="searchParams" v-on:search="loadNewProperties" />
    </v-sheet>
    <v-container fluid class="search-result pt-8">
      <span class="total">{{
        `${this.properties.length} imóveis para ${
          this.searchParams.isRent ? 'alugar' : 'comprar'
        }`
      }}</span>
      <PropertyCard
        v-for="(property, index) in loadedProperties"
        :property="property"
        :isRent="searchParams.isRent"
        :key="'prop' + index"
      />
    </v-container>
    <scroll-loader :loader-method="getMoreProperties" :loader-disable="disable">
    </scroll-loader>
  </v-container>
</template>

<script>
import PropertyCard from '@/components/PropertyCard.vue'
import { mapGetters, mapActions } from 'vuex'
import PropertyService from '@/services/PropertyService'
import SearchForm from '@/components/SearchForm.vue'
import pics from '@/pics.js'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  routeTo.params.page = currentPage
  next()
}
export default {
  data() {
    return {
      properties: [],
      loadedProperties: [],
      disable: false,
      maxIterations: 5,
      currentIndex: 0,
      isLoading: false
    }
  },
  props: {
    page: {
      type: Number,
      required: true
    },
    searchParams: {
      type: Object
    }
  },
  components: {
    PropertyCard,
    SearchForm
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  methods: {
    ...mapGetters(['getProperties']),
    ...mapActions(['fetchProperties']),
    async getMoreProperties() {
      if (this.properties.length == 0 || this.isLoading) {
        return
      }
      this.$ga.event('property', 'scroll', 'list')

      const delay = interval =>
        new Promise(resolve => setTimeout(resolve, interval))
      await delay(1000)
      this.loadDistances()
    },
    async loadDistances() {
      this.isLoading = true
      for (var i = 0; i < this.maxIterations; i++) {
        if (this.currentIndex > this.properties.length - 1) {
          this.disable = true
          break
        }

        let property = {
          ...this.properties[this.currentIndex++],
          references: this.searchParams.references.map(r => ({ ...r }))
        }
        const propertLocation = {
          latitude: property.latitude,
          longitude: property.longitude,
          secondsToArrive: 0
        }
        const delay = interval =>
          new Promise(resolve => setTimeout(resolve, interval))
        await delay(500 * property.references.length)

        property.references.forEach(reference => {
          const distancePost = {
            property: propertLocation,
            address: reference.address,
            transport: reference.transport
          }

          PropertyService.getDistanceProperties(distancePost).then(result => {
            const time = result.data[1].secondsToArrive / 60
            reference.routeTime = (time + '').split('.')[0]
          })
        })
        this.loadedProperties.push(property)
      }
      this.isLoading = false
    },
    loadNewProperties(searchParams){
      this.$ga.event('search', 'search', 'listPage', {
        'dimension1': searchParams.city,
        'dimension2': searchParams.type,
        'dimension3': searchParams.isRent,
        'dimension4': JSON.stringify(searchParams.references)
      })
      this.loadProperties(searchParams)
    },
    async loadProperties(searchParams) {
      this.properties = []
      this.loadedProperties = []
      this.disable = false
      this.currentIndex = 0
      this.searchParams = searchParams
     
      PropertyService.getFilteredProperties(this.searchParams).then(
        response => {
          this.properties = response.data.map(p => this.getRandomPics(p))
          this.loadDistances()
        }
      )
    },
    getRandomPics(property) {
      let p = []
      const homeTypes = ['Casa', 'Sobrado', 'Sítio']
      const apTypes = [
        'Apartamento Duplex',
        'Apartamento',
        'Cobertura',
        'Studio',
        'Kitnet',
        'Loft',
        'Apartamento Garden'
      ]
      if (homeTypes.includes(property.type)) {
        p = pics.home[Math.ceil(Math.random() * 4)]
      } else if (apTypes.includes(property.type)) {
        p = pics.ap[Math.ceil(Math.random() * 2)]
      } else {
        for (let i = 1; i <= 4; i++) {
          p.push(require('../assets/images/frontpage-background.png'))
        }
      }

      return { ...property, pics: p }
    }
  },
  created() {
    this.loadProperties(this.searchParams)
  }
}
</script>
<style scoped>
#search {
  width: 100% !important;
  max-width: 100% !important;
  min-height: 450px;
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
.search-result {
  padding-left: 70px;
  padding-right: 70px;
}
.total {
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  letter-spacing: 0.04px;

  color: #949494;
}
</style>
