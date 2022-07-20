<template>
  <div class="footer-wrapper">
    <p>
      <span class="author-startYear">
        ©️
        <a>
          <span v-if="$themeConfig.author">{{ $themeConfig.author }}</span>
          &nbsp;&nbsp;
          <span v-if="$themeConfig.startYear && $themeConfig.startYear != (new Date().getFullYear())">{{
              $themeConfig.startYear
            }} - </span>
          {{ new Date().getFullYear() }}
        </a>
      </span>
      <span v-show="showAccessNumber">
        👀
        <AccessNumber idVal="/"/>
      </span>
    </p>
    <span class="cyber-security" v-if="$themeConfig.cyberSecurityRecord">
      <img src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" alt="">
      <a :href="$themeConfig.cyberSecurityLink || '#'">{{ $themeConfig.cyberSecurityRecord }}</a>
    </span>
    <span v-if="$themeConfig.record">
        <img src="https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/icon/icp.png" alt="">
      <a target="_blank" :href="$themeConfig.recordLink || '#'">{{ $themeConfig.record }}</a>
    </span>
    <Comments :isShowComments="false"/>
  </div>
</template>

<script>
import {defineComponent, computed} from 'vue-demi'
import {RecoIcon} from '@vuepress-reco/core/lib/components'
import {version} from '../package.json'
import {useInstance} from '@theme/helpers/composable'

export default defineComponent({
  components: {RecoIcon},
  setup(props, ctx) {
    const instance = useInstance()
    const showAccessNumber = computed(() => {
      const {
        $themeConfig: {valineConfig},
        $themeLocaleConfig: {valineConfig: valineLocalConfig}
      } = instance

      const vc = valineLocalConfig || valineConfig.showComment

      return vc && vc.visitor !== false
    })
    return {version, showAccessNumber}
  }
})
</script>

<style lang="stylus" scoped>
.footer-wrapper {
  padding: 1.5rem 2.5rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
  color: lighten($textColor, 25%);

  a {
    font-size 14px
  }

  img {
    margin-right .5rem
    width 15px
    height 15px
    vertical-align middle
  }

  > span {
    margin-left 1rem

    > i {
      margin-right .5rem
    }
  }

  .cyber-security {
    a {
      vertical-align middle
    }
  }

  .author-startYear {
    margin-right 1rem
  }
}

@media (max-width: $MQMobile) {
  .footer {
    text-align: left !important;

    > span {
      display block
      margin-left 0
      line-height 2rem
    }
  }

  p {
    margin 0
  }
}
</style>
