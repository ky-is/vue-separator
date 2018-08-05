# vue-separator

A renderless functional component that adds a separator between any sequence of elements. Ideal for joining v-for elements without resorting to javascript and v-html to create a breadcrumb style UI. It's renderless which means it doesn't add any extra components to your app's hierarchy. It's designed for my personal projects, but you may find it useful.

## Install

Note: This module is not currently available pre-built to ES5. As such, your project will need a build step to use it. Or just copy in `src/index.js` directly.

```bash
npm install --save-dev @ky-is/vue-separator
```

In main.js (alternatively, manually register it in each file you use it):
```js
import VueSeparator from '@ky-is/vue-separator'

Vue.component('v-separate', VueSeparator)
```

## Use cases

Say you want to render a list of items, with a comma between each item, without trailing at the end:
```html
<span v-for="(item, index) in items" :key="item">
  {{ item }}<span v-if="index < items.length - 1">, </span>
</span>
```

That becomes:
```html
<v-separate>
  <span v-for="item in items" :key="item">{{ item }}</span>
  <span slot="separator">, </span>
</v-separate>
```

Or with any arbitrary list of elements, and a div container:
```html
<v-separate tag="div" class="my-container">
  <span>A</span><span>B</span><span>C</span>
  <template slot="separator">, </template>
</v-separate>
```
Use a `<template>` tag for the separator slot if you dont care about whitespace/styling.

 ## Props

- `tag` (String, optional): Renders a container element of this tag around the children.
