<template>
    <div>
    <span v-show="!editMode">
      <a href="#!"
         @click="selectGroup(group), groupModeSet">
        {{ group.title }}
      </a>
      <span class="a right">
        <a href="#!" class="green-text" @click="doEdit()"><i class="tiny material-icons">mode_edit</i></a>
        <!--<a href="#!" class="red-text" @click="doDelete(group)"><i class="tiny material-icons">delete</i></a>-->
      </span>
    </span>
        <input class="edit"
               v-show="editMode"
               v-focus="editMode"
               :value="group.title"
               @keyup.enter="doneEdit"
               @keyup.esc="cancelEdit"
               @blur="doneEdit">
    </div>
</template>

<script type="text/babel">
  import {mapActions} from 'vuex'
  import crud from '../mixin/crud'
  import vswal from '../api/swal'
  export default {
    mixins: [crud],
    props: ['group'],
    methods: {
      ...mapActions([
        'selectGroup',
        'editGroup',
        'deleteGroup'
      ]),
      doneEdit (e) {
        const value = e.target.value.trim()
        const {group} = this
        if (value && this.editMode) {
          this.editGroup({group, value})
        }
        this.cancelEdit()
      },
      doDelete () {
        const {group} = this
        vswal({
          title: 'Вы уверены?',
          text: 'Все данные по группе будут удалены',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена'
        }).then(() => {
          this.deleteGroup(group)
        })
      }
    }
  }

</script>
