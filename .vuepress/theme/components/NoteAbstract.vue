<template>
  <div class="abstract-wrapper">
    <NoteAbstractItem
        v-for="(item) in currentPageData"
        :key="item.path"
        :item="item"
        :currentPage="currentPage"
        :currentTag="currentTag"
    />
    <pagation
        class="pagation"
        :total="data.length"
        :currentPage="currentPage"
        @getCurrentPage="getCurrentPage"
    />
  </div>
</template>

<script>
import {defineComponent, ref, toRefs, computed, onMounted} from 'vue-demi'
import pagination from '@theme/mixins/pagination'
import NoteAbstractItem from './NoteAbstractItem'
import {useInstance} from '@theme/helpers/composable'

export default defineComponent({
  mixins: [pagination],
  components: {NoteAbstractItem},
  props: ['data', 'currentTag'],
  setup(props, ctx) {
    const instance = useInstance()

    const {data} = toRefs(props)

    const currentPage = ref(1)

    /*修改 Md randomCover字段 随机封面图*/
    data.value.forEach((v, k) => {
      if (v.frontmatter.randomCover) {
        const randomNumber = Math.random().toString(36).substr(2)
        v.frontmatter.randomCover = `https://api.btstu.cn/sjbz/api.php?lx=suiji&format=images&randomnum=${randomNumber}`
      }
    })

    const currentPageData = computed(() => {
      const start = (currentPage.value - 1) * instance.$perPage
      const end = currentPage.value * instance.$perPage
      return data.value.slice(start, end)
    })

    const getCurrentPage = (page) => {
      currentPage.value = page
      instance._setStoragePage(page)
      ctx.emit('paginationChange', page)
    }

    onMounted(() => {
      currentPage.value = instance._getStoragePage() || 1
    })

    return {currentPage, currentPageData, getCurrentPage}
  },
  watch: {
    $route() {
      this.currentPage = this._getStoragePage() || 1
    }
  }
})
</script>

<style lang="stylus" scoped>
.abstract-wrapper
  width 100%
</style>
