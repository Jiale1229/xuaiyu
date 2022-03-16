/* eslint-disable no-proto */
import postMixin from '@theme/mixins/posts'
import localMixin from '@theme/mixins/locales'
import {interceptRouterError, fixRouterError404} from '@theme/helpers/other'
import {install} from 'vue-demi'
import VueLazyLoad from 'vue-lazyload'


export default ({Vue, router}) => {
    install(Vue)
    Vue.mixin(postMixin)
    Vue.mixin(localMixin)
    interceptRouterError(router)
    fixRouterError404(router)
    Vue.use(VueLazyLoad, {
        error: 'https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/icon/loading-people-unscreen.gif',
        loading: 'https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/icon/loading-ball-unscreen.gif'
    })
}
