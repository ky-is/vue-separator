<script>
export default {
	name: 'VSeparate',

	functional: true,

	props: {
		tag: {
			type: String,
			default: undefined,
		},
		separator: {
			type: String,
			default: undefined,
		},
	},

	render (createElement, context) {
		var children = null
		var slots = context.slots()
		var props = context.props
		var slotChildren = slots.default
		if (slotChildren) {
			var separator = slots.separator || props.separator
			if (!separator) {
				children = slotChildren
			} else {
				children = []
				var slotChildrenCount = slotChildren.length
				var index = 0, hasChildToSeparate = false
				while (index < slotChildrenCount) {
					var child = slotChildren[index]
					do {
						children.push(child)
						index += 1
						if (index === slotChildrenCount) {
							break
						}
						if (!hasChildToSeparate && (child.children || child.text)) {
							hasChildToSeparate = true
						}
						child = slotChildren[index]
					} while (!child.children && !child.text)
					if (hasChildToSeparate && index < slotChildrenCount) {
						children.push(separator)
					}
				}
			}
		}
		return props.tag ? createElement(props.tag, context.data, children) : children
	},
}
</script>
