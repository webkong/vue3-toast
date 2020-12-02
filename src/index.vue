<template>
  <transition :name="options.transition">
    <div class="wk-wrapper" :class="classes" v-show="showing" :ref="setRefNode">
      <span class="wk-content" v-html="options.message"></span>
      <a class="wk-close" v-if="options.closeable" v-on:click="close()">
        <img src="./assets/close.png" width="100%" />
      </a>
    </div>
  </transition>
</template>

<script>
import {
  reactive,
  toRefs,
  toRaw,
  onMounted,
  onUnmounted,
  defineComponent,
} from "vue";
export default defineComponent({
  name: "wk-toast",
  props: {
    id: String,
    className: String,
    horizontalPosition: String,
    verticalPosition: String,
    transition: String,
    duration: Number,
    message: String,
    closeable: Boolean,
  },
  setup(props) {
    let refNode = null;
    let timeoutId = null;
    const state = reactive({
      option: {},
      showing: false,
      classes: [],
    });
    onMounted(() => {
      state.classes = setClass();
      setTimeout(() => {
        state.showing = true;
      }, 100);
      timeoutId = setTimeout(() => {
        state.showing = false;
      }, options.duration);
      if (refNode) {
        refNode.addEventListener("transitionend", removeHandler, false);
      }
    });
    onUnmounted(() => {
      clearTimeout(timeoutId);
    });
    const options = props;
    const removeHandler = () => {
      document.body.removeChild(document.getElementById(props.id));
      refNode.removeEventListener("transitionend", removeHandler, false);
    };
    const setClass = () => {
      let clazz = [];
      let className = options.className;
      let horizontalPosition = options.horizontalPosition;
      let verticalPosition = options.verticalPosition;
      let closeable = options.closeable;

      if (className) {
        if (typeof className === "string") {
          clazz.push(className);
        }
        if (Array.isArray(className)) {
          clazz = clazz.concat(className);
        }
      }
      if (horizontalPosition) {
        clazz.push(`wk-${horizontalPosition}`);
      }
      if (closeable) {
        clazz.push("wk-closeable");
      }
      if (verticalPosition) {
        clazz.push(`wk-${verticalPosition}`);
      }
      return clazz.join(" ");
    };

    const close = () => {
      state.showing = false;
    };
    const setRefNode = (el) => {
      refNode = el;
    };

    return {
      setRefNode,
      close,
      options,
      ...toRefs(state),
    };
  },
});
</script>
<style>
.wk-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #4dd696;
  border-radius: 5px;
  padding: 10px 30px;
  width: 200px;
  max-width: 300px;
  min-width: 160px;
  color: white;
  z-index: 9999;
  margin: auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wk-wrapper {
  position: fixed;
  top: 80%;
}
.wk-content {
  display: block;
  text-align: center;
  flex: 1;
}
.wk-wrapper .wk-close {
  margin-right: 5px;
  color: white;
  width: 16px;
  height: 16px;
}
.wk-close img {
  width: 16px;
  height: 16px;
  margin-left: 5px;
}
.wk-wrapper.wk-left {
  right: auto;
  left: 40px;
}
.wk-wrapper.wk-right {
  left: auto;
  right: 40px;
}
.wk-wrapper.wk-center {
  left: 50%;
  transform: translateX(-50%);
}
.wk-wrapper.wk-top {
  top: 40px;
  bottom: auto;
}
.wk-wrapper.wk-bottom {
  top: auto;
  bottom: 40px;
}
.wk-wrapper.wk-alert {
  background-color: rgba(189, 19, 19, 0.7);
}
.wk-wrapper.wk-warn {
  background-color: rgba(250, 180, 90, 0.9);
}
.wk-wrapper.wk-info {
  background-color: rgba(32, 83, 201, 0.7);
}
.fade-enter-active,
.fade-leave-active,
.fade-transition {
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave,
.fade-leave-active {
  opacity: 0;
}
.slide-down-enter-active,
.slide-down-leave-active,
.slide-down-transition {
  -webkit-transition: opacity 0.3s ease, bottom 0.3s ease-in;
  transition: opacity 0.3s ease, bottom 0.3s ease-in;
}
.slide-down-leave-active,
.slide-down-enter,
.slide-down-leave {
  opacity: 0;
  bottom: -10% !important;
}
.slide-up-enter-active,
.slide-up-leave-active,
.slide-up-transition {
  -webkit-transition: opacity 0.3s ease, top 0.3s ease-in;
  transition: opacity 0.3s ease, top 0.3s ease-in;
}
.slide-up-leave-active,
.slide-up-enter,
.slide-up-leave {
  opacity: 0;
  top: -10% !important;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-left-transition {
  -webkit-transition: opacity 0.3s ease, left 0.3s ease-in;
  transition: opacity 0.3s ease, left 0.3s ease-in;
}
.slide-left-leave-active,
.slide-left-enter,
.slide-left-leave {
  opacity: 0;
  left: -10% !important;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-right-transition {
  -webkit-transition: opacity 0.3s ease, right 0.3s ease;
  transition: opacity 0.3s ease, right 0.3s ease;
}
.slide-right-leave-active,
.slide-right-enter,
.slide-right-leave {
  opacity: 0;
  right: -10px !important;
}
</style>
