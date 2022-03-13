<template>
  <div class="typer-wraper">

    <h1 class="hero-title" id="output"></h1>

    <p id="from" class="sm-hero-title"></p>

  </div>

</template>

<script>

import EasyTyper from 'easy-typer-js'
import axios from 'axios'

export default {
  name: "Typer",
  data() {
    return {
      obj: {
        output: '',
        isEnd: false,
        speed: 120,
        singleBack: false,
        sleep: 6000,
        type: 'rollback',
        backSpeed: 100,
        sentencePause: false,
      },
      typed: null
    }
  },
  beforeDestroy() {
    this.typed.close()
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.fetchData()
    },
    fetchData() {
      // 一言Api进行打字机循环输出效果
      const params = new URLSearchParams();
      params.append('c', 'i')
      params.append('c', 'j')
      axios.get('https://v1.hitokoto.cn', {
        params: params
      })
          .then(({data}) => {
            this.initTyped(data.hitokoto, this.fetchData)
            if (data.from != null) {
              document.getElementById('from').innerText = `『 ${data.from} 』`
            }
          })
          .catch(console.error)
    },
    initTyped(input, fn) {
      const obj = this.obj
      this.typed = new EasyTyper(obj, input, fn, (input, fn) => {
        document.getElementById('output').innerHTML = `${input}<span class="typed-cursor">|</span>`
      })
    }
  }
}
</script>

<style lang="stylus">
.hero-title
  display: block;
  margin: 0 auto 1rem
  font-size: 2rem;

.sm-hero-title
  margin: 0 auto;
  font-size: 1.5rem;

.typed-cursor
  margin-left: 10px
  opacity: 1
  -webkit-animation: blink 0.7s infinite
  -moz-animation: blink 0.7s infinite
  animation: blink 0.7s infinite

@keyframes blink
  0%
    opacity: 1
  50%
    opacity: 0
  100%
    opacity: 1

@-webkit-keyframes blink
  0%
    opacity: 1
  50%
    opacity: 0
  100%
    opacity: 1

@-moz-keyframes blink
  0%
    opacity: 1
  50%
    opacity: 0
  100%
    opacity: 1

</style>