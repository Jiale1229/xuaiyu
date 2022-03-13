<template>
  <!--  <main class="page">-->
  <main class="page">
    <ModuleTransition delay="0.08">
      <section v-show="recoShowModule">
        <div class="content-wrapper" :style="{padding:$showSubSideBar?'':'2rem 0'}">
          <Content :class="['theme-reco-content',{'theme-reco-content-noSubSideBar':!pageStyle}]"/>
          <SubSidebar v-if="recoShowModule" class="side-bar"/>
        </div>
      </section>
    </ModuleTransition>

    <ModuleTransition delay="0.16" v-if="editLink">
      <footer class="page-edit">
        <div class="edit-link">
          <a
              :href="editLink"
              target="_blank"
              rel="noopener noreferrer"
          >{{ editLinkText }}</a>
          <OutboundLink/>
        </div>
        <div
            class="last-updated"
            v-if="lastUpdated"
        >
          <span class="prefix">{{ lastUpdatedText }}: </span>
          <span class="time">{{ lastUpdated }}</span>
        </div>
      </footer>
    </ModuleTransition>

    <ModuleTransition delay="0.24" v-if="recoShowModule && (prev || next)">
      <div class="page-nav">
        <p class="inner">
          <router-link v-if="prev" :to="prev.path" class="prev">
            <i>👈</i>
            <span class="mb-show">上一篇</span>
            <span class="pc-show">{{ prev.title || prev.path }}</span>
          </router-link>
          <router-link v-if="next" :to="next.path" class="next">
            <span class="pc-show">{{ next.title || next.path }}</span>
            <span class="mb-show">下一篇</span>
            <i>👉</i>
          </router-link>
        </p>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.32">
      <Comments v-if="recoShowModule" :isShowComments="shouldShowComments"/>
    </ModuleTransition>

  </main>
</template>

<script>
import {defineComponent, computed, toRefs} from 'vue-demi'
import PageInfo from '@theme/components/PageInfo'
import {resolvePage, outboundRE, endingSlashRE} from '@theme/helpers/utils'
import {ModuleTransition} from '@vuepress-reco/core/lib/components'
import SubSidebar from '@theme/components/SubSidebar'
import {useInstance} from '@theme/helpers/composable'

export default defineComponent({
  components: {PageInfo, ModuleTransition, SubSidebar},

  props: ['sidebarItems'],

  setup(props, ctx) {
    const instance = useInstance()

    const {sidebarItems} = toRefs(props)

    const recoShowModule = computed(() => instance.$parent.recoShowModule)


    // 是否显示评论
    const shouldShowComments = computed(() => {
      const {isShowComments} = instance.$frontmatter
      const {showComment} = instance.$themeConfig.valineConfig || {showComment: true}
      return (showComment !== false && isShowComments !== false) || (showComment === false && isShowComments === true)
    })


    const showAccessNumber = computed(() => {
      const {
        $themeConfig: {valineConfig},
        $themeLocaleConfig: {valineConfig: valineLocalConfig}
      } = instance || {}

      const vc = valineLocalConfig || valineConfig

      return vc && vc.visitor != false
    })

    const lastUpdated = computed(() => {
      if (instance.$themeConfig.lastUpdated === false) return false
      return instance.$page.lastUpdated
    })


    const lastUpdatedText = computed(() => {
      if (typeof instance.$themeLocaleConfig.lastUpdated === 'string') {
        return instance.$themeLocaleConfig.lastUpdated
      }
      if (typeof instance.$themeConfig.lastUpdated === 'string') {
        return instance.$themeConfig.lastUpdated
      }
      return 'Last Updated'
    })

    const prev = computed(() => {
      const frontmatterPrev = instance.$frontmatter.prev


      if (frontmatterPrev === false) {
        return
      } else if (frontmatterPrev) {
        return resolvePage(instance.$site.pages, frontmatterPrev, instance.$route.path)
      } else {

        return resolvePrev(instance.$page, sidebarItems.value)
      }
    })

    const next = computed(() => {
      const frontmatterNext = instance.$frontmatter.next
      if (next === false) {
        return
      } else if (frontmatterNext) {
        return resolvePage(instance.$site.pages, frontmatterNext, instance.$route.path)
      } else {
        return resolveNext(instance.$page, sidebarItems.value)
      }
    })

    const editLink = computed(() => {
      if (instance.$frontmatter.editLink === false) {
        return false
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = instance.$themeConfig

      if (docsRepo && editLinks && instance.$page.relativePath) {
        return createEditLink(repo, docsRepo, docsDir, docsBranch, instance.$page.relativePath)
      }
      return ''
    })

    const editLinkText = computed(() => {
      return (
          instance.$themeLocaleConfig.editLinkText || instance.$themeConfig.editLinkText || `Edit this page`
      )
    })


    const pageStyle = computed(() => {
      // console.log(instance.$showSubSideBar)
      return instance.$showSubSideBar
    })

    return {
      recoShowModule,
      shouldShowComments,
      showAccessNumber,
      lastUpdated,
      lastUpdatedText,
      prev,
      next,
      editLink,
      editLinkText,
      pageStyle
    }
  }
})

function createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
  const bitbucket = /bitbucket.org/
  if (bitbucket.test(repo)) {
    const base = outboundRE.test(docsRepo)
        ? docsRepo
        : repo
    return (
        base.replace(endingSlashRE, '') +
        `/src` +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
        path +
        `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
    )
  }

  const base = outboundRE.test(docsRepo)
      ? docsRepo
      : `https://github.com/${docsRepo}`

  return (
      base.replace(endingSlashRE, '') +
      `/edit` +
      `/${docsBranch}/` +
      (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
      path
  )
}

function resolvePrev(page, items) {

  return find(page, items, -1)
}

function resolveNext(page, items) {
  return find(page, items, 1)
}

function find(page, items, offset) {
  const res = []
  flatten(items, res)
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset]
    }
  }
}

