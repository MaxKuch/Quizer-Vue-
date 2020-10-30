<template>
  <div class="d-flex comment-item">
    <div class="flex-shrink-0">
      <Avatar size="50"/>
    </div>
    <div class="comment-item__body">
      <div class="d-flex align-end">
        <router-link :to="`/profile/${comment.author.id}`" class="title-h5">
          {{comment.author.username}}
        </router-link>
        <small>{{comment.created | distanceToNow}}</small>
      </div> 
      <p class="parag">{{comment.text}}</p>
    </div>
  </div>
</template>

<script>
  import Avatar from '@/components/Avatar'
  export default {
    props: ['comment'],
    components: {
      Avatar
    }
  }
</script>

<style lang="scss">
  .comment-item{
    &:not(:last-child){
      margin-bottom: 15px;
    }
    a {
      letter-spacing: 0.1px;
      text-transform: capitalize;
      text-decoration: none;
      color: $accent;
      line-height: 1;
    }
    p {
      margin-top: 5px;
      margin-bottom: 0!important;
      font-size: 16px;
    }
    small{
      line-height: 1;
      margin-left: 5px;
    }
    &__body{
      margin-left: 15px;
    }
  }
</style>