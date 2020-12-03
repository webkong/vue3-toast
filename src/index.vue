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
  watch,
  ref,
  computed,
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
    const options = props;
    let refNode = null;
    const state = reactive({
      option: {},
      showing: false,
      timer: null,
    });
    const classes = computed(() => {
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
    });
    console.log(classes);
    let closed = ref(false);

    onMounted(() => {
      startTimer();
      state.showing = true;
    });
    onUnmounted(() => {
      clearTimeout(state.timer);
    });

    const startTimer = () => {
      console.log("start timer");
      if (options.duration > 0) {
        state.timer = setTimeout(() => {
          console.log("start timer2");
          console.log(closed);
          if (!closed.value) {
            close();
          }
        }, options.duration);
      }
    };
    const close = () => {
      closed.value = true;
      state.timer = null;
    };
    const removeHandler = () => {
      state.showing = false;
      document.body.removeChild(document.getElementById(props.id));
      refNode.removeEventListener("transitionend", removeHandler, false);
    };
    const setRefNode = (el) => {
      refNode = el;
    };
    watch(closed, (newVal) => {
      console.log("closed:", newVal);
      if (newVal) {
        state.showing = false;
        refNode.addEventListener("transitionend", removeHandler, false);
      }
    });

    return {
      setRefNode,
      close,
      closed,
      classes,
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
/* animation */

.slide-down-enter-active {
  transition: all 0.3s ease-out;
}
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  bottom: -10% !important;
}

.slide-up-enter-active {
  transition: all 0.3s ease-out;
}
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  top: -10% !important;
}

.slide-left-enter-active {
  transition: all 0.3s ease-out;
}
.slide-left-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  left: -10% !important;
}

.slide-right-enter-active {
  transition: all 0.3s ease-out;
}
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
  right: -10px !important;
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
