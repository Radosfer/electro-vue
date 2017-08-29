<template>
    <div>
        <div class="input-field col s12">
            <i class="material-icons prefix"><h5>W</h5></i>
            <input id="AddPayWatt"
                   type="text"
                   placeholder="Кол-во кВт"
                   ref="input"
                   v-bind:value="value"
                   v-on:input="updateValueWatt($event.target.value)"
                   v-on:focus="selectAll">
        </div>

        <div class="input-field col s12">
            <i class="material-icons prefix">&#8372</i>
            <input id="AddPay"
                   type="text"
                   placeholder="Введите сумму оплаты"
                   ref="input1"
                   v-bind:value="value1"
                   v-on:input="updateValueMoney($event.target.value)"
                   v-on:focus="selectAll"
                   v-model="newPay"
                   @keyup.enter="doneAddPay">
        </div>
    </div>
</template>

<script type="text/babel">
  import {mapActions} from 'vuex'
  import api from '../api/electro'
  export default{
    data () {
      return {
        newPay: '',
        newPayWatt: '',
        tariff: 0
      }
    },
    props: ['value', 'value1', 'house'],
    mounted: function () {
      api.tariff.getTariffs((price) => {
        this.tariff = price.value
        console.log(price.value)
      })
    },
    methods: {
      ...mapActions([]),
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
      doneAddPay (e) {
        console.log(this.house)
//        const amount = this.newPay
//        const {house} = this.house
//        console.log(this.house)
//        const houseId = house.id
//        const priceId = this.tariff
//        if (amount && this.editModePay) {
//          this.addPay({houseId, amount, priceId})
//        }
//        this.cancelEdit()
      }
    }
  }

</script>