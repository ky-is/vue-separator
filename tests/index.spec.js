import { mount, createLocalVue } from '@vue/test-utils'

import VueSeparator from '@/index.vue'

const localVue = createLocalVue()
const vSeparatorName = VueSeparator.name
localVue.component(vSeparatorName, VueSeparator)

function expectSeparator (tag, separatorSlot, defaultSlot, dataArray) {
	const slots = (separatorSlot || '') + (Array.isArray(defaultSlot) ? defaultSlot.join('') : (defaultSlot || ''))
	const dataString = dataArray ? dataArray.join(' ') : ''
	const component = {
		template: `<div><${vSeparatorName} tag="${tag || ''}" ${dataString}>${slots}</${vSeparatorName}></div>`
	}
	const wrapper = mount(component, { localVue })
	return expect(wrapper.html().slice(5, -6))
}

const SEPARATOR = ', '
const SEPARATOR_TEMPLATE_SLOT = `<template slot="separator">${SEPARATOR}</template>`
const SEPARATOR_SPAN = `<span>${SEPARATOR}</span>`
const SEPARATOR_SPAN_SLOT = `<span slot="separator">${SEPARATOR}</span>`
const RESULT_EMPTY = '<!---->'

// Test

describe('index.vue', () => {
	describe('no children', () => {
		it('renders nothing', () => {
			expectSeparator().toEqual(RESULT_EMPTY)
			expectSeparator(null, SEPARATOR_TEMPLATE_SLOT, null).toEqual(RESULT_EMPTY)
			expectSeparator('div', SEPARATOR_TEMPLATE_SLOT, null).toEqual(`<div></div>`)
		})
	})

	describe('no separator', () => {
		it('only renders children', () => {
			const content = '<span></span><div class="a"></div>'
			expectSeparator(null, null, content).toEqual(content)
			expectSeparator('nav', null, content).toEqual(`<nav>${content}</nav>`)
		})
	})

	describe('tag prop', () => {
		const tag = 'div'
		it('renders an empty container element provided no content', () => {
			const result = '<div></div>'
			expectSeparator(tag).toEqual(result)
			expectSeparator(tag, SEPARATOR_TEMPLATE_SLOT, null).toEqual(result)
		})

		describe('data properties', () => {
			const properties = [ 'class="container"', 'data-id="1"', 'id="2"' ]
			it('renders on container', () => {
				const expectHtml = expectSeparator(tag, null, null, properties)
				for (const prop of properties) {
					expectHtml.toMatch(` ${prop}`)
				}
			})
			it('renders no properties without tag', () => {
				const expectHtml = expectSeparator(null, null, null, properties)
				for (const prop of properties) {
					expectHtml.not.toMatch(` ${prop}`)
				}
			})
		})

		it('consumes vue properties', () => {
			const consumedProperties = [ 'v-if="true"' ]
			const expectHtml = expectSeparator(tag, null, null, consumedProperties)
			for (const prop of consumedProperties) {
				expectHtml.not.toMatch(` ${prop}`)
			}
			expectSeparator(tag, SEPARATOR_TEMPLATE_SLOT, '<span />', [ 'v-if="false"' ]).toEqual(RESULT_EMPTY)
		})
	})

	it('renders single children without separators', () => {
		const content = '<span>1</span>'
		expectSeparator(null, content).toEqual(content)
		expectSeparator('div', SEPARATOR_TEMPLATE_SLOT, content).toEqual(`<div>${content}</div>`)
	})

	it('intersperses separators between items', () => {
		const items = [ '<span>1</span>', '<span>2</span>' ]
		expectSeparator(null, SEPARATOR_TEMPLATE_SLOT, items).toEqual(items.join(SEPARATOR))
		expectSeparator('div', SEPARATOR_SPAN_SLOT, items).toEqual(`<div>${items.join(SEPARATOR_SPAN)}</div>`)
	})

	it('renders v-for with separators', () => {
		const items = '<span v-for="item in [1, 2, 3]" :key="item">{{ item }}</span>'
		const result = '<span>1</span><span>, </span><span>2</span><span>, </span><span>3</span>'
		expectSeparator(null, SEPARATOR_SPAN_SLOT, items).toEqual(result)
		expectSeparator('li', SEPARATOR_SPAN_SLOT, items).toEqual(`<li>${result}</li>`)
	})
})
