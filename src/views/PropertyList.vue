  
<template>
  <div>
    </br>
    <v-skeleton-loader
      v-if="loading"
      class="mx-auto"
      max-width="300"
      type="card"
    ></v-skeleton-loader>
    
    <p v-if="!loading && properties.length == 0">Não foram encontradas propriedades para essa busca</p>
    
    <PropertyCard
      v-for="(property,index) in loadedProperties"
      :key="'prop'+index"
      :property="property"
    />
    
    <scroll-loader :loader-method="getPropertiesList" :loader-disable="disable">
      
    </scroll-loader> 
    <!-- <template v-if="page != 1">
      <router-link :to="{ name: 'list', query: { page: page - 1 } }" rel="prev"
        >Prev Page</router-link
      >|
    </template>
    <router-link :to="{ name: 'list', query: { page: page + 1 } }"
      >Next Page</router-link
    > -->
    <BaseIcon />
  </div>
</template>

<script>
import PropertyCard from '@/components/PropertyCard.vue'
import { mapGetters, mapActions } from 'vuex'
import PropertyService from '@/services/PropertyService'




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
      loading : true,
      disable: false,
      maxIterations: 5,
      currentIndex: 0,
      
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
    PropertyCard
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

    async loadDistances() {
      
      for(var i=0; i < this.maxIterations; i++){

      	if(this.currentIndex > this.properties.length-1) {
          this.disable = true;
          break;
        }

        this.disable = this.properties.length < this.maxIterations

        const property = this.properties[this.currentIndex++]

        this.loadedProperties.push(property)

        const delay = interval => new Promise(resolve => setTimeout(resolve, interval));
        await delay(500*this.searchParams.references.length);
        property.secondsToArrive2 = []
        property.references = []
        property.tooltips = []
        const propertLocation = {latitude: property.latitude, longitude: property.longitude, secondsToArrive: 0}
        this.searchParams.references.forEach(reference => {
          const distancePost = {property: propertLocation, address: reference};
            PropertyService.getDistanceProperties(distancePost).then(result => {
            const time = result.data[1].secondsToArrive/60
            property.secondsToArrive2.push((time+"").split('.')[0])
            property.references.push(reference)
            property.tooltips.push(false)
            property.id = property.id+1
            property.id = property.id-1
          })  
        })
      }
    },
    getPropertiesList() {
      
      PropertyService.getFilteredProperties(this.searchParams).then(
        response => {
          this.properties = response.data
          this.loadDistances()
          this.loading = false;
          this.disable = response.data.length < this.maxIterations
        }
      )
    },
  },
  async created() {
    
    if (!this.searchParams || !this.searchParams.references[0]) {
      this.properties = (await PropertyService.getAllProperties()).data
    } else {
      PropertyService.getFilteredProperties(this.searchParams).then(
        response => {
          this.properties = response.data
          this.loadDistances()
          this.loading = false;
          this.disable = response.data.length < this.maxIterations
        }
      )
    }
  },
  
  computed: {
    hasNextPage() {
      return true
      // this.event.eventsTotal > this.page * this.event.perPage
    }
  },
}
</script>