function flatten(items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      flatten(items[i].children || [], res)
    } else {
      res.push(items[i])
    }
  }
}

</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  position relative
  display block


  .side-bar
    position sticky
    top 10rem
    max-height 25rem
    overflow-y scroll

    &::-webkit-scrollbar
      width: 0
      height: 0

  .page-title
    max-width: $contentWidth;
    margin: 0 auto;
    padding: 1rem 2.5rem;
    color var(--text-color)
    word-break break-all
    text-align center

  .content-wrapper
    padding 2rem
    display flex
    align-items flex-start
    justify-content space-between


  .theme-reco-content
    border-radius .5rem
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    background var(--background-color)
    z-index 3
    margin-top -4rem !important
    flex: auto;
    max-width 75% !important

  .theme-reco-content-noSubSideBar
    max-width 80%


  .theme-reco-content h2
    position relative
    padding-left 0.8rem

    &::before
      position absolute
      left 0
      top 3.5rem
      display block
      height 1.8rem
      content ''
      border-left 5px solid $accentColor

  .page-edit
    @extend $wrapper
    padding-top 1rem
    padding-bottom 1rem
    overflow auto

    .edit-link
      display inline-block

      a
        color $accentColor
        margin-right 0.25rem

    .last-updated
      float right
      font-size 0.9em

      .prefix
        font-weight 500
        color $accentColor

      .time
        font-weight 400
        color #aaa

  .comments-wrapper
    @extend $wrapper

.page-nav
  @extend $wrapper
  padding-top 1rem
  padding-bottom 0

  .inner
    min-height 2rem
    margin-top 0
    border-top 1px dashed var(--border-color)
    padding-top 1rem
    overflow hidden

  i
    margin 0 .5rem
    font-size 1.5rem

  a
    display flex
    align-items center

  span
    max-width 18rem
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;

  .mb-show
    display none

  .prev
    float left

    &:hover
      i
        animation: post-prev-anim 1s .1s ease-in-out infinite forwards alternate;

  .next
    float right

    &:hover
      i
        animation: post-next-anim 1s .1s ease-in-out infinite forwards alternate;


@-moz-keyframes post-prev-anim {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(-0.35rem);
    transform: translateX(-0.35rem);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@-webkit-keyframes post-prev-anim {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(-0.35rem);
    transform: translateX(-0.35rem);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@-o-keyframes post-prev-anim {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(-0.35rem);
    transform: translateX(-0.35rem);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes post-prev-anim {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(-0.35rem);
    transform: translateX(-0.35rem);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@-moz-keyframes post-next-anim {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(0.35rem);
    transform: translateX(0.35rem);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@-webkit-keyframes post-next-anim {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(0.35rem);
    transform: translateX(0.35rem);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@-o-keyframes post-next-anim {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(0.35rem);
    transform: translateX(0.35rem);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes post-next-anim {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(0.35rem);
    transform: translateX(0.35rem);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}


@media (max-width: $MQNarrow)
  .page
    .theme-reco-content
      max-width 70% !important

@media (max-width: $MQMobile)
  .page
    .side-bar
      display none

    .theme-reco-content
      max-width 100% !important
      box-sizing border-box
      background var(--default-color-0)
      margin-top 0 !important
      box-shadow none

    .theme-reco-content-noSubSideBar
      max-width 100%


    .content-wrapper
      padding 0

    .page-title
      padding: 0 1rem;

    .page-edit
      .edit-link
        margin-bottom .5rem

      .last-updated
        font-size .8em
        float none
        text-align left


  .page-nav
    .mb-show
      display block

    .pc-show
      display none


</style>
