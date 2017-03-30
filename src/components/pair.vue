<template>
    <div :class="classColor">
        {{ data.name }}
        <span class="right">
            {{ data.value }}
            <!--<a href="#!" class="green-text" @click="doEdit()">-->
                <!--<i class="tiny material-icons">mode_edit</i>-->
            <!--</a>-->
        </span>
        <input class="edit"
               v-show="editMode"
               v-focus="editMode"
               :value="data.value"
               @keyup.enter="doneEdit"
               @keyup.esc="cancelEdit"
               @blur="doneEdit">
    </div>
</template>

<script type="text/babel">
  //  import over from '../mixin/mouse'
  import {mapActions} from 'vuex'
  export default {
//    mixins: [over],
    data () {
      return {
        editMode: false
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      color: {
        type: String,
        default: 'grey'
      }
    },
    computed: {
      classColor () {
        return {
          [this.color + '-text']: true
        }
      }
    },
    methods: {
      ...mapActions([
        'editHouse'
      ]),
      doEdit () {
        this.editMode = !this.editMode
      },
      cancelEdit () {
        this.editMode = false
      },
      doneEdit (e) {
//        const value = {fio: e.target.value.trim()}
        const value = e.target.value.trim()
        const {house} = this.data
//        console.log(house)
        if (value && this.editMode) {
          this.editHouse({house, value})
        }
        this.cancelEdit()
      }
    }
  }
</script>
