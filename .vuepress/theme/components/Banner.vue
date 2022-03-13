<template>
  <!--页面banner page页取页面cover -->
  <div class="page-banner"
       :style="{ backgroundImage: `url(${$page.frontmatter.cover}` }">
    <ModuleTransition delay="0.04">
      <h1 class="hero-title">
        {{ $page.title }}
      </h1>
    </ModuleTransition>

    <ModuleTransition delay="0.06">
      <PageInfo class="sm-hero-title" :pageInfo="$page"></PageInfo>
    </ModuleTransition>

  </div>

</template>
<script>
import {defineComponent} from 'vue-demi'
import PageInfo from '@theme/components/PageInfo'
import {ModuleTransition} from '@vuepress-reco/core/lib/components'


export default defineComponent({
  components: {ModuleTransition, PageInfo},
})


</script>

<style lang="stylus">
.page-banner {
  padding 0 20px
  height 60vh
  color #ffffff !important
  text-shadow 0 0.1875rem 0.3125rem #1c1f21
  text-align center
  display flex
  flex-direction column
  align-items center
  justify-content center
  position relative
  background-size cover
  background-position center
  background-repeat no-repeat

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/icon/1.png");
  }


  .hero-title {
    font-size: 2rem;
    margin 0
    font-weight: 700;
    word-break: break-all;
  }

  .sm-hero-title {
    color #ffffff
    margin: 1rem 0;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.2;

  }

}

</style>
