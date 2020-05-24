<template>
  <v-container fluid class="pa-0 ma-0 d-flex flex-column">
    <v-slide-group class="align-self-center" ref="top">
      <v-slide-item
        v-for="(pic, index) in property.pics"
        :key="'pic' + index"
        v-slot:default="{ active, toggle }"
      >
        <img height="300px" :src="pic" id="picture" />
      </v-slide-item>
    </v-slide-group>
    <v-sheet class="content">
      <v-row class="d-flex align-center">
        <v-col class="d-flex flex-column align-start" xs="12" sm="12" md="9">
          <span class="breadcrumb mb-4">
            {{
              `Início > ${property.city} > ${property.district} > ${property.agencyReference}`
            }}
          </span>
          <span class="font-weight-bold">{{ property.type }}</span>
          <v-dialog v-model="showMap">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" class="text-none my-2" large v-on="on" @click="$ga.event('button', 'click', 'map')">
                <v-img src="@/assets/images/icon_map.png" class="mr-2" />
                <span class="mt-1">Mapa</span>
              </v-btn>
            </template>

            <v-card class="map">
              <GoogleMapLoader
                :mapConfig="mapConfig"
                apiKey="AIzaSyCB08b33Ci4ZDF3qqh2Cwhn40PG3o02UGU"
              >
              </GoogleMapLoader>
            </v-card>
          </v-dialog>
          <span class="property-address mt-4 font-weight-medium">{{
            property.address
          }}</span>
          <span class="property-address mt-2 mb-6">{{
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
          <v-divider color="#D8D8D8" width="100%" class="my-4" />
          <v-sheet class="align-center d-flex mb-2">
            <v-icon color="primary mr-4">mdi-information-outline</v-icon
            ><span class="about ml-2">Sobre esse imóvel</span>
          </v-sheet>
          <p class="description mt-2">
            Ampla casa para alugar com 3 quartos e 4 banheiro no total. Este
            apartamento é bem equipado, bom para quem procura conforto e
            comodidade e fica situado em ótima localização.
          </p>
        </v-col>
        <v-col class="align-center" xs="12" sm="12" md="3">
          <v-sheet class="contact d-flex flex-column align-center">
            <v-img src="@/assets/images/logo.png" height="30" contain />
            <span class="primary--text mt-2 mb-8">(11) 98787-0203</span>
            <v-row justify="space-between" class="tax-info" dense 
              ><v-col class="d-flex flex-column">Venda</v-col
              ><v-col class="d-flex flex-column text-right">{{
                formatMoney(property.sellPrice)
              }}</v-col></v-row
            >
            <v-row justify="space-between" class="tax-info" dense 
              ><v-col class="d-flex flex-column">Aluguel</v-col
              ><v-col class="d-flex flex-column text-right">{{
                formatMoney(property.rentalPrice)
              }}</v-col></v-row
            >
            <v-row justify="space-between" class="tax-info" dense 
              ><v-col class="d-flex flex-column">Condomínio</v-col
              ><v-col class="d-flex flex-column text-right">{{
                formatMoney(property.complexFee)
              }}</v-col></v-row
            >
            <v-row justify="space-between" class="tax-info" dense 
              ><v-col class="d-flex flex-column">IPTU</v-col
              ><v-col class="d-flex flex-column text-right">{{
                formatMoney(property.propertyTax)
              }}</v-col></v-row
            >
            <v-divider color="#D8D8D8" width="100%" />
            <v-row
              justify="space-between"
              class="price-info primary--text"
              dense
              no-gutters
              align="center"
              ><v-col class="d-flex flex-column">Total</v-col
              ><v-col
                class="d-flex flex-column text-right sm-text price"
                v-html="formatPrice(property)"
              ></v-col
            ></v-row>
            <v-btn
              color="primary"
              class="text-none mt-6"
              @click.stop="$ga.event('button', 'click', 'contact-top'); showForm = true"
              >Contatar anunciante</v-btn
            >
          </v-sheet>
        </v-col>
      </v-row>
      <v-divider width="100%" color="#D8D8D8" />
      <v-container class="pt-6" fluid>
        <span class="section-title">Condomínio</span>
        <v-row class="section-items">
          <v-col class="d-flex flex-column">
            <span>Piscina</span>
            <span>Sauna</span>
            <span>Playground</span>
            <span>Jardim</span>
          </v-col>
          <v-col class="d-flex flex-column">
            <span>Churrasqueira</span>
            <span>Academia</span>
            <span>Espaço gourmet</span>
            <span>Salão de festas</span>
          </v-col>
          <v-col class="d-flex flex-column">
            <span>Elevador</span>
            <span>Portaria 24h</span>
          </v-col>
        </v-row>
      </v-container>
      <v-divider width="100%" color="#D8D8D8" />
      <v-container class="pt-6" fluid>
        <span class="section-title">Imóvel</span>
        <v-row class="section-items">
          <v-col class="d-flex flex-column">
            <span>Box de vidro</span>
            <span>Armários no quarto</span>
            <span>Armários na cozinha</span>
            <span>Chuveiro elétrico</span>
          </v-col>
        </v-row>
      </v-container>
      <v-divider width="100%" color="#D8D8D8" />
      <v-container class="pt-6" fluid>
        <span class="section-title">Proximidades</span>
        <v-row class="section-items">
          <v-col class="d-flex flex-column">
            <v-sheet class="d-flex align-center near">
              <v-icon large color="primary">mdi-shopping-outline</v-icon>
              <span class="ml-2 primary--text mb-0">Shoppings</span>
            </v-sheet>
            <span>Shopping Iguatemi</span>
            <span>Shopping Eldorado</span>
            <v-sheet class="d-flex align-center near">
              <v-icon large color="primary">mdi-school-outline</v-icon>
              <span class="ml-2 primary--text mb-0">Faculdades</span>
            </v-sheet>
            <span>Unip</span>
            <span>Unesp</span>
            <v-sheet class="d-flex align-center near">
              <v-icon large color="primary">mdi-bus</v-icon>
              <span class="ml-2 primary--text my-0">Transporte público</span>
            </v-sheet>
            <span>Estação Barra Funda</span>
            <span>Estação Sumaré</span>
          </v-col>
        </v-row>
      </v-container>
      <v-divider width="100%" color="#D8D8D8" />
      <v-row class="d-flex align-center">
          <v-col class="d-flex flex-column align-center">
            <span class="section-title">Imóveis similares</span>
          </v-col>
          <v-col class="d-flex flex-column align-center">
            <PropertyScroll :properties="similarProperties" clas="my-2" />
          </v-col>
      </v-row> 
      <v-container class="d-flex flex-column align-center my-12" fluid>
        <span class="bottom-text"
          >Você ficou com alguma dúvida sobre esse anúncio?</span
        >
        <v-btn
          color="primary"
          class="text-none mt-6"
          @click.stop="$ga.event('button', 'click', 'contact-bottom'); showForm = true"
          >Contatar anunciante</v-btn
        >
      </v-container>
    </v-sheet>
    <v-dialog v-model="showForm" width="500">
      <v-card class="font-weight-medium d-flex flex-column primary--text pa-12">
        <v-img src="@/assets/images/logo.png" height="30" contain />
        <span class="primary--text mt-2 mb-8 align-self-center"
          >(11) 98787-0203</span
        >
        <v-form ref="form" v-model="valid">
          <label class="my-1">Nome</label>
          <v-text-field
            v-model="leadMessage.name"
            outlined
            required
            :rules="requiredRules"
          ></v-text-field>
          <label class="my-1">Telefone</label>
          <v-text-field
            v-model="leadMessage.phone"
            outlined
            v-mask="['(##) ####-####', '(##) #####-####']"
            required
            :rules="phoneRules"
          ></v-text-field>
          <label class="my-1">Email</label>
          <v-text-field
            v-model="leadMessage.email"
            outlined
            required
            :rules="emailRules"
          ></v-text-field>
          <label class="my-1">Mensagem</label>
          <v-textarea
            v-model="leadMessage.message"
            outlined
            required
            :rules="requiredRules"
          ></v-textarea>
        </v-form>
        <v-btn
          color="primary"
          class="text-none flex-grow-0 mt-2 mb-4"
          large
          @click="sendMessage()"
          :disabled="!valid"
          :loading="loading"
          >Enviar</v-btn
        >
        <span ::class="error ? 'red--text' : 'primary--text'">{{
          message
        }}</span>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import GoogleMapLoader from './GoogleMapLoader'
import PropertyScroll from '@/components/PropertyScroll.vue'
import nudoor from '@/services/PropertyService'
import pics from '@/pics.js'
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  components: {
    GoogleMapLoader,
    PropertyScroll
  },
  props: ['id', 'property'],
  computed: {
    mapConfig() {
      return {
        zoom: 18,
        center: { lat: this.property.latitude, lng: this.property.longitude }
      }
    }
  },
  data() {
    return {
      loading: false,
      message: '',
      error: false,
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail inválido'
      ],
      phoneRules: [
        v => !!v || 'Telefone é obrigatório',
        v => v.length === 14 || v.length === 15 || 'Telefone inválido'
      ],
      requiredRules: [v => !!v || 'Este campo é obrigatório'],
      valid: false,

      leadMessage: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      showMap: false,
      showForm: false,
      similarProperties: [],
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
  created() {
    nudoor
      .getRandomNProperties(12)
      .then(
        res =>
          (this.similarProperties = res.data.map(p => this.getRandomPics(p)))
      )
  },
  mounted(){
    window.scrollTo(0,0);
  },
  methods: {
    sendMessage() {
      this.$ga.event('button', 'click', 'send-message', {
        'dimension5': this.leadMessage.name,
        'dimension6': this.leadMessage.email,
        'dimension7': this.leadMessage.phone,
        'dimension8': this.leadMessage.message
      })
      this.message = ''
      this.loading = true
      nudoor.sendMessage(this.leadMessage).then(res => {
        this.loading = false
        if (res.data.code === 500) {
          this.error = true
        } else if (res.data.code === 200) {
          this.error = false
        }
        this.message = res.data.message

        setTimeout(() => (this.message = ''), 5000)
      })
    },
    formatPrice(property) {
      let price =
        property.rentalPrice + property.complexFee + property.propertyTax

      if (property.rentalPrice == 0) return 'Sob consulta'
      else {
        return `R$ ${price}<span class="subtitle-2">/ mês</span>`
      }
    },
    formatMoney(value) {
      if (value == 0) return 'Sob consulta'
      else {
        return `R$ ${value}`
      }
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
  }
}
</script>
<style scoped>
.content {
  padding: 20px 70px;
}
.breadcrumb {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */

  text-align: center;
  letter-spacing: 1px;

  color: #949494;
}
.contact {
  border: 1px solid #d8d8d8;
}
.tax-info {
  width: 100%;
  margin-bottom: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.03px;

  color: #949494;
}
.price-info {
  width: 100%;
  margin-top: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.03px;
}
.price {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
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
.about {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.04px;

  color: #454646;
}
.description {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.04px;

  color: #949494;
}
.section-title {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
  letter-spacing: 0.04px;

  color: #454646;
}
.section-items {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.04px;

  color: #949494;
  margin-top: 15px;
}
.section-items span {
  margin-bottom: 20px;
}
.near {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.04px;
  margin-bottom: 20px;
}
.bottom-text {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 1px;

  color: #454646;
}
.map {
  height: 600px;
  max-width: 1200px;
  width: 100%;
}
@media screen and (max-width: 600px) {
  .sm-text {
    font-size: 24px;
  }
}
</style>
<style>
.v-slide-group__prev,
.v-slide-group__next {
  position: absolute;
  height: 100%;
  z-index: 1;
  background: rgba(51, 50, 50, 0.379808);
}
.v-slide-group__next {
  right: 0;
}
.v-slide-group__prev--disabled,
.v-slide-group__next--disabled {
  background: transparent !important;
}
.v-slide-group__prev svg,
.v-slide-group__next svg {
  fill: white;
}
.v-dialog {
  max-width: 1200px !important;
}

</style>
