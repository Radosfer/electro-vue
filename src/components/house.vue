<template>
    <div>

        <div class="card small z-depth-2 hoverable">
            <div class="card-content">
          <span class="card-title activator">
            Дом №{{ house.title }}
            <i class="material-icons right teal-text green-text" @click="getHistoryHouse">history</i>
          </span>
                <span v-show="!editAddCounter && !editMode && !editModeTm && !editModePay">
            <pair :data="streetPair" color="green"></pair>
            <pair :data="groupPair"></pair>
            <pair :data="ownerPair" color="blue"></pair>
            <pair :data="phonePair"></pair>
            <pair :data="valueLastIndication"></pair>
                    <!--<pair :data="lastPair"></pair>-->
            <pair :data="valuePair" :color="colorValue"></pair>
            <pair :data="valuePay" :color="colorValue"></pair>


          </span>

                <span v-if="editMode && !editModeTm && !editModePay">
                    <!--Изменить данные владельца-->
                <label for="fioEdit">Изменить ФИО</label>
                <input id="fioEdit"
                       class="edit"
                       value="house.fio"
                       @keyup.enter="doneEditFioPhone"
                       @keyup.esc="cancelEdit"
                       v-model="fio.newFio">
                <label for="phoneEdit">Изменить номер телефона</label>
                <input id="phoneEdit"
                       class="edit"
                       :value="house.phone"
                       v-model="fio.newPhone"
                       @keyup.enter="doneEditFioPhone"
                       @keyup.esc="cancelEdit">

                </span>

                <span v-if="editAddCounter">
                    Добавление нового счетчика
                <div class="input-field col s12">
                <input id="cntrEdit"
                       type="text"
                       class="validate"
                       @keyup.enter="doneAddNewCounter"
                       @keyup.esc="cancelEdit">
                 <label for="cntrEdit">Начальные показания нового счетчика</label>
                 </div>
                </span>
                <span v-if="validNewCounterValue">
                    <div class="center red">
                    Только число
                    </div>
                </span>


                <span v-if="editModeTm">
                    Новые показания
                 <div class="input-field col s12">
                <input id="AddTm"
                       type="text"
                       class="validate"
                       @keyup.enter="doneAddTm"
                       @keyup.esc="cancelEdit">
                     <label for="AddTm">Последние показания  {{ house.last_indication }}</label>
                 </div>

                </span>
                <span v-if="validIndication">
                    <div class="center red">
                    Не менее {{ house.last_indication }}
                    </div>
                </span>


                <span v-if="editModePay">
                    <!--<payment></payment>-->
                    Оплата
        <div class="input-field col s12">

             <!--<span class="left prefix">kW</span>-->
            <input id="AddPayWatt"
                   type="text"
                   ref="input"
                   v-bind:value="value"
                   v-on:input="updateValueWatt($event.target.value)"
                   v-on:focus="selectAll"
                   @keyup.enter="doneAddPay"
                   @keyup.esc="cancelEdit"
            >
            <label for="AddPayWatt">{{ house.testimony }} кВт</label>
        </div>

        <div class="input-field col s12">
            <!--<span class="center prefix">&#8372</span>-->

            <input id="AddPay"
                   type="text"
                   ref="input1"
                   v-bind:value="value1"
                   v-on:input="updateValueMoney($event.target.value)"
                   v-on:focus="selectAll"
                   @keyup.enter="doneAddPay"
                   @keyup.esc="cancelEdit"
            >
            <label for="AddPay">{{ house.money }} грн.</label>
        </div>


                </span>


            </div>
            <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">
            Дом №{{ house.title }}
            <i class="material-icons right teal-text">close</i>
          </span>
                <!--<p>Here is some more information about this product that is only revealed once clicked on.</p>-->
                <table>
                    <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Оплата</th>
                        <th>Последние показания</th>
                        <th>Тариф</th>
                        <th>Счет (грн)</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr v-for="p in historyHouse">
                        <td>{{p.date.slice(4, -25)}}</td>
                        <td>{{p.pay}}</td>
                        <td>{{p.testimony}}</td>
                        <td>{{p.tariff}}</td>
                        <td>{{p.money}}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
            <div class="card-action">
                <a href="#!" class="green-text" @click="doEdit()"><i class="material-icons">mode_edit</i></a>
                <a href="#!" class="grey-text" @click="doEditAddCounter()"><i
                        class="material-icons">add_circle_outline</i></a>
                <span class="right">
                <a href="#!" class="green-text" @click="doEditTm()"><i class="material-icons">publish</i></a>
                <a href="#!" class="green-text" @click="doEditPay()"><i class="material-icons">payment</i></a>
                </span>
            </div>

        </div>

    </div>

</template>

