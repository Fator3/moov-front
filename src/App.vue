<template>
  <v-app>
    <v-app-bar app color="white" height="80">
      <v-toolbar-title id="logo"
        ><router-link to="/"
          ><v-img
            height="42"
            src="./assets/images/logo.png"
            contain
            to="/"/></router-link
      ></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
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
      </v-toolbar-items>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleMenu">
      </v-app-bar-nav-icon>
    </v-app-bar>
    <Drawer @close="toggleMenu" align="left" :closeable="true">
      <div v-if="showMenu">
        <v-list>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item
              v-for="(link, i) in links"
              :key="i"
              :to="link.url"
              @click="
                $ga.event('link', 'click', link.event)
                showMenu = false
              "
            >
              <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="link.label"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </Drawer>
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
import Drawer from 'vue-simple-drawer'
import './demo.scss'

export default {
  name: 'App',
  components: { Footer, Drawer },
  data() {
    return {
      showMenu: false,
      item: 1,
      links: [
        {
          event: 'home-header',
          label: 'Início',
          url: '/',
          icon: 'home'
        },
        {
          event: 'about-header',
          label: 'Quem somos?',
          url: '/about',
          icon: 'info'
        }
      ]
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
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
