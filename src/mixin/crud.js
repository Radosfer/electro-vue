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
      //
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
