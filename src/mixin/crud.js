export default {
  data () {
    return {
      editMode: false
      // groupMode: false
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
    },
    groupModeSet () {
      this.groupMode = true
    },
    groupModeOff () {
      this.groupMode = false
    }
  }
}
