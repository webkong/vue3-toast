# vue3-toast-single

![Vue 3.x](https://img.shields.io/badge/vue-3.x-green.svg "Vue 3 Compatible")

A toast plugin for vue3. Support composition API.

[DEMO](https://wekbong.github.io/vue3-toast-single/example/index.html)

**Note:**

Issue/PR is welcomed, I'll response as soon as possible.

## Usage

### install
`npm install vue3-toast-single --save`

### Quickstart
```javascript
// import 
import Toast from 'vue3-toast-single'
import 'vue3-toast-single/dist/toast.css'

const app = createApp(App);

app.use(Toast, { verticalPosition: "bottom", duration: 1500 });
app.mount("#app");

// Usage

{
  // ....
 methods: {
    clickHandler() {
      this.$wkToast('A toast.');
    },
  },
  // ...
}

{
  // ...
  setup() {
        const toast = Vue.inject("WKToast");
        const clickHandler = () => {
          toast("A toast.");
        };
        return {
          clickHandler,
        };
      },
  // ...
}
```

### More

`toast` or `$wkToast` takes 2 parameter: `(message, [options])`

#### Options

Parameter | Type |Default| Description
--------- | ---- | ------|-----------
className | `string`, `array` | | Self-defined class names to pass through. There are 3 pre-defined classes: `wk-info`, `wk-warn`,`wk-alert`, to toast with different background color
horizontalPosition | `string` | `right` | Position horizontal of toast. There are 3 pre-defined positions: `left`, `right` and `center`
verticalPosition | `string` | `top` | Position vertical of toast. There are 2 pre-defined positions: `top` and `bottom`
duration | `number` | 5000 | The duration one toast will last, in milliseconds
closeable | `boolean` | `false` | `true` or `false`. If `true`, the toast can be closed manually
transition | `string` | `fade` | Built-in transitions: `fade`, `slide-[up/down/left/right]`. See also [Transitions](http://v1.vuejs.org/guide/transitions.html)

#### Styling

Besides minimum styling, *vue3-toast-single* try not to be opinionated about the appearance. It is a simply a `div`(class="wk-wrapper") wrapped a `span`(class="wk-content"). Apply your css freely with them or with your own classes passed in as `className`.  

#### config example
```javascript
// global
app.use(Toast, { verticalPosition: "bottom", duration: 1500 });

// local
this.$wkToast('A toast', {
  className: ['my-toast', 'toast-warning'],
  horizontalPosition: 'right',
  verticalPosition: 'top',
  duration: 3000,
  transition: 'transition'
})
```

#### TODO
- [ ] Add a queue mode
- [ ] emoji

## License
MIT
