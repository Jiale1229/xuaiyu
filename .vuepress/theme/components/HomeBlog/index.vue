<template>
  <div class="home-blog">
    <!--首页大图-->
    <div class="hero">

      <ModuleTransition delay="0.04">
        <h1 id="dictum" class="hero-title"></h1>
      </ModuleTransition>

      <ModuleTransition delay="0.06">
        <h4 id="writer" class="sm-hero-title"></h4>
      </ModuleTransition>


      <i class="iconfont reco-other anchor-down" @click="scrollFn" id="AnchorDown"></i>
    </div>
    <!--首页大图-->
    <ModuleTransition delay="0.16">
      <div v-show="recoShowModule" class="home-blog-wrapper">
        <div class="blog-list">
          <!-- 博客列表 -->
          <note-abstract :data="$recoPosts" @paginationChange="paginationChange"/>
        </div>
        <div class="info-wrapper">
          <PersonalInfo/>
          <h4>
            📂
            {{ $recoLocales.category }}
          </h4>
          <ul class="category-wrapper">
            <li class="category-item" v-for="(item, index) in $categoriesList" :key="index">
              <router-link :to="item.path">
                <span class="category-name">{{ item.name }}</span>
                <span class="post-num" :style="{ 'backgroundColor': getOneColor() }">{{ item.pages.length }}</span>
              </router-link>
            </li>
          </ul>
          <hr>
          <LoveTime/>
          <hr>
          <h4 v-if="$tags.list.length !== 0">
            🏷
            {{ $recoLocales.tag }}
          </h4>
          <TagList @getCurrentTag="getPagesByTags"/>
          <h4 v-if="$themeConfig.friendLink && $themeConfig.friendLink.length !== 0">
            <reco-icon icon="reco-friend"/>
            {{ $recoLocales.friendLink }}
          </h4>
          <FriendLink/>
        </div>
      </div>
    </ModuleTransition>
<!--    <Content v-show="recoShowModule" class="home-center" custom/>-->
  </div>
</template>

<script>
import {defineComponent, toRefs, reactive, computed, onMounted} from 'vue-demi'
import TagList from '@theme/components/TagList'
import FriendLink from '@theme/components/FriendLink'
import NoteAbstract from '@theme/components/NoteAbstract'
import {ModuleTransition, RecoIcon} from '@vuepress-reco/core/lib/components'
import PersonalInfo from '@theme/components/PersonalInfo'
import {getOneColor} from '@theme/helpers/other'
import {useInstance} from '@theme/helpers/composable'
import LoveTime from '@theme/components/LoveTime'
import axios from 'axios'


export default defineComponent({
  components: {NoteAbstract, TagList, FriendLink, ModuleTransition, PersonalInfo, RecoIcon, LoveTime},
  setup(props, ctx) {
    const instance = useInstance()

    const state = reactive({
      recoShow: false,
      heroHeight: 0
    })

    const recoShowModule = computed(() => instance && instance.$parent.recoShowModule)


    onMounted(() => {
      state.heroHeight = document.querySelector('.hero').clientHeight
      state.recoShow = true
    })

    return {recoShowModule, ...toRefs(state), getOneColor}
  },
  mounted() {
    /*随机名人名言*/
    axios.get('https://v1.hitokoto.cn', {
      params: {
        c: 'k'
      }
    })
        .then(({data}) => {
          document.getElementById('dictum').innerHTML = `${data.hitokoto}`
          if (data.from != null) {
            document.getElementById('writer').innerText = `『 ${data.from} 』`
          }
        })
        .catch(console.error)
  },
  methods: {
    paginationChange(page) {
      setTimeout(() => {
        window.scrollTo(0, this.heroHeight)
      }, 100)
    },
    getPagesByTags(tagInfo) {
      this.$router.push({path: tagInfo.path})
    },
    /*滚动到指定位置*/
    scrollFn() {
      const windowH = document.getElementsByClassName('hero')[0].clientHeight - document.getElementsByClassName('navbar')[0].clientHeight;  /*获取窗口高度*/
      document.documentElement.scrollTop = windowH;
    }
  },
})
</script>

