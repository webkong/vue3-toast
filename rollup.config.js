const path = require("path");
const { babel } = require("@rollup/plugin-babel");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const vue = require("rollup-plugin-vue");
const css = require("rollup-plugin-css-only");
const { terser } = require("rollup-plugin-terser");
const image = require("@rollup/plugin-image");
const clear = require("rollup-plugin-clear");

const resolveFile = function (filePath) {
  return path.join(__dirname, ".", filePath);
};
const babelOptions = {
  babelHelpers: "bundled",
  presets: ["@babel/preset-env"],
};
const plugins = [
  clear({
    targets: ["dist"],
  }),
  vue({ css: false }),
  css({ output: "toast.css" }),
  image(),
  nodeResolve(),
  commonjs(),
  babel(babelOptions),
  terser(),
];
module.exports = [
  {
    input: resolveFile("index.js"),
    output: {
      file: resolveFile("dist/index.umd.js"),
      format: "umd",
      name: "WKToast",
      globals: {
        vue: "Vue",
      },
    },
    plugins: plugins,
    external: ["vue"],
  },
  {
    input: resolveFile("index.js"),
    output: {
      file: resolveFile("dist/index.esm.js"),
      format: "esm",
      name: "WKToast",
      globals: {
        vue: "Vue",
      },
    },
    plugins: plugins,
    external: ["vue"],
  },
];
