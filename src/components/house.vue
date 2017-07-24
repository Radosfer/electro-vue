<template>
    <div>
        <div class="card small z-depth-2 hoverable">
            <div class="card-content">
                <span class="card-title activator" @click="getHistoryHouse">
                    Дом №{{ house.title }}
                    <i class="material-icons right teal-text green-text" title="Посмотреть историю">history</i>
                </span>
                <span v-show="!editAddCounter && !editMode && !editModeTm && !editModePay && !editDeposit">
                    <pair :data="streetPair" color="green"></pair>
                    <pair :data="groupPair"></pair>
                    <pair :data="ownerPair" color="blue"></pair>
                    <pair :data="phonePair"></pair>
                    <pair :data="valueLastIndication"></pair>
                    <pair :data="valuePair" :color="colorValue"></pair>
                    <pair :data="valuePay" :color="colorValue"></pair>
                </span>

                <span v-if="editMode && !editModeTm && !editModePay && !editDeposit">
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

                <span v-if="!editMode && !editModeTm && !editModePay && editDeposit">
                    <div class="col s6">
                        Сделать взнос
                        <div class="input-field col s12">
                            <textarea id="depPurp"
                                      placeholder="Назначение">
                            </textarea>
                        </div>
                        <div class="input-field col s12">
                                <input id="depSum"
                                       class="edit"
                                       @keyup.enter="doneAddDeposit"
                                       @keyup.esc="cancelEdit"
                                       placeholder="Сумма">
                        </div>
                        <!--<button class="btn waves-effect waves-light button is-primary"-->
                                <!--@click="doneAddDeposit">-->
                                    <!--Готово-->
                                    <!--<i class="material-icons right">arrow_upward</i>-->
                        <!--</button>-->
                    </div>
                    <div class="col s6">
                         <div id="tableDeposits">
                            <table>
                                <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Сумма</th>
                                    <th>Назначение</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="p in deposits">
                                    <td>{{p.date.slice(4, -25)}}</td>
                                    <td>{{p.amount}}</td>
                                    <td>{{p.purpose}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>


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
                    Оплата
                    <div class="input-field col s12">
                        <input id="AddPayWatt"
                               type="text"
                               ref="input"
                               v-bind:value="value"
                               v-on:input="updateValueWatt($event.target.value)"
                               v-on:focus="selectAll"
                               @keyup.enter="doneAddPay"
                               @keyup.esc="cancelEdit"
                               :placeholder="house.testimony + ' кВт'">
                    </div>
                    <div class="input-field col s12">
                        <input id="AddPay"
                               type="text"
                               ref="input1"
                               v-bind:value="value1"
                               v-on:input="updateValueMoney($event.target.value)"
                               v-on:focus="selectAll"
                               @keyup.enter="doneAddPay"
                               @keyup.esc="cancelEdit"
                               :placeholder="house.money + currency">
                    </div>
                </span>
            </div>

            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">
                    Дом №{{ house.title }}
                    <i class="material-icons right teal-text">close</i>
                </span>
                <div id="tableGroup">
                    <table>
                        <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Оплата</th>
                            <th>Последние показания (стартовые)</th>
                            <th>Тариф</th>
                            <th>Счет (грн)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="p in historyHouse">
                            <td>{{p.date.slice(4, -25)}}</td>
                            <td>{{p.pay}}</td>
                            <td>{{p.testimony}} ({{p.start_indication}})</td>
                            <td>{{p.tariff}}</td>
                            <td>{{p.money}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            <!--<div class="card-action">-->
            <!--<a href="#!" class="green-text" @click="doEdit()"><i class="material-icons">mode_edit</i></a>-->
            <!--<a href="#!" class="grey-text" @click="doEditAddCounter()"><i-->
            <!--class="material-icons">add_circle_outline</i></a>-->
            <!--<span class="right">-->
            <!--<a href="#!" class="green-text" @click="doEditTm()"><i class="material-icons">publish</i></a>-->
            <!--<a href="#!" class="green-text" @click="doEditPay()"><i class="material-icons">payment</i></a>-->
            <!--</span>-->
            <div class="fixed-action-btn horizontal click-to-toggle" style="position: absolute; " title="Меню">
                <a class="btn-floating btn-large">
                    <i class="material-icons">menu</i>
                </a>
                <ul>
                    <li>
                        <a class="btn-floating grey" @click="doEditDeposit()" title="Взнос">
                            <i class="material-icons">monetization_on</i>
                        </a>
                    </li>
                    <li>
                        <a class="btn-floating green" @click="doEdit()" title="Редактировать">
                            <i class="material-icons">mode_edit</i>
                        </a>
                    </li>
                    <li>
                        <a class="btn-floating grey" @click="doEditAddCounter()" title="Добавить новый счетчик">
                            <i class="material-icons">add_circle_outline</i>
                        </a>
                    </li>
                    <li>
                        <a class="btn-floating green" @click="doEditTm()" title="Ввести новые показания">
                            <i class="material-icons">publish</i>
                        </a>
                    </li>
                    <li>
                        <a class="btn-floating green" @click="doEditPay()" title="Оплатить">
                            <i class="material-icons">payment</i>
                        </a>
                    </li>
                </ul>
            </div>
            <!--</div>-->
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
        editDeposit: false,
        validIndication: false,
        validNewCounterValue: false,
        newPhone: this.house.phone,
        newPay: '',
        tariff: 0,
        amount: '',
        lastInd: this.house.last_indication
      }
    },
    computed: {
      ...mapGetters({
        historyHouse: 'historyHouse',
        deposits: 'allDeposits',
        currentTariff: 'currentTariff'
      }),
      currency () {
        return window.currency
      },
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
//        this.tariff = price.value
        this.tariff = this.currentTariff
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
        'addDeposit',
        'getDeposit',
        'addNewCounter',
        'addTariff',
        'getAllTariffs',
        'getHistory'
      ]),
      doEdit () {
        this.editMode = !this.editMode
        this.editModeTm = false
        this.editModePay = false
        this.validIndication = false
        this.validNewCounterValue = false
        this.editAddCounter = false
        this.editDeposit = false
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
        this.editDeposit = false
      },
      doEditPay () {
        this.getAllTariffs()
        this.editModePay = !this.editModePay
        this.editModeTm = false
        this.editMode = false
        this.validIndication = false
        this.validNewCounterValue = false
        this.editAddCounter = false
        this.editDeposit = false
      },
      doEditAddCounter () {
        this.editAddCounter = !this.editAddCounter
        this.editModePay = false
        this.editModeTm = false
        this.editMode = false
        this.validIndication = false
        this.validNewCounterValue = false
        this.editDeposit = false
      },
      doEditDeposit () {
        const {house} = this
        const houseId = house.id
        this.getDeposit({houseId})
        this.editDeposit = !this.editDeposit
        this.editAddCounter = false
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
        let lastIndication = Number(this.house.last_indication)
        const {house} = this
        const houseId = house.id
        const groupId = house.group_id
        if (value >= lastIndication && this.editModeTm) {
          this.addHouseTestimony({houseId, value, groupId})
          this.cancelEdit()
        } else {
          this.validIndication = true
        }
      },
      doneAddNewCounter (e) {
        const value = e.target.value.trim()
        const {house} = this
        const houseId = house.id
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
      doneAddPay () {
        let amount = Number(document.getElementById('AddPay').value.trim())
//        amount = parseFloat(amount.replace(',', '.'))
        const {house} = this
        const houseId = house.id
        const priceId = this.currentTariff
        if (amount && this.editModePay) {
          this.addPay({houseId, amount, priceId})
        }
        this.cancelEdit()
      },
      doneAddDeposit () {
        let amount = document.getElementById('depSum').value.trim()
        let purpose = document.getElementById('depPurp').value.trim()
        const {house} = this
        const houseId = house.id
        if (amount && purpose && this.editDeposit) {
          this.addDeposit({houseId, amount, purpose})
        }
//        this.cancelEdit()
      },
      doneEditFioPhone () {
        // todo добавить проверку пустых полей
        const {house} = this
        const fio = this.fio.newFio
        const phone = this.fio.newPhone
        if (this.editMode) {
          this.editHouse({house, fio, phone})
        }
        this.cancelEdit()
      },
      updateValueMoney: function (value) {
        value = parseFloat(value.replace(',', '.')).toFixed(2)
        let cost = this.currentTariff
        let valueMoney = (value * 100) / (cost * 100)
        console.log(value, cost, valueMoney)
        if (!valueMoney) {
          this.$refs.input.value = 0
        } else {
//          this.$refs.input.value = valueMoney.toFixed(0)
          this.$refs.input.value = Math.floor(valueMoney)
          this.$emit('input1', Number(valueMoney))
        }
//        this.$emit('input1', Number(valueMoney))
      },
      updateValueWatt: function (value) {
        value = parseFloat(value.replace(',', '.')).toFixed(0)
        let cost = this.currentTariff
        let valueWatt = value * cost
        if (!valueWatt) {
          this.$refs.input1.value = 0
        } else {
          this.$refs.input1.value = valueWatt.toFixed(2)
          this.$emit('input', Number(valueWatt))
        }
//        this.$emit('input', Number(valueWatt))
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
        this.editDeposit = false
      },
      getHistoryHouse () {
        const {house} = this
        this.getHistory(house)
      }
    },
    components: {pair}
  }
</script>


<style lang="scss" type="text/scss">
    .card-action {
        color: #4d45f0;
        border-top-color: #bbc1b9
    }

    #tableGroup {
        font-size: 10px;
    }
    #tableDeposits {
        font-size: 10px;
    }
</style>
