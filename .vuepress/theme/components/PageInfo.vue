<template>
  <div class="page-info">
    <i v-if="pageInfo.frontmatter.author || $themeConfig.author">
      🙆‍♂️
      <span>{{ pageInfo.frontmatter.author || $themeConfig.author }}</span>
    </i>
    <i v-if="pageInfo.frontmatter.date">
      🕰︎
      <span>{{ formatDateValue(pageInfo.frontmatter.date) }}</span>
    </i>
    <!--    <i v-if="showAccessNumber === true">-->
    <!--      👀-->
    <!--      <AccessNumber :idVal="pageInfo.path" :numStyle="numStyle"/>-->
    <!--    </i>-->
    <i v-if="pageInfo.frontmatter.tags" class="tags">
      🏷
      <span
          v-for="(subItem, subIndex) in pageInfo.frontmatter.tags"
          :key="subIndex"
          class="tag-item"
          :class="{ 'active': currentTag == subItem }"
          @click.stop="goTags(subItem)"
      >{{ subItem }}</span>
    </i>
  </div>
</template>

<script>
import {defineComponent} from 'vue-demi'
import {RecoIcon} from '@vuepress-reco/core/lib/components'
import {useInstance} from '@theme/helpers/composable'

export default defineComponent({
  components: {RecoIcon},
  props: {
    pageInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    currentTag: {
      type: String,
      default: ''
    },
    showAccessNumber: {
      type: Boolean,
      default: false
    }
  },

  setup(props, ctx) {
    const instance = useInstance()

    const numStyle = {
      fontSize: '.9rem',
      fontWeight: 'normal',
      color: '#999'
    }

    const goTags = (tag) => {
      if (instance.$route.path !== `/tag/${tag}/`) {
        instance.$router.push({path: `/tag/${tag}/`})
      }
    }

    const formatDateValue = (value) => {
      return new Intl.DateTimeFormat(instance.$lang).format(new Date(value))
    }

    return {numStyle, goTags, formatDateValue}
  }
})
</script>

<style lang="stylus" scoped>
.page-info
  text-align center
  color var(--text-color-sub)

i
  display inline-block
  line-height 1.5rem
  font-size 14px
  font-style normal
  margin 0

  &:nth-child(2)
    margin 0 .5rem

  span
    margin-left .1rem

.tags
  .tag-item
    font-family Ubuntu, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif
    cursor pointer

    &.active
      color $accentColor

    &:hover
      color $accentColor

@media (max-width: $MQMobile)
  .tags
    display block
    margin-left 0 !important
</style>
