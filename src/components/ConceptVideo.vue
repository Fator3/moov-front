<template>
  <v-row class="d-flex pa-8 wrapper">
    <v-col
      class="pa-12 d-flex flex-column align-center justify-center flex-grow-1 text-justify"
    >
      <v-img
        height="42"
        src="@/assets/images/logo.png"
        contain
        class="flex-grow-0 mb-4 flex-shrink-1"
      />
      <span class="primary--text  font-weight-medium video-text"
        >Estamos aqui pra ajudar<br />em suas escolhas.</span
      >
    </v-col>

    <v-col cols="7">
      <v-img
        height="400"
        src="@/assets/images/frontpage-background.png"
        contain
        class="flex-grow-0"
      />
    </v-col>
  </v-row>
</template>
<style scoped>
.video-text {
  line-height: 22px;
  letter-spacing: 1.48194px;
}
.wrapper {
  background-color: white;
}
</style>
