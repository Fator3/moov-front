<template>
  <v-row class="d-flex flex-row pa-8 ">
    <v-col
      class="d-flex flex-column align-center pa-12"
    >
    <div style="padding-top:25%;">
      <v-img
        height="42"
        src="@/assets/images/logo.png"
        contain
        class="flex-grow-0 mb-6 flex-shrink-1 "
      />
      <span class="primary--text font-weight-medium video-text justify-center flex-grow-1 text-justify "
        >Estamos aqui pra ajudar<br />em suas escolhas.</span
      >
    </div>
    </v-col>

    <v-col class="d-flex flex-column align-content-center">
      <v-img
        height="400"
        src="@/assets/images/concept_image.png"
        contain
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
.content-align {
  padding-top: 10%;
}
</style>
