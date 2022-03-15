<template>
  <div
      class="abstract-item"
      @click="$router.push(item.path)">
    <!--    <reco-icon v-if="item.frontmatter.sticky" icon="reco-sticky"/>-->
    <div class="blur-img">
      <img v-lazy="item.frontmatter.cover || item.frontmatter.randomCover"
           :key="item.frontmatter.cover || item.frontmatter.randomCover"
           :alt="item.title"/>
    </div>
    <div class="cover">
      <img v-lazy="item.frontmatter.cover || item.frontmatter.randomCover" class="cover-img"
           :alt="item.title"
           :key="item.frontmatter.cover || item.frontmatter.randomCover"/>
    </div>
    <div class="info">
      <router-link class="title" :to="item.path">
        <reco-icon v-if="item.frontmatter.keys" icon="reco-lock"/>
        {{ item.title }}
      </router-link>
      <div class="custom" v-html="item.excerpt"></div>
      <PageInfo
          :pageInfo="item"
          :currentTag="currentTag">
      </PageInfo>

    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue-demi'
import {RecoIcon} from '@vuepress-reco/core/lib/components'
import PageInfo from './PageInfo'

export default defineComponent({
  components: {PageInfo, RecoIcon},
  props: ['item', 'currentPage', 'currentTag'],
})

</script>

<style lang="stylus" scoped>

.abstract-item
  position relative
  margin: 0 auto 1rem;
  overflow: hidden;
  border-radius: $borderRadius
  box-shadow: var(--box-shadow);
  box-sizing: border-box;
  transition all .3s
  display -webkit-box
  display flex
  height 12.5rem

  .blur-img
    img
      position absolute
      left 0
      top 0
      bottom 0
      right 0
      margin auto
      object-fit: cover
      -o-object-fit: cover;
      width: 100%
      height 100%
      filter blur(1.875rem) brightness(0.8);
      -webkit-filter: blur(1.875rem) brightness(0.8);
      transform scale(1.2)
      z-index -1

  .cover
    width: 35%;
    clip-path: polygon(0 0, 100% 0%, 94% 100%, 0% 100%);

    .cover-img
      width 100%
      height 100%
      transition .5s ease-out;
      object-fit cover;

  .info
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 65%;
    padding: 0 1rem;
    line-height: 1.6rem;

    .title
      font-size: 1.5rem;
      font-weight: bold;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      word-break: break-all;
      color #ffffff
      text-align center

      .reco-lock
        font-size 1.28rem
        color $accentColor

    .custom
      & >>> .custom-block
        margin .5rem 0
        color #ffffff
        padding 0.5rem 1.5rem

        p
          margin 0

        p:nth-child(2)
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size 14px

    .page-info
      color #ffffff

      & >>> i
        display inline-block


  &:hover
    box-shadow: var(--box-shadow-hover)

    .cover-img
      transform: scale3d(1.1, 1.1, 1);

  &:nth-child(2n)
    flex-direction: row-reverse !important;

    .cover
      clip-path: polygon(6% 0, 100% 0%, 100% 100%, 0% 100%);


@media (max-width: $MQNarrow)
  .abstract-item
    height 10rem

    .info
      .title
        font-size 1.2rem

      .page-info >>> i
        font-size 12px

      .custom
        display none

@media (max-width: 480px)
  .abstract-item
    height 7rem
</style>
