<template>
  <div class="avatar" :style="`width: ${size}px; height: ${size}px;`">
    <div class="avatar__input-photo d-flex justify-center align-center">
      <v-file-input
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        color="#fff"
        :hide-input="true"
        placeholder="Pick an avatar"
        prepend-icon="mdi-camera"
        label="Avatar"
      ></v-file-input>
    </div>
    <div class="avatar__wrapper d-flex justify-center align-center">
      <v-icon color="#fff" :size="`${size * 0.8}px`">{{avatarIcon}}</v-icon>
    </div>
  </div>
</template>

<script>
import { mdiAccount } from '@mdi/js'
export default {
  props: ['size'],
  data(){
    return {
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      photoInput: {
        type: Boolean,
        default: false
      },
      avatarIcon: mdiAccount
    }
  }
}
</script>

<style lang="scss">
  .avatar{
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    &__wrapper{
      background-color: $error;
      width: 100%;
      height: 100%;
    }
    &__input-photo{
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.5);
      .v-input{
        margin-top: 0;
        padding-top: 0;
        flex: none;
        &__prepend-outer{
          margin: 0;
        }
      }
      .theme--light.v-icon{
        color: #fff;
      }
    }
  }
</style>