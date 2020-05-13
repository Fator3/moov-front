<template>
  <v-container class="ma-0 pa-0 wrapper" fluid>
    <v-sheet id="headline" class="display-2">
      <span id="spacing-text" class="text-style">A nossa missão é te possibilitar viver<br />
        da melhor forma que pode!<br />
        Do seu jeito. <br />
        De acordo com suas necessidades.</span>
      <span class="text-style secondary--text">O tempo é agora. Bora viver? </span>
    </v-sheet>
    <v-sheet class="display-2">
      <v-row no-gutters>
        <v-col class="d-flex flex-column mb-6 align-center">
          <span class="text-style-secondary" style="padding-right:15%;">Somos uma plataforma<br />
            desenvolvida para você<br />
            encontrar o melhor lugar <br />
            para viver!
          </span>
        </v-col>
        <v-col class="d-flex flex-column mb-6 align-center" style="padding-bottom:50px;">
          <div class="img-container">
            <img src="../assets/images/about-girl.png" class="img-align-left">
            <div class="rect-after"></div>
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters class="d-flex flex-row align-center">
        <v-col class="d-flex flex-column justify-center mb-3">
          <img class="img-size" src="../assets/images/icon-confort.png" />
          <span class="text-icon">Conforto</span>
        </v-col>
        <v-col class="d-flex flex-column justify-center mb-3">
          <img class="img-size" src="../assets/images/icon-safety.png" />
          <span class="text-icon">Segurança</span>
        </v-col>
        <v-col class="d-flex flex-column justify-center mb-3">
          <img class="img-size" src="../assets/images/icon-key.png" />
          <span class="text-icon">Facilidade</span>
        </v-col>
        <v-col class="d-flex flex-column justify-center mb-3">
          <img src="../assets/images/icon-home.png" class="img-size" />
          <span class="text-icon">Novo lar</span>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters="">
        <v-col class="d-flex flex-column mb-6 md-6 pa-6">
          <div class="rect-before">
            <div class="img-container-over ">
              <img src="../assets/images/couple.png" />
            </div>
          </div>
        </v-col>
        <v-col class="d-flex flex-column mb-6 md-6 pa-6 align-center">
          <span class="text-style-secondary" style="padding-top: 20%;">
            Nosso objetivo é ajudar você <br />
            a encontrar o imóvel ideal, no <br />
            lugar que tem a sua cara!
          </span>
        </v-col>
      </v-row>
    </v-sheet>
    <v-divider style="margin-top: 6%; margin-bottom:4%;"></v-divider>
    <v-row no-gutters class="d-flex flex-row align-center">
      <span class="text-style-tertiary">
        <span>Então,</span> qual vida você quer viver?
      </span>
    </v-row>
    <v-divider style="margin-top: 4%;"></v-divider>
    <v-row no-gutters class="d-flex flex-row text-style-tertiary align-center">
      <v-col class="d-flex flex-col justify-center" style="padding-top:5%; padding-bottom:3%;">
        <span >Fundadores</span>
      </v-col>
    </v-row>
    <v-row no-gutters class="d-flex flex-row align-center spacing-row">
      <v-col class="d-flex flex-col justify-center mb-4">
        <div>
            <img class="img-founders" src="../assets/images/handall.png">
            <span class="d-flex justify-center text-name-founders">Handall</span>
            <div class="d-flex justify-center">
              <span class="text-part-founders">Co-Founder</span>
            </div>
        </div>
      </v-col>
      <v-col class="d-flex flex-col justify-center mb-4">
        <div>
          <img class="img-founders img-founder-align" src="../assets/images/andre.png">
          <span class=" d-flex justify-center text-name-founders">André Filipe Freitas</span>
          <div class="d-flex justify-center">
            <span class="text-part-founders">Founder</span>
          </div>
        </div>
      </v-col>
      <v-col class="d-flex flex-col justify-center mb-4">
        <div>
          <img class="img-founders img-founder-align" src="../assets/images/alexandre.png">
          <span class="d-flex justify-center text-name-founders">Alexandre Martins</span>
          <div class="d-flex justify-center">
            <span class="text-part-founders">Co-Founder</span>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {}
</script>

<style scoped>
.wrapper {
  width: 100% !important;
  max-width: 100% !important;
  position: relative;
}

#headline {
  width: 100% !important;
  max-width: 100% !important;
  min-height: 770px;
  background: linear-gradient(
      90deg,
      rgba(127, 86, 195, 0.9) 0%,
      rgba(81, 194, 247, 0.9) 121.21%
    ),
    url('../assets/images/frontpage-background.png') no-repeat;
  background-size: cover;
  z-index: 1;
}
.text-style {
  font-family: Roboto, sans-serif;
  font-style: bold;
  font-size: 35px;
  line-height: 41px;
  display: flex;
  align-items: center;
  text-align: justify;
  letter-spacing: 1.02px;
  color: white;
  margin-left: 5%;
}
#spacing-text {
  margin-top: 8%;
}
.text-style-secondary {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 41px;
  letter-spacing: 1.02px;
  margin-top: 10%;
  color: #7F56C3;
}
.bottom-text {
  font-weight: normal;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 1.48194px;
}
.bottom {
  width: 100%;
  max-width: 100% !important;
  padding: 40px 80px;
}
.img-container {
  left: 8%;
  width: 380px;
  height: 430px;
  background-color: #7F56C3;
  position: relative;
  padding-top: 37px;
  padding-left: 25px;
}
.rect-after {
  position: absolute;
  width: 380px;
  height: 430px;
  border: 2px solid #34B6F2;
  top: 20px;
  right: 20px;
}
.rect-before {
  position: relative;
  width: 380px;
  height: 430px;
  border: 2px solid #34B6F2;
  top: 50px;
  left: 15%;
}
.img-container-over {
  bottom: 20px;
  right: 20px;
  width: 380px;
  height: 430px;
  background-color: #7F56C3;
  position: absolute;
  padding-top: 84px;
}
.img-size {
  margin-top: 40px;
  width: 31px;
  height: 31px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
.text-icon {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 35px;
  margin-bottom: 20px;
  letter-spacing: 1.02px;
  margin-left: auto;
  margin-right: auto;
  color: #34B6F2;
}
.text-style-tertiary {
  color: #34B6F2;
  font-style: bold;
  font-size: 35px;
  font-family: Roboto;
  font-weight: 500;
  margin: auto;
}
.text-style-tertiary span {
  color:#7F56C3;
  font-size: 35px;
}
.img-founders {
  width: 190px;
  height: 190px;
}
.text-name-founders {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 35px;
  /* display: flex;
  align-items: center; */
  letter-spacing: 1.02px;
  padding-top: 20px;
  color: #454646;
}
.text-part-founders {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 1.02px;
  color: #7F56C3;
}
.img-founder-align {
  margin-left: 15%;
}
</style>
