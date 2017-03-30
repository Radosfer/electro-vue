<template>
    <div>

        <div class="card small z-depth-2 hoverable">
            <div class="card-content">
          <span class="card-title activator">
            Дом №{{ house.title }}
            <i class="material-icons right teal-text">settings</i>
          </span>
                <span v-show="!editMode">
            <pair :data="streetPair" color="green"></pair>
            <pair :data="groupPair"></pair>
            <pair :data="ownerPair" color="blue"></pair>
            <pair :data="phonePair"></pair>
            <pair :data="lastPair"></pair>
            <pair :data="valuePair" color="red"></pair>

          </span>
                <span v-if="editMode">
                <input id="fioEdit"
                       class="edit"
                       :value="house.fio"
                       @keyup.enter="doneEditFioPhone"
                       @keyup.esc="cancelEdit"
                       v-model="newFio"
                       placeholder="Введите фамилию, имя и отчество"
                >

                <input class="edit"
                       :value="house.phone"
                       v-model="newPhone"
                       @keyup.enter="doneEditFioPhone"
                       @keyup.esc="cancelEdit"
                       placeholder="Введите номер телефона"
                >
           </span>
            </div>
            <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">
            Дом №{{ house.title }}
            <i class="material-icons right teal-text">close</i>
          </span>
                <p>Here is some more information about this product that is only revealed once clicked on.</p>
            </div>
            <div class="card-action">
                <a href="#!" class="green-text" @click="doEdit()"><i class="material-icons">mode_edit</i></a>
            </div>
        </div>


    </div>
</template>

<script type="text/babel">
  import {mapActions} from 'vuex'
  import api from '../api/electro'
  import pair from './pair.vue'
  export default{
    props: ['house'],
    data () {
      return {
        editMode: false,
        newFio: this.house.fio,
        newPhone: this.house.phone

      }
    },
    computed: {
      street () {
        return api
          .getStreetById(this.house.street_id)
      },
      group () {
        return api
          .getGroupById(this.house.group_id)
      },
//      house () {
//        return api
//          .getHouseById(this.house.fio)
//      },
      streetPair () {
        return {
          name: 'Улица:',
          value: this.street.title
        }
      },
      groupPair () {
        return {
          name: 'Группа:',
          value: this.group.title
        }
      },
      ownerPair () {
        return {
          house: this.house,
          name: 'ФИО:',
          value: this.house.fio
        }
      },
      phonePair () {
        return {
          house: this.house,
          name: 'Телефон:',
          value: this.house.phone
        }
      },
      lastPair () {
        return {
          name: 'Передача показаний:',
          value: '12/12/2016'
        }
      },
      valuePair () {
        return {
          name: 'Показания:',
          value: 226
        }
      }
    },
    methods: {
      ...mapActions([
        'selectHouse',
        'editHouse'
      ]),
      doEdit () {
        this.editMode = !this.editMode
      },
      doneEdit (e) {
        const value = e.target.value.trim()
        const {house} = this
        if (value && this.editMode) {
          this.editStreet({house, value})
        }
        this.cancelEdit()
      },
      doneEditFioPhone (e) {
        // todo добавить проверку пустых полей
        const {house} = this
        const fio = this.newFio
        const phone = this.newPhone

        if (this.editMode) {
          this.editHouse({house, fio, phone})
        }
        this.cancelEdit()
      },
      cancelEdit () {
        this.editMode = false
      }

    },
    components: {pair}
  }

</script>
