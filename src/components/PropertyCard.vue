<template>
    <v-sheet @click="openProperty()" class="primary--text elevation-2 my-8" color="white" style="cursor:pointer">
      <v-row dense no-gutters class="">
        <v-col cols="4" dense class="">
          <v-img :src="property.pics[0]" cover height="100%" />
        </v-col>

        <v-col class="pa-4">
          <span class="pa-3 pb-1 white property-type">{{ property.type }}</span>
          <v-sheet
            class="property-details text--primary px-3 d-flex flex-column"
          >
            <span
              class="primary--text property-price mt-2"
              v-html="formatPrice(property)"
            ></span>
            <span class="property-tax mb-2">{{
              `condomínio ${formatMoney(
                property.complexFee
              )} | IPTU ${formatMoney(property.propertyTax)}`
            }}</span>
            <span class="property-address mt-2 font-weight-medium">{{
              property.address
            }}</span>
            <span class="property-address mt-1 mb-4">{{
              property.district + ', ' + property.city
            }}</span>
            <v-sheet
              class="d-flex justify-start font-weight-medium"
              color="white"
            >
              <v-sheet
                :key="'icon' + index"
                v-for="(info, index) in infos"
                color="white"
                class="d-flex mr-4 align-center"
              >
                <v-img
                  :title="info.tooltip"
                  :src="info.icon"
                  class="flex-grow-0"
                />
                <span class="info-value ml-1">{{ info.value(property) }}</span>
              </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex mt-5">
              <v-sheet
                v-for="(reference, index) in property.references"
                class="time-chip d-flex flex-column text-center py-1 px-5 mr-4 primary--text"
                :key="'ref' + index"
              >
                <v-sheet
                  class="d-flex primary--text justify-center"
                  style="background:transparent"
                >
                  <v-img
                    :src="routeIcons[reference.transport]"
                    contain
                    class="flex-grow-0 mr-2"
                  />
                  <span class="font-weight-medium headline">
                    {{ `${reference.routeTime} min` }}</span
                  >
                </v-sheet>
                <span class="address">{{ reference.address }}</span>
              </v-sheet>
            </v-sheet>
          </v-sheet>
        </v-col>
      </v-row>
    </v-sheet>
</template>

<script>
export default {
  props: {
    property: Object,
    isRent: Boolean
  },
  data() {
    return {
      localIsRent: this.isRent,
      infos: [
        {
          icon: require('../assets/images/icon_area.png'),
          value: p => Math.max(p.area, p.totalArea),
          tooltip: 'Área'
        },
        {
          icon: require('../assets/images/icon_bedrooms.png'),
          value: p => p.bedrooms,
          tooltip: 'Quartos'
        },
        {
          icon: require('../assets/images/icon_suites.png'),
          value: p => p.suites,
          tooltip: 'Suítes'
        },
        {
          icon: require('../assets/images/icon_parking.png'),
          value: p => p.parkingSpaces,
          tooltip: 'Vagas'
        }
      ],
      routeIcons: {
        car: require('@/assets/images/icon_car.png'),
        bus: require('@/assets/images/icon_bus.png'),
        pedestrian: require('@/assets/images/icon_foot.png')
      }
    }
  },
  methods: {
    
    openProperty(){
      this.$ga.event('property', 'click', 'list', {'dimension9' : JSON.stringify(this.property)})
      this.$router.push({
        name: 'details',
       params: { id: this.property.id, property: this.property }
      })
    },
    formatPrice(property) {
      let price = 0
      if (this.localIsRent) {
        price = property.rentalPrice
      } else {
        price = property.sellPrice
      }

      if (price == 0) return 'Sob consulta'
      else {
        return `R$ ${price}<span class="subtitle-2"> ${
          this.localIsRent ? '/ mês' : ''
        }</span>`
      }
    },
    formatMoney(value) {
      if (value == 0) return 'Sob consulta'
      else {
        return `R$ ${value}`
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  max-height: 300px;
}
.property-details {
  background-color: white;
}
.property-type {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */

  text-align: center;
  letter-spacing: 0.03px;

  color: #949494;
}
.property-price {
  font-family: Roboto;
  font-style: normal;
  font-size: 30px;
  line-height: 35px;
  font-weight: 500;
  letter-spacing: 0.06px;
}
.property-address {
  font-family: Roboto;
  font-style: normal;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.04px;

  color: #949494;
}
.info-value {
  font-family: Roboto;
  font-style: normal;
  font-weight: regular;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.03px;

  color: #949494;
}
.time-chip {
  background: rgba(127, 86, 195, 0.3);
  border-radius: 5px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.04px;
}
.property-tax {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.03px;

  color: #949494;
}
</style>
