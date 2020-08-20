<template>
  <div class="d-flex justify-center align-center">
    <div class="content-container">
      <div class="profile">
        <div class="profile__user d-flex align-center">
          <img src="../assets/logo.png" alt="profile-avatar" class="profile__user-avatar">
          <div class="profile__user-info">
            <h5 class="title-h5">
              Max
            </h5>
            <p class="parag">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
        </div>
        <div class="profile__results-list">
          <h2 class="title-h2">Результаты</h2>
          <div class="profile__result-item" v-for="(result, idx) in results" :key="idx">
            <h4 class="title-h4">
              {{result.title}}
            </h4>
            <p class="parag">
              {{result.description}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      results: [{
        title: 'Тест на гея',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis tempus a enim tellus id. Elementum fringilla id suspendisse id et. Odio semper in pulvinar elementum urna, sit. Ullamcorper eget laoreet vel tincidunt vitae mauris porttitor. '
      }]
    })
  }
</script>

<style lang="scss">
  .profile{
    &__user{
      margin-bottom: 80px;
      &-avatar{
        max-width: 70px;
        max-height: 70px;
        border-radius: 50%;
        object-fit: cover;
      }
      &-info{
        margin-left: 20px;
        p{
          margin: 0;
        }
      }
    }
    &__results-list{
      h2{
        margin-bottom: 20px;
      }
    }
    &__result-item{
      &:not(:last-child){
        margin-bottom: 30px;
      }
      h4{
        margin-bottom: 10px;
      }
    }
  }
</style>