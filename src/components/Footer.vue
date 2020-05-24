<template>
  <v-container class="wrapper" fluid>
    <v-row class="d-flex flex-row justify-space-between footer">
      <v-col class="d-flex flex-column align-start mb-4">
        <v-img
          src="@/assets/images/logo.png"
          class="flex-grow-0 mb-8 flex-shrink-1 pa-0 mx-0"
        />
        <v-sheet color="transparent">
          <span class="primary--text">O tempo é agora. <br /></span
          ><span class="secondary--text"
            >Qual vida você quer viver?</span
          ></v-sheet
        >
        <span class="mt-4 font-weight-bold">Siga-nos:</span>
        <v-sheet class="d-flex mt-2 align-center" color="transparent">
          <v-img src="@/assets/images/icon_facebook.png" class="mr-4" />
          <v-img src="@/assets/images/icon_instagram.png" class="mr-4" />
          <v-img src="@/assets/images/icon_linkedin.png" />
        </v-sheet>
      </v-col>
      <v-col class="d-flex flex-column align-center mb-4">
        <span> (11) 98787-0203</span> 
        <span>contato@nudoor.com.br </span>
      </v-col>
      <v-col class="links d-flex flex-column align-center mb-4">
        <v-btn light text to="/" class="text-none" @click="$ga.event('link', 'click', 'home-footer')"
>Início</v-btn>
        <v-btn text to="/about" class="text-none" @click="$ga.event('link', 'click', 'about-footer')">Quem somos?</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.wrapper {
  background: rgba(239, 239, 239, 0.4);
}
.links * {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  text-align: justify;
  letter-spacing: 1.07777px;
}
.links .v-btn:before {
  background-color: transparent;
}
.links .v-btn:hover:before {
  background-color: transparent;
}
.footer {
  padding: 25px 50px;
}
</style>
