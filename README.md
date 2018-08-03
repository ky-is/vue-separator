# vue-separator

A renderless functional component that adds a separator between any sequence of elements. Ideal for joining v-for elements without resorting to javascript and v-html to create a breadcrumb style UI. It's renderless which means it doesn't add any extra components to your app's hierarchy. It's designed for my personal projects, but you may find it useful.

## Use cases

Say you want to render a list of items, with a comma between each item, but without trailing at the end:
```html
<span v-for="(item, index) in items" :key="item">
  {{ item }}<span v-if="index < items.length - 1">, </span>
</span>
```
This becomes:
```html
<v-separate>
  <span v-for="item in items" :key="item">{{ item }}</span>
  <span slot="separator">, </span>
</v-separate>
```
Or with any arbitrary list of elements:
```html
<v-separate>
  <span>A</span><span>B</span><span>C</span>
  <span slot="separator">, </span>
</v-separate>
```

## Install

Note: This module is not currently available pre-built. As such, your project will need a build step to use it. Or just copy the code directly into your project.

```bash
npm install --save-dev @ky-is/vue-separator
```

## Usage

In main.js (alternatively, manually register it in each file you use it):
```js
import VueSeparator from '@ky-is/vue-separator'

Vue.component('v-separate', VueSeparator)
```

```html
<template>
	<v-separate>
		<span v-for="item in [ 1, 2, 3 ]" :key="item">{{ item }}</span>
		<span slot="separator">, </span>
		OR
		<template slot="separator">・</template>
	</v-separate>
</template>
```

Use a `<template>` tag for the separator slot if you dont care about whitespace/styling.
