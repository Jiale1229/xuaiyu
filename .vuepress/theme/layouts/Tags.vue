<template>
  <Common :sidebar="false">
    <div class="tags-wrapper">

      <div v-if="$recoPosts.length>0">
        <!-- 标签集合 -->
        <ModuleTransition>
          <TagList
              v-show="recoShowModule"
              :currentTag="$recoLocales.all"
              @getCurrentTag="tagClick"></TagList>
        </ModuleTransition>

        <!-- 博客列表 -->
        <ModuleTransition delay="0.08">
          <note-abstract
              v-show="recoShowModule"
              class="list"
              :data="$recoPosts"
              @paginationChange="paginationChange"
          ></note-abstract>
        </ModuleTransition>
      </div>

      <div v-else>
        <ModuleTransition delay="0.06">
          <h1>暂无内容</h1>
        </ModuleTransition>
      </div>

    </div>

  </Common>
</template>

<script>
import {defineComponent} from 'vue-demi'
import Common from '@theme/components/Common'
import TagList from '@theme/components/TagList'
import NoteAbstract from '@theme/components/NoteAbstract'
import {ModuleTransition} from '@vuepress-reco/core/lib/components'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'
import {useInstance} from '@theme/helpers/composable'

export default defineComponent({
  mixins: [moduleTransitonMixin],
  components: {Common, NoteAbstract, TagList, ModuleTransition},

  setup(props, ctx) {
    const instance = useInstance()

    const tagClick = (tagInfo) => {
      if (instance.$route.path !== tagInfo.path) {
        instance.$router.push({path: tagInfo.path})
      }
    }

    const paginationChange = (page) => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    }

    return {tagClick, paginationChange}
  }
})
</script>

<style src="../styles/theme.styl" lang="stylus"></style>
<!--<style src="prismjs/themes/prism-tomorrow.css"></style>-->
<style lang="stylus" scoped>

@media (max-width: $MQMobile)
  .tags-wrapper
    padding: 5rem 0.6rem 0;
</style>
