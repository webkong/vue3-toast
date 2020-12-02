import Toast from "./src/toast";

Toast.install = (app, options) => {
  let toast = new Toast(options).show;
  app.config.globalProperties.$wkToast = toast;
  app.provide("WKToast", toast);
  app.component("WKToast", Toast);
};

export default Toast;
