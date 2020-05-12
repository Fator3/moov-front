<template>
  <v-container class="wrapper">
    <v-container class="d-flex align-center px-8" fluid v-if="title">
      <v-divider color="#D8D8D8" />
      <span class="primary--text scroll-title mx-4">{{ title }}</span>
      <v-divider color="#D8D8D8" />
    </v-container>
    <v-carousel hide-delimiters height="auto">
      <v-carousel-item
        :key="i"
        v-for="i in properties.length / 3"
        class="mx-8 my-0"
      >
        <v-row class="mx-4 align-center fill-height">
          <v-col :key="j" v-for="j in 3" cols="4" class="fill-height">
            <v-card
              class="primary--text elevation-2 fill-height"
              color="white"
              :to="{
                name: 'property-show',
                params: {
                  id: properties[i - 1 + (j - 1)].id,
                  property: properties[i - 1 + (j - 1)]
                }
              }"
            >
              <v-img :src="properties[i - 1 + (j - 1)].pics[0]" />
              <v-card-subtitle class="pa-3 pb-1 caption white property-type">{{
                properties[i - 1 + (j - 1)].type
              }}</v-card-subtitle>
              <v-card-text
                class="property-details text--primary px-3 d-flex flex-column"
              >
                <span
                  class="primary--text property-price"
                  v-html="formatPrice(properties[i - 1 + (j - 1)].rentalPrice)"
                ></span>
                <span class="property-address mt-2 font-weight-medium">{{
                  properties[i - 1 + (j - 1)].address
                }}</span>
                <span class="property-address mt-1 mb-4">{{
                  properties[i - 1 + (j - 1)].district +
                    ', ' +
                    properties[i - 1 + (j - 1)].city
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
                    <span class="info-value ml-1">{{
                      info.value(properties[i - 1 + (j - 1)])
                    }}</span>
                  </v-sheet>
                </v-sheet>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>
<script>
export default {
  props: ['properties', 'title'],
  data() {
    return {
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
      ]
    }
  },
  methods: {
    formatPrice(price) {
      if (price == 0) return 'Sob consulta'
      else {
        return `R$ ${price}<span class="subtitle-2"> / mês</span>`
      }
    }
  }
}
</script>
<style scoped>
.wrapper {
  background-color: white;
}
.scroll-title {
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  letter-spacing: 2.02082px;
}
.property-details {
  background-color: white;
}
.property-type {
  color: #949494 !important;
}
.property-price {
  font-weight: 500;
  font-size: 25px;
  line-height: 29px;
  letter-spacing: 0.06px;
}
.property-address {
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.04px;
  color: #949494;
}
.info-value {
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.03px;

  color: #949494;
}
</style>
