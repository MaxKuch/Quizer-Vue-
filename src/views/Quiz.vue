<template>
  <div class="d-flex justify-center align-center">
    <div class="content-container">
      <div class="quiz">
        <h2 class="title-h2 text-center quiz__num">Вопрос 1 из 12</h2>
        <h4 class="title-h4 quiz__question">{{question}}</h4>
        <div class="quiz__options">
          <div class="quiz__option" v-for="option in options" :key="option.value" >
            <input type="radio" name="option" :id="option.value" :value="option.value" v-model="currentOption"/>
            <label :for="option.value">
              <div class="quiz__icon quiz__icon--checked">
                <svg transform="translate(-2, -4)"
                  width="22" 
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path class="quiz__check-icon" transform="scale(1.4, 1.4) translate(-4, 0)" d="M8 6.5L11.6429 10L19 2.5" stroke="white" stroke-width="2" />
                </svg>
              </div>
              <div class="quiz__icon quiz__icon--disabled"></div>
              {{option.label}}
            </label>
          </div>
        </div>
        <div class="quiz__control d-flex justify-center">
          <div class="quiz__prev">
            <v-btn disabled icon>
              <v-icon size="80px">{{arrowLeft}}</v-icon>
            </v-btn>
          </div>
          <div class="quiz__next">
            <v-btn icon>
              <v-icon size="80px">{{arrowRight}}</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiMenuRight, mdiMenuLeft} from "@mdi/js";

export default {
  data: () => {
    const options = [{
      label: 'Умный',
      value: 'smart'
    },
    {
      label: 'Веселый',
      value: 'funny'
    },
    {
      label: 'Грустный',
      value: 'sad'
    }]
    return {
    arrowRight: mdiMenuRight,
    arrowLeft: mdiMenuLeft,
    question: 'Опишите себя как личность',
    options,
    currentOption: ''
  }},
  watch: {
    currentOption(){
      console.log(this.currentOption)
    }
  },
};
</script>

<style lang="scss">
.content-container {
  margin-bottom: 80px;
}
.quiz {
  &__num {
    margin-bottom: 45px !important;
  }
  &__question{
    margin-bottom: 25px;
  }
  &__icon{
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid $accent;
  }
  &__option {
    position: relative;
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    input {
      opacity: 0;
      position: absolute;
      &:focus + label .quiz__icon::before {
        display: block;
        content: '';
        position: absolute;
        left: 50%;
        top: 50%; 
        transform: translate(-50%, -50%);
        width: 33px;
        height: 33px;
        background-color: rgba($accent, .2);
        border-radius: 50%;
      } 
      &:not(:checked) + label .quiz__icon--checked{
        display: none;
      }
      &:checked +  label .quiz__icon--disabled{
        display: none;
      }
    }
    label {
      display: block;
      font-family: Nunito;
      cursor: pointer;
      font-style: normal;
      font-weight: normal;
      padding-left: 30px;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.04em;
      color: #fff;
    }
    
  }
  &__check-icon {
    stroke-dasharray: 16;
    stroke-dashoffset: 16;
    animation: dash .3s ease-out forwards;
  }
  &__control{
    margin-top: 20px;
    .theme--light.v-btn.v-btn--icon{
      overflow: hidden;
      width: 50px!important;
      height: 50px!important;
      color: $accent!important;
    }
    .v-btn--disabled{
      svg{
        fill: $secondary;
      }
    }
  }
}
@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>