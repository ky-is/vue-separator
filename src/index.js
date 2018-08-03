export default {
	name: 'v-separate',

	functional: true,

	props: {
		tag: null,
	},

	render (createElement, context) {
		let children = null
		const slots = context.slots()
		const slotChildren = slots.default
		if (slotChildren) {
			const separator = slots.separator
			if (!separator) {
				children = slotChildren
			} else {
				children = []
				const lastIndex = slotChildren.length - 1
				for (let index = 0; index <= lastIndex; index += 1) {
					children.push(slotChildren[index])
					if (index < lastIndex) {
						children.push(separator)
					}
				}
			}
		}
		const tag = context.props.tag
		return tag ? createElement(tag, context.data, children) : children
	},
}
