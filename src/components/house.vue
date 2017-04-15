<template>
    <div>

        <div class="card small z-depth-2 hoverable">
            <div class="card-content">
          <span class="card-title activator">
            Дом №{{ house.title }}
            <i class="material-icons right teal-text">settings</i>
          </span>
                <span v-show="!editMode && !editModeTm && !editModePay">
            <pair :data="streetPair" color="green"></pair>
            <pair :data="groupPair"></pair>
            <pair :data="ownerPair" color="blue"></pair>
            <pair :data="phonePair"></pair>
            <pair :data="valueLastIndication"></pair>
            <pair :data="lastPair"></pair>
            <pair :data="valuePair" color="red"></pair>
            <pair :data="valuePay" color="red"></pair>


          </span>

                <span v-if="editMode && !editModeTm && !editModePay">
                <input id="fioEdit"
                       class="edit"
                       :value="house.fio"
                       @keyup.enter="doneEditFioPhone"
                       @keyup.esc="cancelEdit"
                       v-model="newFio"
                       placeholder="Введите фамилию, имя и отчество">

                <input class="edit"
                       :value="house.phone"
                       v-model="newPhone"
                       @keyup.enter="doneEditFioPhone"
                       @keyup.esc="cancelEdit"
                       placeholder="Введите номер телефона">
                </span>

                <span v-if="editModeTm">
                 <div class="input-field col s12">
                <input id="AddTm"
                       type="text"
                       class="validate"
                       @keyup.enter="doneAddTm"
                       @keyup.esc="cancelEdit">
                     <label for="AddTm">Введите показание счетчика  {{ house.last_indication }}</label>
                     </div>
                    <div class="center">
                    {{ house.last_indication }}
                    </div>
                </span>
                <span v-if="validIndication">
                    <div class="center red">
                    Не менее {{ house.last_indication }}
                    </div>
                </span>


                <span v-if="editModePay">
                    <!--<payment></payment>-->
        <div class="input-field col s12">
             <span class="left prefix">kW</span>
            <input id="AddPayWatt"
                   type="text"
                   placeholder="Кол-во кВт"
                   ref="input"
                   v-bind:value="value"
                   v-on:input="updateValueWatt($event.target.value)"
                   v-on:focus="selectAll"
                   @keyup.esc="cancelEdit"
            >
        </div>

        <div class="input-field col s12">
            <span class="center prefix">&#8372</span>

            <input id="AddPay"
                   type="text"
                   placeholder="Введите сумму оплаты"
                   ref="input1"
                   v-bind:value="value1"
                   v-on:input="updateValueMoney($event.target.value)"
                   v-on:focus="selectAll"
                   @keyup.enter="doneAddPay"
                   @keyup.esc="cancelEdit"
            >
        </div>


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
                <span class="right">
                <a href="#!" class="green-text" @click="doEditTm()"><i class="material-icons">publish</i></a>
                <a href="#!" class="green-text" @click="doEditPay()"><i class="material-icons">payment</i></a>
                </span>
            </div>

        </div>

    </div>

</template>

<script type="text/babel">
  import {mapActions} from 'vuex'
  import api from '../api/electro'
  import pair from './pair.vue'
  //  import tariff from './tariff.vue'
  export default{
    props: ['value', 'value1', 'house'],
    data () {
      return {
        editMode: false,
        editModeTm: false,
        editModePay: false,
        validIndication: false,
        newFio: this.house.fio,
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
          value: '12g'
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
        'addPay'
      ]),
      doEdit () {
        this.editMode = !this.editMode
        this.editModeTm = false
        this.editModePay = false
        this.validIndication = false
      },
      doEditTm () {
        this.editModeTm = !this.editModeTm
        this.editMode = false
        this.editModePay = false
        this.validIndication = false
      },
      doEditPay () {
        this.editModePay = !this.editModePay
        this.editModeTm = false
        this.editMode = false
        this.validIndication = false
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
        const value = e.target.value.trim()
//        const value = this.newTm
        let lastIndication = this.house.last_indication
        const {house} = this
        const houseId = house.id
        if ((value >= lastIndication) && this.editModeTm) {
//          console.log(house.id, value)
//          this.selectCounters({houseId, value})

          this.addHouseTestimony({houseId, value})
          this.cancelEdit()
        } else {
          this.validIndication = true
        }
      },
      doneAddPay (e) {
        const amount = e.target.value.trim()
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
        const fio = this.newFio
        const phone = this.newPhone

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
      }

    },
    components: {pair}
  }

</script>


<style>
    .card-action {
        color: #4d45f0;
        border-top-color: #bbc1b9
    }
</style>
