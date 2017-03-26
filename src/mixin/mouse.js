export default {
  data () {
    return {
      actions: {}
    }
  },
  methods: {
    mouseOver (p) {
      this.actions = p
    },
    mouseOut () {
      this.actions = {}
    }
  }
}
