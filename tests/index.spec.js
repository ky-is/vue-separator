import { mount, createLocalVue } from '@vue/test-utils'

import VueSeparator from '@/index.vue'

const { describe, expect, it } = global //TODO https://github.com/facebook/jest/issues/4473

const localVue = createLocalVue()
const vSeparatorName = VueSeparator.name
localVue.component(vSeparatorName, VueSeparator)

function expectSeparator ({ tag, separator, slot, content, attributes }) {
	const slots = (slot || '') + (Array.isArray(content) ? content.join('') : (content || ''))
	const attrsString = attributes ? attributes.join(' ') : ''
	const component = {
		template: `<div><${vSeparatorName} tag="${tag || ''}" separator="${separator || ''}" ${attrsString}>${slots}</${vSeparatorName}></div>`,
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
			expectSeparator({}).toEqual(RESULT_EMPTY)
			expectSeparator({ slot: SEPARATOR_TEMPLATE_SLOT }).toEqual(RESULT_EMPTY)
			expectSeparator({ tag: 'div', slot: SEPARATOR_TEMPLATE_SLOT }).toEqual(`<div></div>`)
		})
	})

	describe('no separator', () => {
		it('only renders children', () => {
			const content = '<span></span><div class="a"></div>'
			expectSeparator({ content }).toEqual(content)
			expectSeparator({ tag: 'nav', content }).toEqual(`<nav>${content}</nav>`)
		})
	})

	describe('tag prop', () => {
		const tag = 'div'
		it('renders an empty container element provided no content', () => {
			const result = '<div></div>'
			expectSeparator({ tag }).toEqual(result)
			expectSeparator({ tag, slot: SEPARATOR_TEMPLATE_SLOT }).toEqual(result)
		})

		describe('data properties', () => {
			const attributes = [ 'class="container"', 'data-id="1"', 'id="2"' ]
			it('renders on container', () => {
				const expectHtml = expectSeparator({ tag, attributes })
				for (const prop of attributes) {
					expectHtml.toMatch(` ${prop}`)
				}
			})
			it('renders no properties without tag', () => {
				const expectHtml = expectSeparator({ attributes })
				for (const prop of attributes) {
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
			const content = '<span />'
			const attributes = [ 'v-if="false"' ]
			expectSeparator({ tag, slot: SEPARATOR_TEMPLATE_SLOT, content, attributes }).toEqual(RESULT_EMPTY)
		})
	})

	describe('separator prop', () => {
		const content = [ '<span>1</span>', '<span>2</span>' ]
		const separator = SEPARATOR
		it('separates children with text', () => {
			expectSeparator({ separator, content }).toEqual(content.join(separator))
		})
		it('is overridden by separator slot', () => {
			expectSeparator({ slot: SEPARATOR_SPAN_SLOT, separator, content }).toEqual(content.join(SEPARATOR_SPAN))
		})
	})

	it('renders single children without separators', () => {
		const content = '<span>1</span>'
		expectSeparator({ content }).toEqual(content)
		expectSeparator({ tag: 'div', slot: SEPARATOR_TEMPLATE_SLOT, content }).toEqual(`<div>${content}</div>`)
	})

	it('intersperses separators between items', () => {
		const content = [ '<span>1</span>', '<span>2</span>' ]
		expectSeparator({ slot: SEPARATOR_TEMPLATE_SLOT, content }).toEqual(content.join(SEPARATOR))
		expectSeparator({ tag: 'div', slot: SEPARATOR_SPAN_SLOT, content }).toEqual(`<div>${content.join(SEPARATOR_SPAN)}</div>`)
	})

	it('renders v-for with separators', () => {
		const content = '<span v-for="item in [1, 2, 3]" :key="item">{{ item }}</span>'
		const result = '<span>1</span><span>, </span><span>2</span><span>, </span><span>3</span>'
		expectSeparator({ slot: SEPARATOR_SPAN_SLOT, content }).toEqual(result)
		expectSeparator({ tag: 'li', slot: SEPARATOR_SPAN_SLOT, content }).toEqual(`<li>${result}</li>`)
	})
})
