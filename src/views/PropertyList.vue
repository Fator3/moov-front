<template>
  <v-container class="ma-0 pa-0 wrapper" fluid>
    <v-sheet id="search" class="py-8">
      <SearchForm :searchInput="searchParams" v-on:search="loadProperties" />
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
        :references="property.references"
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
      loading: true,
      disable: false,
      maxIterations: 5,
      currentIndex: 0
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
    getMoreProperties() {
      if (this.properties.length == 0) {
        return
      }
      this.loadDistances()
    },
    async loadDistances() {
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
        property.references.forEach(reference => {
          const distancePost = {
            property: propertLocation,
            address: reference.address,
            transport: reference.transport
          }
          console.log(property)
          PropertyService.getDistanceProperties(distancePost).then(result => {
            const time = result.data[1].secondsToArrive / 60
            reference.routeTime = (time + '').split('.')[0]
          })
        })
        this.loadedProperties.push(property)
      }
    },
    async loadProperties(searchParams) {
      this.properties = []
      this.loadedProperties = []
      this.disable = false
      this.currentIndex = 0
      this.searchParams = searchParams
      if (
        !this.searchParams ||
        !this.searchParams.references[0] ||
        this.searchParams.references[0].address == ''
      ) {
        this.properties = (await PropertyService.getAllProperties()).data
      } else {
        PropertyService.getFilteredProperties(this.searchParams).then(
          response => {
            this.properties = response.data
            this.loadDistances()
            this.loading = false
          }
        )
      }
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
