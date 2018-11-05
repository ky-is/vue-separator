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
				var lastIndex = slotChildren.length - 1
				var index = 0, hasChildToSeparate = false
				while (index <= lastIndex) {
					var child, nextChild
					do {
						child = slotChildren[index]
						children.push(child)
						index += 1
						if (index > lastIndex) {
							break
						}
						if (!hasChildToSeparate && (child.children || child.text)) {
							hasChildToSeparate = true
						}
						nextChild = slotChildren[index]
					} while (!nextChild.children && !nextChild.text)
					if (hasChildToSeparate && index < lastIndex) {
						children.push(separator)
					}
				}
			}
		}
		return props.tag ? createElement(props.tag, context.data, children) : children
	},
}
</script>
