import { render, createVNode } from "vue";
import ToastConstructor from "./index.vue";

let globalConfig = {
  className: "",
  horizontalPosition: "center",
  verticalPosition: "bottom",
  transition: "slide-down",
  duration: 3000,
  message: "",
  closeable: false,
};
let seed = 1;
class Toast {
  constructor(options) {
    globalConfig = Object.assign({}, globalConfig, options);
  }
  show(text, config = {}) {
    let [toastWrapper, toastVM] = [null, null];
    const id = "wk-toast_" + seed++;
    toastWrapper = document.createElement("div");
    toastWrapper.id = id;
    toastVM = createVNode(
      ToastConstructor,
      { ...globalConfig, ...config, message: text, id },
      null
    );
    render(toastVM, toastWrapper);
    document.body.appendChild(toastWrapper);
  }
}

//TODO queue

export default Toast;
