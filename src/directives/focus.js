export function focus (el, { value }, { context }) {
  if (value) {
    context.$nextTick(() => {
      el.focus()
    })
  }
}
