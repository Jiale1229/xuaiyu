<template>
  <!--页面banner 文章详情页取页面cover:指定封面 randomCover：随机封面  其他页面随机封面 -->
  <div class="page-banner"
       v-lazy:background-image="$page.frontmatter.cover ||$page.frontmatter.randomCover|| 'https://api.btstu.cn/sjbz/api.php?lx=suiji&format=images&num='+randomNumber"
       :key="$page.frontmatter.cover">
    <ModuleTransition delay="0.04">
      <h1 class="hero-title">
        {{ $page.title || '那些日子、我和你' }}
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
  setup() {
    const randomNumber = Math.random().toString(36).substr(2)
    return {randomNumber}
  }

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
