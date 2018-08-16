<script>
export default {
	name: 'VSeparate',

	functional: true,

	props: {
		tag: null,
		separator: null,
	},

	render (createElement, context) {
		let children = null
		const slots = context.slots()
		const props = context.props
		const slotChildren = slots.default
		if (slotChildren) {
			const separator = slots.separator || props.separator
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
		return props.tag ? createElement(props.tag, context.data, children) : children
	},
}
</script>
