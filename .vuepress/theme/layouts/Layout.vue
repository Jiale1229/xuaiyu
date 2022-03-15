<template>
  <Common :sidebarItems="sidebarItems" :showModule="recoShowModule">
    <Page v-if="$frontmatter.title" :sidebar-items="sidebarItems"/>
    <component v-else :is="$options.components.HomeBlog"/>
  </Common>
</template>

<script>
import {defineComponent, computed} from 'vue-demi'
import HomeBlog from '@theme/components/HomeBlog'
import Page from '@theme/components/Page'
import Common from '@theme/components/Common'
import {resolveSidebarItems} from '@theme/helpers/utils'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'
import {useInstance} from '@theme/helpers/composable'

export default defineComponent({
  mixins: [moduleTransitonMixin],
  components: {HomeBlog, Page, Common},
  setup(props, ctx) {
    const instance = useInstance()
    const sidebarItems = computed(() => {
      const {$page, $site, $localePath} = instance
      if ($page) {
        return resolveSidebarItems(
            $page,
            $page.regularPath,
            $site,
            $localePath
        )
      } else {
        return []
      }
    })
    return {sidebarItems}
  },

})
</script>

<style src="../styles/theme.styl" lang="stylus"></style>
