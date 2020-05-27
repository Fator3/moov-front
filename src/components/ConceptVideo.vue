<template>
  <v-row class="d-flex pa-8">
    <v-col
      class="d-flex flex-column align-center "
      
    >
    <div class="top-spacing sm-spacing">
      <v-img
        height="42"
        src="@/assets/images/logo.png"
        contain
        class="flex-grow-0 mb-6 flex-shrink-1 "
      />
      <span class="primary--text font-weight-medium video-text flex-grow-1 text-justify "
        >Estamos aqui pra ajudar<br />em suas escolhas.</span
      >
    </div>
    </v-col>

    <v-col class="d-flex flex-column align-center ">
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
/* @media screen and (min-width: 910px) { */
.top-spacing {
  margin-top: auto;
  margin-bottom: auto;
}
 
@media screen and (max-width: 600px) {
 .sm-spacing {
    padding-top: 8%;
  }
}
</style>
