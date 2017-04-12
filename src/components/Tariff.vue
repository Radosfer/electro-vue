<template>
    <div class="card-panel" >
        <span class="center">
            <p>{{ tariff }} <small>грн/кВт</small></p>
        </span>
        <span class="right">
        <a href="#!" class="green-text" @click="doEdit()"><i class="tiny material-icons">mode_edit</i></a>
      </span>
        <!--<div class="input-field col s12" v-show="editMode">-->
            <input id="tariff"
                   type="text"
                   class="validate"
                   v-model="tariff"
                   v-show="editMode"
                   v-focus="editMode"
                   @keyup.enter="doneEditTariff"
                   @keyup.esc="cancelEdit"
                   v-on:focus="selectAll">
            <!--<label for="tariff">Введите тариф</label>-->
        <!--</div>-->


    </div>
</template>


<script type="text/babel">
  import {mapActions} from 'vuex'
  import crud from '../mixin/crud'
  import api from '../api/electro'
  //  import Spinner from './Spinner.vue'
  //  import house from './house.vue'
  //  import street from './street.vue'
  //  import group from './group.vue'
  export default {
    mixins: [crud],
    data () {
      return {
        editMode: false,
        tariff: 0
      }
    },
    mounted: function () {
      api.tariff.getTariffs((price) => {
        this.tariff = price.value
      })
    },
    methods: {
      ...mapActions([
        'addTariff'
      ]),
      doneEditTariff (e) {
        const value = e.target.value.trim()
        if (value && this.editMode) {
          this.addTariff(value)
        }
        this.cancelEdit()
      },
      selectAll: function (event) {
        setTimeout(function () {
          event.target.select()
        }, 0)
      }
    }
  }
</script>

<style>
    span p {
        font-size: 20pt;
    }
</style>
