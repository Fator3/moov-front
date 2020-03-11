  
<template>
  <div>
    </br>
    <PropertyCard
      v-for="property in properties"
      :key="property.id"
      :property="property"
    />

    <template v-if="page != 1">
      <router-link :to="{ name: 'list', query: { page: page - 1 } }" rel="prev"
        >Prev Page</router-link
      >|
    </template>
    <router-link :to="{ name: 'list', query: { page: page + 1 } }"
      >Next Page</router-link
    >
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
      properties: []
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
      for(const property of this.properties){
        const delay = interval => new Promise(resolve => setTimeout(resolve, interval));
        await delay(300*this.searchParams.references.length);
        property.secondsToArrive2 = []
        const propertLocation = {latitude: property.location.coordinates[0], longitude: property.location.coordinates[1], secondsToArrive: 0}
        this.searchParams.references.forEach(reference => {
          const distancePost = {property: propertLocation, address: reference};
            PropertyService.getDistanceProperties(distancePost).then(result => {
            const time = result.data[1].secondsToArrive/60
            property.secondsToArrive2.push((time+"").split('.')[0])
            property.id = property.id+1
            property.id = property.id-1
          })  
        })
      }
    }
  },
  async created() {
    if (!this.searchParams || !this.searchParams.references[0]) {
      this.properties = (await PropertyService.getAllProperties()).data
    } else {
      PropertyService.getFilteredProperties(this.searchParams.references).then(
        response => {
          this.properties = response.data
          this.loadDistances()
        }
      )
    }
  },
  computed: {
    hasNextPage() {
      return true
      // this.event.eventsTotal > this.page * this.event.perPage
    }
  }
}
</script>