<template>
  <Common :sidebar="false">

    <div class="picture-main">
      <div :key="index" v-for="(item,index) in PhotosList" class="picture-box">
        <CoolLightBox
            :items="item.PhotoArray"
            :index="item.index"
            :useZoomBar="true"
            @close="item.index = null">
        </CoolLightBox>
        <div class="images-wrapper">
          <div class="image"
               v-for="(image, imageIndex) in item.PhotoArray"
               :key="imageIndex"
               @click="item.index = imageIndex"
               v-lazy:background-image="image.src"></div>
          <h4 class="images-theme">
            {{ item.theme }}
          </h4>
        </div>
      </div>
    </div>

  </Common>
</template>

<script>
import {defineComponent, onBeforeMount, ref} from 'vue-demi'
import Common from '@theme/components/Common'
import CoolLightBox from 'vue-cool-lightbox' //https://www.vue-coollightbox.cn/
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import axios from 'axios'
import {useInstance} from '@theme/helpers/composable'


export default defineComponent({
  name: 'Photos',
  components: {Common, CoolLightBox},
  setup() {
    const instance = useInstance()
    let PhotosList = ref([])
    onBeforeMount(async () => {
      const res = await axios.get(instance.$withBase('/mock/photosData.json'))
      PhotosList.value = res.data
    })
    return {PhotosList}
  },

})
</script>

<style src="../styles/theme.styl" lang="stylus"></style>

<style lang="stylus" scoped>

.picture-main
  display flex
  flex-wrap wrap

  .picture-box
    height: calc(40vh - 2rem);
    min-height: 16rem;
    width: 33.33333%;
    position relative

    .images-wrapper
      width 100%
      height 100%

      .images-theme
        position: absolute;
        bottom: 1rem;
        left: 2rem;
        color: #ffffff;
        font-weight bold
        margin 0
        font-size 1.2rem
        text-shadow 0 0.1875rem 0.3125rem #1c1f21;


    .image
      width 100%
      height 100%
      background-size cover
      background-position 50%
      cursor pointer

      &:not(:first-child)
        display none

@media (max-width: $homePageWidth)
  .picture-main
    .picture-box
      height: calc(35vh - 2rem);
      width: 50%;


</style>


