<template>
  <div id="loader-wrapper">
    <div class="loader-main">
      <div class="loader">
        <div class="loader-inner">
          <hr>
          <hr>
          <hr>
          <hr>
          <hr>
        </div>
        <div class="loader-inner box box-1">
          <hr>
          <hr>
          <hr>
          <hr>
          <hr>
        </div>
        <div class="loader-inner box box-2">
          <hr>
          <hr>
          <hr>
          <hr>
          <hr>
        </div>
        <div class="loader-inner box box-3">
          <hr>
          <hr>
          <hr>
          <hr>
          <hr>
        </div>
        <div class="loader-inner box box-4">
          <hr>
          <hr>
          <hr>
          <hr>
          <hr>
        </div>
        <div class="loader-inner box box-5">
          <hr>
          <hr>
          <hr>
          <hr>
          <hr>
        </div>
        <div class="loader-inner box box-6">
          <hr>
          <hr>
          <hr>
          <hr>
          <hr>
        </div>
        <div class="loader-inner">
          <hr>
          <hr>
          <hr>
          <hr>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
#loader-wrapper
  height: 200vh;
  width: 100vw;
  background #fff
  background var(--background-color)

.loader-main
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 555;
  margin-top: -30px;
  margin-left: -45px;

  .loader {
    width: 90px;
    height: 60px;
    position: relative;
    perspective: 100px;
    perspective-origin: 50% 100%;
    transform-style: preserve-3d;
    transform: translateZ(-1px);
  }

  .loader .loader-inner {
    width: 50%;
    height: 100%;
    background: #fff;
    border: 3px solid $accentColor;
    position: absolute;
    right: 0;
    transform-origin: 0% 100%;
  }

  .loader .loader-inner:first-child {
    left: 0;
  }

  .loader .loader-inner hr {
    margin: 8px 3px 6px;
    border: 1px solid $accentColor;
  }

  .loader .loader-inner.box {
    -webkit-animation: loading-1 3.6s infinite ease-in-out;
    animation: loading-1 3.6s infinite ease-in-out;
  }

  .loader .loader-inner.box-1 {
    animation-delay: .2s;
  }

  .loader .loader-inner.box-2 {
    animation-delay: .4s;
  }

  .loader .loader-inner.box-3 {
    animation-delay: 0.6s;
  }

  .loader .loader-inner.box-4 {
    animation-delay: 0.8s;
  }

  .loader .loader-inner.box-5 {
    animation-delay: 1.8s;
  }

  .loader .loader-inner.box-6 {
    animation-delay: 2.2s;
  }

  @-webkit-keyframes loading-1 {
    25%, 100% {
      transform: translateX(3px) rotateY(-180deg);
    }
  }
  @keyframes loading-1 {
    25%, 100% {
      transform: translateX(3px) rotateY(-180deg);
    }
  }


</style>
