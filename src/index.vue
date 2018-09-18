<script>
export default {
	name: 'VSeparate',

	functional: true,

	props: {
		tag: null,
		separator: null,
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
				for (var index = 0; index <= lastIndex; index += 1) {
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
