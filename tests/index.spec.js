import { mount, createLocalVue } from '@vue/test-utils'

import VueSeparator from '@/index.js'

const localVue = createLocalVue()
localVue.component(VueSeparator.name, VueSeparator)

function expectSeparator (separatorSlot, defaultSlot) {
	const slots = (separatorSlot || '') + (Array.isArray(defaultSlot) ? defaultSlot.join('') : (defaultSlot || ''))
	const component = {
		template: `<div><v-separate>${slots}</v-separate></div>`
	}
	const wrapper = mount(component, { localVue })
	return expect(wrapper.html().slice(5, -6))
}

const SEPARATOR = ', '
const SEPARATOR_TEMPLATE_SLOT = `<template slot="separator">${SEPARATOR}</template>`
const SEPARATOR_SPAN = `<span>${SEPARATOR}</span>`
const SEPARATOR_SPAN_SLOT = `<span slot="separator">${SEPARATOR}</span>`

// Test

describe('index.js', () => {
	it('renders nothing with no default slot children', () => {
		const emptyResult = '<!---->'
		expectSeparator().toEqual(emptyResult)
		expectSeparator(SEPARATOR_TEMPLATE_SLOT, null).toEqual(emptyResult)
	})

	it('renders single children without separators', () => {
		const content = '<span>1</span>'
		expectSeparator(null, content).toEqual(content)
		expectSeparator(SEPARATOR_TEMPLATE_SLOT, content).toEqual(content)
	})

	it('intersperses separators between items', () => {
		const items = [ '<span>1</span>', '<span>2</span>' ]
		expectSeparator(SEPARATOR_TEMPLATE_SLOT, items).toEqual(items.join(SEPARATOR))
		expectSeparator(SEPARATOR_SPAN_SLOT, items).toEqual(items.join(SEPARATOR_SPAN))
	})

	it('renders v-for with separators', () => {
		const items = '<span v-for="item in [1, 2, 3]" :key="item">{{ item }}</span>'
		const result = '<span>1</span><span>, </span><span>2</span><span>, </span><span>3</span>'
		expectSeparator(SEPARATOR_SPAN_SLOT, items).toEqual(result)
	})
})
