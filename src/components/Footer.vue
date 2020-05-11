<template>
  <v-container class="wrapper" fluid>
    <v-row class="justify-space-between footer">
      <v-col class="px-0 pt-8 d-flex flex-column align-start" cols="4">
        <v-img
          height="42"
          src="@/assets/images/logo.png"
          contain
          class="flex-grow-0 mb-4 flex-shrink-1 pa-0 mx-0"
        />
        <span>
          Nossa missão é oferecer a praticidade ao buscar por uma nova moradia,
          tendo em vista o valor que é estar próximo de lugares que você ama e
          tem prazer de estar vínculado.
        </span>
        <v-sheet color="transparent">
          <span class="primary--text">O tempo é agora. </span
          ><span class="secondary--text"
            >Qual<br />vida você quer viver?</span
          ></v-sheet
        >
      </v-col>
      <v-col class="links d-flex flex-column align-start" cols="4">
        <v-btn light text to="/" class="text-none">Início</v-btn>
        <v-btn text to="/" class="text-none">Quem somos?</v-btn>
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
  padding: 40px 80px;
}
</style>
