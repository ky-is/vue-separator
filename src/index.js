export default {
	name: 'v-separate',

	functional: true,

	render (createElement, context) {
		const slots = context.slots()
		const elements = slots.default
		if (!elements) {
			return null
		}
		const separator = slots.separator
		if (!separator) {
			return elements
		}
		const children = []
		const lastIndex = elements.length - 1
		for (let index = 0; index <= lastIndex; index += 1) {
			children.push(elements[index])
			if (index < lastIndex) {
				children.push(separator)
			}
		}
		return children
	},
}