<script type="text/babel">
  import {mapGetters, mapActions} from 'vuex'
  import api from '../api/electro'
  import pair from './pair.vue'
  import vswal from '../api/swal'
  export default{
    props: ['value', 'value1', 'house'],
    data () {
      return {
        editMode: false,
        editModeTm: false,
        editModePay: false,
        editAddCounter: false,
        validIndication: false,
        validNewCounterValue: false,
//        colorValue: 'green',
//        houseAccount: false,
//        newFio: '',
        newPhone: this.house.phone,
        newTm: '',
        newPayWatt: '12',
        newPay: '',
        tariff: 0,
        amount: '',
        lastInd: this.house.last_indication
      }
    },
    computed: {
      ...mapGetters({
        historyHouse: 'historyHouse'
      }),
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
      valueLastIndication () {
        return {
          name: 'Показания:',
          value: this.house.last_indication
        }
      },
      lastPair () {
        return {
          name: 'Передача показаний:',
//          value: this.house.created_at
          value: 0
        }
      },
      valuePair () {
        return {
          name: 'Кол-во кВт:',
          value: this.house.testimony
        }
      },
      valuePay () {
        return {
          name: 'Счет:',
          value: this.house.money
        }
      },
      count: function () {
        return this.newPay
      },
      fio: function () {
        return {
          newFio: this.house.fio,
          newPhone: this.house.phone

        }
      },
      colorValue: function () {
        let money = this.house.money
        if (money < 0) {
          return 'red'
        } else {
          return 'green'
        }
      }
    },
    mounted: function () {
      api.tariff.getTariffs((price) => {
        this.tariff = price.value
//        console.log(price.id)
      })
    },
    methods: {
      ...mapActions([
        'selectHouse',
        'editHouse',
        'addHouseTestimony',
        'getCounters',
        'selectCounters',
        'addPay',
        'addNewCounter',
        'getHistory'
      ]),
      doEdit () {
        this.editMode = !this.editMode
        this.editModeTm = false
        this.editModePay = false
        this.validIndication = false
        this.validNewCounterValue = false
        this.editAddCounter = false
      },
      doSwalEdit () {
        vswal({
          title: 'Вы уверены?',
          text: 'Все данные по группе будут удалены',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена'
        })
      },
      doEditTm () {
        this.editModeTm = !this.editModeTm
        this.editMode = false
        this.editModePay = false
        this.validIndication = false
        this.validNewCounterValue = false
        this.editAddCounter = false
      },
      doEditPay () {
        this.editModePay = !this.editModePay
        this.editModeTm = false
        this.editMode = false
        this.validIndication = false
        this.validNewCounterValue = false
        this.editAddCounter = false
      },
      doEditAddCounter () {
        this.editAddCounter = !this.editAddCounter
        this.editModePay = false
        this.editModeTm = false
        this.editMode = false
        this.validIndication = false
        this.validNewCounterValue = false
      },
      doneEdit (e) {
        const value = e.target.value.trim()
        const {house} = this
        if (value && this.editMode) {
          this.editStreet({house, value})
        }
        this.cancelEdit()
      },
      doneAddTm (e) {
        let value = Number(e.target.value.trim())
        console.log(value)
//        const value = this.newTm
        let lastIndication = Number(this.house.last_indication)
        console.log(value, lastIndication)
        const {house} = this
        const houseId = house.id
        if (value >= lastIndication && this.editModeTm) {
//          console.log(house.id, value)
//          this.selectCounters({houseId, value})

          this.addHouseTestimony({houseId, value})
          this.cancelEdit()
        } else {
          console.log(value, lastIndication)
          this.validIndication = true
        }
      },
      doneAddNewCounter (e) {
        const value = e.target.value.trim()
        const {house} = this
        const houseId = house.id
        console.log(houseId, value)
        if ((value >= 0) && (value !== '')) {
          this.validNewCounterValue = false
          this.addNewCounter({
            house_id: houseId,
            start_value: value
          })
          this.cancelEdit()
        } else {
          this.validNewCounterValue = true
        }
      },
      doneAddPay (e) {
//        const amount = e.target.value.trim()
        const amount = document.getElementById('AddPay').value.trim()
        const {house} = this
        const houseId = house.id
        const priceId = this.tariff
        if (amount && this.editModePay) {
          this.addPay({houseId, amount, priceId})
        }
        this.cancelEdit()
      },
      doneEditFioPhone (e) {
        // todo добавить проверку пустых полей
        const {house} = this
        const fio = this.fio.newFio
        const phone = this.fio.newPhone
//        console.log(fio, phone)

        if (this.editMode) {
          this.editHouse({house, fio, phone})
        }
        this.cancelEdit()
      },
      updateValueMoney: function (value) {
        let cost = this.tariff
        let valueMoney = value / cost
        this.$refs.input.value = valueMoney
        this.$emit('input1', Number(valueMoney))
      },
      updateValueWatt: function (value) {
        let cost = this.tariff
        let valueWatt = value * cost
        this.$refs.input1.value = valueWatt
        this.$emit('input', Number(valueWatt))
      },
      selectAll: function (event) {
        setTimeout(function () {
          event.target.select()
        }, 0)
      },
      cancelEdit () {
        this.editMode = false
        this.editModeTm = false
        this.editModePay = false
        this.validIndication = false
        this.validNewCounterValue = false
        this.editAddCounter = false
      },
      getHistoryHouse () {
        const {house} = this
        console.log(house)
        this.getHistory(house)
      }

    },
    components: {
      pair
//      p: {
//        template: '#template_p',
//        props: ['x']
//        replace: false // you can remove this option if you add a <tr></tr> around you <td> elements in the template.
//      }
    }
  }

</script>


<style lang="scss" type="text/scss">
    .card-action {
        color: #4d45f0;
        border-top-color: #bbc1b9
    }

    table {
        font-size: 10px;
    }

    .house-account-g {
        color: green
    }

    .house-account-r {
        color: red
    }
</style>
