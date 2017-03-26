export default {
  data () {
    return {
      editMode: false
    }
  },
  methods: {
    doEdit () {
      this.editMode = !this.editMode
    },
    doneEdit (e) {
      // WRITE SELF
    },
    cancelEdit () {
      this.editMode = false
    }
  }
}
