# vue-separator

A renderless functional component that adds a separator between any sequence of elements. Ideal for joining v-for elements without resorting to javascript and v-html to create a breadcrumb style UI. It's renderless which means it doesn't add any extra components to your app's hierarchy. It's designed for my personal projects, but you may find it useful.

## Install

Note: This module is not currently available pre-built to ES5. As such, your project will need a build step to use it. Or just copy in `src/index.vue` directly.

```bash
npm install --save-dev @ky-is/vue-separator
```

In main.js (alternatively, manually register it in each file you use it):
```js
import VueSeparator from '@ky-is/vue-separator'

Vue.component(VueSeparator.name, VueSeparator)
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
<v-separate separator=", ">
  <span v-for="item in items" :key="item">{{ item }}</span>
</v-separate>
```

Or, with any arbitrary list of elements, and a slot-based HTML template for the separator:
```html
<v-separate tag="div" class="my-container">
  <span>A</span><span>B</span><span>C</span>
  <span slot="separator">, </span>
</v-separate>
```

### Props

- `tag` (String, optional): Renders a container element of this tag around the children.
- `separator` (String, optional): A plaintext string to be rendered between each child. This is overridden by `slot="separator"` if provided.

### `separator` slot

Only use the separator slot if you need the separator to render HTML. Because `slot="separator"` is duplicated between each element, it loses its reactivity and won't automatically update. Thus, to change its contents, you'll need to remove and replace the v-separator container.

### Jest

Because vue-separator is bundled as a single file component, it needs to be transformed with `vue-jest` in your test environment. By default, all packages in `node_modules` are skipped, so to allow it to work in your tests, add the following to your `jest.config.js`:

```js
  transformIgnorePatterns: [
    'node_modules/(?!@ky-is/vue-separator)',
  ],
```
