<template>
  <div class="password-shadow">
    <ModuleTransition>
      <h3 v-show="recoShowModule" class="title">
        {{ isPage ? $frontmatter.title : $site.title || $localeConfig.title }}</h3>
    </ModuleTransition>

    <ModuleTransition delay="0.08">
      <p class="description" v-if="recoShowModule && !isPage">{{ $site.description || $localeConfig.description }}</p>
    </ModuleTransition>

    <ModuleTransition delay="0.16">
      <label v-show="recoShowModule" class="inputBox" id="box">
        <input
            v-model="key"
            type="password"
            @keyup.enter="inter"
            @focus="inputFocus"
            @blur="inputBlur">
        <span>{{ warningText }}</span>
        <button ref="passwordBtn" @click="inter">OK</button>
      </label>
    </ModuleTransition>

  </div>
</template>

<script>
import {defineComponent, ref, toRefs, computed} from 'vue-demi'
import md5 from 'md5'
import {ModuleTransition, RecoIcon} from '@vuepress-reco/core/lib/components'
import {useInstance} from '@theme/helpers/composable'


export default defineComponent({
  name: 'Password',
  components: {ModuleTransition, RecoIcon},
  props: {
    isPage: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const instance = useInstance()

    const year = new Date().getFullYear()

    const key = ref('')
    const warningText = ref('Konck! Knock!')
    const recoShowModule = computed(() => instance?.$parent?.recoShowModule)
    const {isPage} = toRefs(props)

    const isHasKey = () => {
      let {keys} = instance.$themeConfig.keyPage
      keys = keys.map(item => item.toLowerCase())
      return keys.indexOf(sessionStorage.getItem('key')) > -1
    }
    const isHasPageKey = () => {
      const pageKeys = instance.$frontmatter.keys.map(item => item.toLowerCase())
      const pageKey = `pageKey${window.location.pathname}`

      return pageKeys && pageKeys.indexOf(sessionStorage.getItem(pageKey)) > -1
    }

    const inter = () => {
      const keyVal = md5(key.value.trim())
      const pageKey = `pageKey${window.location.pathname}`
      const keyName = isPage.value ? pageKey : 'key'
      sessionStorage.setItem(keyName, keyVal)
      const isKeyTrue = isPage.value ? isHasPageKey() : isHasKey()
      if (!isKeyTrue) {
        warningText.value = 'Key Error'
        return
      }

      warningText.value = 'Key Success'

      const width = document.getElementById('box').style.width

      instance.$refs.passwordBtn.style.width = `${width - 2}px`
      instance.$refs.passwordBtn.style.opacity = 1

      setTimeout(() => {
        window.location.reload()
      }, 800)
    }

    const inputFocus = () => {
      warningText.value = 'Input Your Key'
    }

    const inputBlur = () => {
      warningText.value = 'Konck! Knock!'
    }

    return {warningText, year, key, recoShowModule, inter, inputFocus, inputBlur}
  }
})
</script>

<style lang="stylus" scoped>
.password-shadow {
  min-height 75vh
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;

  .title {
    margin 5rem 0
    text-align center
    font-size 30px
    text-shadow $textShadow
    color var(--text-color)
  }

  .description {
    margin 0 auto 6rem
    text-align center

    color var(--text-color)
    font-size 22px
    box-sizing: border-box;
    padding: 0 10px;
    text-shadow $textShadow
  }

  .inputBox {
    width: 80%;
    max-width: 40rem;
    height: 100px;
    background: $accentColor;
    border-radius: $borderRadius
    box-sizing border-box
    opacity 0.9
    input {
      width: 100%;
      height: 100%;
      border: none;
      color: #fff;
      background: none;
      outline: none;
      position: absolute;
      bottom: 0;
      opacity 0
      font-size 50px
      padding 0 115px 0 15px
      box-sizing border-box


      &:focus {
        opacity 1
      }

      &:focus ~ span {
        transform: translateY(-80px);
        color $accentColor
        font-size 30px
        opacity: 0.8;
      }

      &:focus ~ button {
        opacity: 1;
        width: 100px;
      }
    }

    span {
      display: block;
      position: absolute;
      line-height: 100px;
      top: 0;
      left: 15px;
      color: #fff;
      cursor: text;
      transition: 0.5s;
      transform-origin: left top;
      font-size 30px
    }

    button {
      overflow hidden
      width: 0;
      height: 98px;
      border-radius: $borderRadius
      position: absolute;
      background var(--background-color)
      right: 1px;
      top 1px
      border: 0;
      padding: 0;
      color: $accentColor;
      font-size: 18px;
      outline: none;
      cursor: pointer;
      opacity: 0;
      transition: 0.5s;
      z-index: 1;
    }
  }


  @media (max-width: $MQMobile) {
    .inputBox {
      height 60px

      input {

        font-size 30px
        padding: 0 75px 0 15px;

        &:focus {
          opacity 1
        }

        &:focus ~ span {
          transform: translateY(-60px);
          color $accentColor
          font-size 20px
          opacity: 0.8;
        }

        &:focus ~ button {
          opacity: 1;
          width: 60px;
        }
      }

      span {
        line-height: 60px;
        font-size 20px
      }

      button {

        height: 58px;
        font-size: 18px;

      }
    }

  }

}
</style>