<style lang="stylus">
.home-blog {
  padding: 0;
  margin: 0 auto;

  .hero {
    //margin $navbarHeight auto 0
    position relative
    padding 0 20px
    height 100vh
    color #ffffff
    font-family Long Cang, cursive !important
    text-shadow 0 0.1875rem 0.3125rem #1c1f21
    text-align center
    display flex
    flex-direction column
    align-items center
    justify-content center
    background url("https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN") center / cover no-repeat
    //background url("https://api.btstu.cn/sjbz/api.php?lx=suiji&format=images") center / cover no-repeat

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
    }

    .sm-hero-title {
      margin: 1rem 0;
      font-size: 1.5rem;
    }

    .anchor-down {
      font-size: 2rem;
      font-weight: bold;
      display: inline-block;
      position: relative;
      padding-top: 8rem;
      color: #fff;
      opacity: 0;
      -webkit-animation: scroll-down 1.5s 4s infinite;
      animation: scroll-down 1.5s 3s infinite;
      cursor: pointer;
    }
  }

  .home-blog-wrapper {
    display flex
    align-items: flex-start;
    margin 20px auto 30px
    padding 0 20px
    max-width $homePageWidth

    .blog-list {
      flex auto
      width 0

      .abstract-wrapper {
        .abstract-item:last-child {
          margin-bottom: 0px;
        }
      }
    }

    .info-wrapper {
      position -webkit-sticky;
      position sticky;
      top 70px
      overflow hidden
      transition all .3s
      margin-left 15px
      flex 0 0 300px
      height auto
      box-shadow var(--box-shadow)
      border-radius $borderRadius
      box-sizing border-box
      padding 0 15px
      background var(--background-color)

      &:hover {
        box-shadow var(--box-shadow-hover)
      }

      h4 {
        color var(--text-color)
        margin 1rem 0
      }

      .category-wrapper {
        list-style none
        padding-left 0

        .category-item {
          margin-bottom .4rem
          padding: .4rem .8rem;
          transition: all .5s
          border-radius $borderRadius
          box-shadow var(--box-shadow)
          background-color var(--background-color)

          &:hover {
            transform scale(1.04)

            a {
              color $accentColor
            }
          }

          a {
            display flex
            justify-content: space-between
            align-items: center
            color var(--text-color)

            .post-num {
              width 1.6rem;
              height 1.6rem
              text-align center
              line-height 1.6rem
              border-radius $borderRadius
              background #eee
              font-size 13px
              color #fff
            }
          }
        }
      }

      .tags {
        margin 1rem 0
      }

    }


  }
}


@-moz-keyframes scroll-down {
  0% {
    opacity: 0.8;
    top: 0;
  }
  50% {
    opacity: 0.4;
    top: -1em;
  }
  100% {
    opacity: 0.8;
    top: 0;
  }
}

@-webkit-keyframes scroll-down {
  0% {
    opacity: 0.8;
    top: 0;
  }
  50% {
    opacity: 0.4;
    top: -1em;
  }
  100% {
    opacity: 0.8;
    top: 0;
  }
}

@-o-keyframes scroll-down {
  0% {
    opacity: 0.8;
    top: 0;
  }
  50% {
    opacity: 0.4;
    top: -1em;
  }
  100% {
    opacity: 0.8;
    top: 0;
  }
}

@keyframes scroll-down {
  0% {
    opacity: 0.8;
    top: 0;
  }
  50% {
    opacity: 0.4;
    top: -1em;
  }
  100% {
    opacity: 0.8;
    top: 0;
  }
}


@media (max-width: $MQMobile) {
  .home-blog {
    .hero {
      height 60vh
    }

    .anchor-down {
      display none !important
    }

    .home-blog-wrapper {
      display block !important

      .blog-list {
        width auto
      }

      .info-wrapper {
        // display none!important
        margin-left 0

        .personal-info-wrapper {
          display none
        }
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    .hero {
      .hero-title {
        font-size: 1.7rem;
      }

      .sm-hero-title {
        font-size: 1rem;
      }

    }
  }
}
</style>
