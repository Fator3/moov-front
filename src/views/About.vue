<template>
  <v-container class="ma-0 pa-0 wrapper" fluid>
    <v-sheet id="headline" class="display-2 align-center">
      <span id="spacing-text" class="text-style pa-right" >A nossa missão é te possibilitar viver<br />
        da melhor forma que pode!<br />
        Do seu jeito. <br />
        De acordo com suas necessidades.</span>
      <span class="text-style secondary--text pa-right">O tempo é agora. Bora viver? </span>
    </v-sheet>
    <v-sheet class="display-2">
      <v-row class="d-flex align-center">
        <v-col class="d-flex flex-column align-center" xs="12" sm="12" md="6" lg="6" style="padding-bottom:50px;">
          <span class="text-style-secondary pa-left pa-bottom">Somos uma plataforma<br />
            desenvolvida para você<br />
            encontrar o melhor lugar <br />
            para viver!
          </span>
        </v-col>
        <v-col class="d-flex flex-column align-center" style="padding-bottom:50px;" xs="12" sm="12" md="6" lg="6">
          <div class="img-container">
            <img src="../assets/images/about-girl.png" class="img-align-left" />
            <div class="rect-after"></div>
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="d-flex align-center">
        <v-col class="d-flex flex-column justify-center mb-3" xs="6" sm="6" md="3" lg="3">
          <img class="img-icon-size" src="../assets/images/icon-confort.png" style="width: 72.76px" />
          <span class="text-icon">Conforto</span>
        </v-col>
        <v-col class="d-flex flex-column justify-center mb-3" xs="6" sm="6" md="3" lg="3">
          <img class="img-icon-size" src="../assets/images/icon-safety.png" />
          <span class="text-icon">Segurança</span>
        </v-col>
        <v-col class="d-flex flex-column justify-center mb-3" xs="6" sm="6" md="3" lg="3">
          <img class="img-icon-size" src="../assets/images/icon-key.png" />
          <span class="text-icon">Facilidade</span>
        </v-col>
        <v-col class="d-flex flex-column justify-center mb-3" xs="6" sm="6" md="3" lg="3">
          <img src="../assets/images/icon-home.png" class="img-icon-size" />
          <span class="text-icon">Novo lar</span>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row  class="d-flex align-center">
        <v-col class="d-flex flex-column align-start" xs="12" sm="12" md="6" lg="6">
          <div class="rect-before">
            <div class="img-container-over ">
              <img src="../assets/images/couple.png" />
            </div>
          </div>
        </v-col>
        <v-col class="d-flex flex-column align-center" xs="12" sm="12" md="6" lg="6">
          <span class="text-style-secondary pa-left pa-bottom" >
            Nosso objetivo é ajudar você <br />
            a encontrar o imóvel ideal, no <br />
            lugar que tem a sua cara!
          </span>
        </v-col>
      </v-row>
    </v-sheet>
    <v-divider style="margin-top: 6%; margin-bottom:4%;"></v-divider>
    <v-row no-gutters class="d-flex align-center">
      <span class="text-style-tertiary pa-left">
        <span>Então,</span> qual vida você quer viver?
      </span>
    </v-row>
    <v-divider style="margin-top: 4%;"></v-divider>
    <v-row no-gutters class="d-flex text-style-tertiary align-center">
      <v-col class="d-flex flex-col justify-center" style="padding-top:5%; padding-bottom:3%;">
        <span >Fundadores</span>
      </v-col>
    </v-row>
    <v-row no-gutters class="d-flex align-center sm-stack">
      <v-col class="d-flex flex-col justify-center" xs="12" sm="12" md="4">
        <div>
            <img class="img-founders" src="../assets/images/handall.png">
            <span class="d-flex justify-center text-name-founders">Handall</span>
            <div class="d-flex justify-center">
              <span class="text-part-founders">Co-Founder</span>
            </div>
        </div>
      </v-col>
      <v-col class="d-flex flex-col justify-center" xs="12" sm="12" md="4">
        <div>
          <img class="img-founders img-founder-align" src="../assets/images/andre.png">
          <span class=" d-flex justify-center text-name-founders">André Filipe Freitas</span>
          <div class="d-flex justify-center">
            <span class="text-part-founders">Founder</span>
          </div>
        </div>
      </v-col>
      <v-col class="d-flex flex-col justify-center" xs="12" sm="12" md="4">
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
.img-icon-size {
  margin-top: 40px;
  width: 81px;
  height: 81px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
.text-icon {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 35px;
  margin-bottom: 20px;
  letter-spacing: 1.02px;
  margin-left: auto;
  margin-right: auto;
  color: #34B6F2;
  padding-top: 4%;
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
@media screen and (max-width: 600px) {
  .pa-right {
    padding-right: 4%;
  }
  .pa-left {
    padding-left: 4%;
  }
  .pa-bottom {
    padding-bottom: 5%;
  }
  .sm-stack {
    flex-direction: column;
  }
}
</style>
