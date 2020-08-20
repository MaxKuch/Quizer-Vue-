<template>
  <div class="d-flex justify-center align-center">
    <div class="content-container">
      <div class="result">
        <h2 class="title-h2 text-center">Поздравляем, вы дурачок!</h2>
        <p class="parag">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Quis tempus a enim tellus id. Elementum fringilla id suspendisse id et. 
          Odio semper in pulvinar elementum urna, sit. 
          Ullamcorper eget laoreet vel tincidunt vitae mauris porttitor. 
          Diam turpis sed at sit est. Nisl cursus amet lobortis ornare in. 
          Cras ipsum volutpat tristique sit. Turpis egestas quisque sed non in. 
          Risus, mauris tristique convallis senectus in.
        </p>
        <div class="d-flex flex-column align-center">
          <v-btn text>
            <router-link class="parag result__link" to="/">
              Вернуться на главную
            </router-link>
          </v-btn>
          <div class="result__share">
            <Button>
              Поделиться результатом
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
export default {
  components: {
    Button
  }
}
</script>

<style lang="scss">
  .result{
    h2{
      margin-bottom: 40px;
    }
    &__link{
      text-transform: none;
      color: $accent;
    }
    &__share{
      margin-top: 20px;
    }
  }
</style>