<template>
  <header :class="['navbar',{'top-nav':isTopNav||!showModule}]">

    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

    <router-link
        :to="$localePath"
        class="home-link">
      <img
          class="logo"
          v-if="$themeConfig.logo"
          :src="$withBase($themeConfig.logo)"
          :alt="$siteTitle">
      <span
          ref="siteName"
          class="site-name"
          v-if="$siteTitle">{{ $siteTitle }}</span>
    </router-link>

    <div
        class="links"
        :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}">
      <AlgoliaSearchBox
          v-if="isAlgoliaSearch"
          :options="algolia"/>

      <SearchBox v-else-if="$themeConfig.search !== false && $frontmatter.search !== false"/>

      <NavLinks class="can-hide"/>

      <Mode/>
    </div>
  </header>
</template>

<script>
import {defineComponent, ref, onMounted, computed} from 'vue-demi'
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton'
import NavLinks from '@theme/components/NavLinks'
import {useInstance} from '@theme/helpers/composable'
import Mode from '@theme/components/Mode'

export default defineComponent({
  components: {SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox, Mode},
  props: ['showModule'],
  setup(props, ctx) {

    const isTopNav = false
    const instance = useInstance()
    const linksWrapMaxWidth = ref(null)

    const algolia = computed(() => {
      return instance.$themeLocaleConfig.algolia || instance.$themeConfig.algolia || {}
    })

    const isAlgoliaSearch = computed(() => {
      algolia.value && algolia.value.apiKey && algolia.value.indexName
    })

    function css(el, property) {
      // NOTE: Known bug, will return 'auto' if style value is 'auto'
      const win = el.ownerDocument.defaultView
      // null means not to return pseudo styles
      return win.getComputedStyle(el, null)[property]
    }

    onMounted(() => {
      const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
      const NAVBAR_VERTICAL_PADDING =
          parseInt(css(instance.$el, 'paddingLeft')) +
          parseInt(css(instance.$el, 'paddingRight'))

      const handleLinksWrapWidth = () => {
        if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
          linksWrapMaxWidth.value = null
        } else {
          linksWrapMaxWidth.value =
              instance.$el.offsetWidth -
              NAVBAR_VERTICAL_PADDING -
              (instance.$refs.siteName && instance.$refs.siteName.offsetWidth || 0)
        }
      }

      handleLinksWrapWidth()
      window.addEventListener('resize', handleLinksWrapWidth, false)
    })


    return {linksWrapMaxWidth, algolia, isAlgoliaSearch, css, isTopNav}
  },

  /*监听页面滚动改变navbar*/
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 100) {
        this.isTopNav = true
      } else {
        this.isTopNav = false
      }
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },

})
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  box-shadow var(--box-shadow)
  background var(--default-color-0)
  transition: .5s ease-in-out

  a, span, img
    display inline-block

  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
    border-radius 50%

  .site-name
    font-size 1.2rem
    font-weight 600
    position relative
    color var(--text-white-color)

  .links
    padding-left 1.5rem
    box-sizing border-box
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex

    .search-box
      flex: 0 0 auto
      vertical-align top

.top-nav
  background var(--navbar-background-color)

@media (max-width: $MQNarrow) and (min-width: $MQMobile)
  .navbar
    .site-name
      display none

@media (max-width: $MQMobile)
  .navbar
    padding-left 3.5rem

    .site-name
      display none

    .can-hide
      display none

    .links
      top: 0.7rem;
      padding 0;
</style>
