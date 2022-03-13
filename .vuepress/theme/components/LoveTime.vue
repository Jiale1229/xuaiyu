<template>
  <div class="love-box">
    <h4>
      ❤️
      我们
    </h4>
    <div class="love-img">
     <span>
         <img v-lazy="'https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/icon/pic0.jpg'" alt="love">
     </span>

      <span> <img v-lazy="'https://txcdn.kenvie.com/blog/toutu/z.gif'" alt="love"></span>
      <span>  <img v-lazy="'https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/icon/pic1.jpg'"
                   alt="love"></span>
    </div>
    <router-link id="love-time" to="/photos/"></router-link>
  </div>
</template>

<script>
export default {
  name: "LoveTime",
  data() {
    return {
      timer: null  // 定时器名称
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.showSiteRuntime()
    }, 1000)
  },
  methods: {
    showSiteRuntime() {
      const startDay = new Date("2020-08-15");
      const nowDate = new Date();
      const T = (nowDate.getTime() - startDay.getTime());
      const i = 24 * 60 * 60 * 1000; /*一天的毫秒数*/
      const d = T / i;
      const D = Math.floor(d);
      const h = (d - D) * 24;
      const H = Math.floor(h);
      const m = (h - H) * 60;
      const M = Math.floor(m);
      const s = (m - M) * 60
      const S = Math.floor(s);
      document.getElementById('love-time').innerText = `风雨同舟第${D}天${H}小时${M}分${S}秒`
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }

}
</script>

<style scoped lang="stylus">
.love-img
  text-align center
  margin 1rem 0

  span
    width 4rem
    height 4rem
    overflow hidden
    display inline-block
    border-radius 50%

    img
      width 100%
      height 100%
      object-fit cover

#love-time
  display block
  text-align center
  background: linear-gradient(to right, #FF2814, #0290E5);
  -webkit-background-clip: text;
  color: transparent;
</style>