<template>
  <v-app>
    <v-app-bar app color="white" height="80">
      <v-toolbar-title id="logo"
        ><v-img height="42" src="./assets/images/logo.png" contain
      /></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"
        class="text-none"
        text
        color="#c2c2c2"
        :to="link.url"
        active-class="active"
        :depressed="false"
         @click="$ga.event('link', 'click', link.event)"
      >
        {{ link.label }}
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer>
      <Footer />
    </v-footer>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: { Footer },
  data() {
    return {
      links: [
        {
          event: 'home-header',
          label: 'Início',
          url: '/'
        },
        {
          event: 'about-header',
          label: 'Quem somos?',
          url: '/about'
        }
      ]
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Roboto;
  background: white;
}
.active {
  color: var(--v-primary-base) !important;
}
#logo {
  margin-left: 46px;
}
</style>
