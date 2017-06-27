<template>
    <div>
    <span v-show="!editMode">
      <a href="#!"
         @click="selectStreet(street)">
        {{ street.title }}
      </a>
      <span class="a right">
        <a href="#!" class="green-text" @click="doEdit()"><i class="tiny material-icons" title="Редактировать">mode_edit</i></a>
        <!--<a href="#!" class="red-text" @click="doDelete(street)"><i class="tiny material-icons">delete</i></a>-->
      </span>
    </span>
        <input class="edit"
               v-show="editMode"
               v-focus="editMode"
               :value="street.title"
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
    props: ['street'],
    methods: {
      ...mapActions([
        'selectStreet',
        'editStreet',
        'deleteStreet'
      ]),
      doneEdit (e) {
        const value = e.target.value.trim()
        const {street} = this
        if (value && this.editMode) {
          this.editStreet({street, value})
        }
        this.cancelEdit()
      },
      doDelete () {
        const {street} = this
        vswal({
          title: 'Вы уверены?',
          text: 'Все дома с этой улицы будут удалены',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена'
        }).then(() => {
          this.deleteStreet(street)
        })
      }
    }
  }

</script>
