<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="row">
        <div class="col s12">
            <div class="card-panel">
                <h5>
                    Дома
                    <a href="#!" class="green-text right" @click="doEdit()"><i class="tiny material-icons">add</i></a>
                </h5>
                <div class="row" v-show="loaded">
                    <div class="col s6"
                         v-if="!editMode"
                         v-for="p in houses"
                         :class="{active: p === current}"
                         transition="fade">

                        <house :house="p"></house>
                    </div>
                </div>

                <li class="collection-item" v-if="editMode">
                    <form>
                        <div class="row">

                            <div class="input-field col s12">
                                <input
                                        id="house"
                                        type="text"
                                        class="validate"
                                        v-model="selectedTitle"
                                        @keyup.esc="cancelEdit">
                                <label for="house">Введите номер дома</label>
                            </div>
                            <div class="input-field col s12">
                                <!--<label>Выберите улицу</label>-->
                                <select class="browser-default" v-model="selectedStreetId">
                                    <option disabled>Выберите улицу</option>
                                    <option v-for="p in streets" v-bind:value="p.id">
                                        {{p.title}}
                                    </option>
                                </select>

                                <span>Selected: {{ selectedStreetId }}</span>

                            </div>
                            <div class="input-field col s12">
                                <select class="browser-default" v-model="selectedGroupId">
                                    <option disabled>Выберите группу</option>
                                    <option v-for="p in groups" v-bind:value="p.id">
                                        {{p.title}}
                                    </option>
                                </select>
                                <span>Selected: {{ selectedGroupId }}</span>
                            </div>
                            <div class="input-field col s12">
                                <input id="houseKeeperName" type="text" class="validate" v-model="selectedMan">
                                <label for="houseKeeperName">Введите фамилию, имя и отчество плательщика</label>
                            </div>
                            <div class="input-field col s12">
                                <input id="houseKeeperTel" type="text" class="validate" v-model="selectedPhone">
                                <label for="houseKeeperTel">Введите номер телефона плательщика</label>
                            </div>
                            <div class="input-field col s12">
                                <input id="startCounterValue" type="text" class="validate"
                                       v-model="selectedStartCounterValue">
                                <label for="startCounterValue">Введите начальное показание счетчика</label>
                            </div>
                            <div class="input-field col s12">
                                <!--<button class="btn waves-effect waves-light"-->
                                <!--type="submit"-->
                                <!--name="action"-->
                                <!--@click="doneEdit">-->
                                <!--Далее-->
                                <!--<i class="material-icons right">send</i>-->
                                <!--</button> -->
                                <span class="right">
                                <button class="btn waves-effect waves-light"
                                        type="submit"
                                        name="action"
                                        @click="doneEdit">
                                    Готово
                                    <i class="material-icons right">done</i>
                                </button>
                                </span>
                            </div>
                        </div>
                    </form>
                    <!--<spinner :loaded="loaded"></spinner>-->
                </li>
            </div>
            <!--<select class="browser-default" v-model="selected">-->
            <!--<option value="" disabled selected>Выберите улицу</option>-->
            <!--<option v-for="p in streets" v-bind:value="p.id">-->
            <!--{{p.title}}-->
            <!--</option>-->
            <!--</select>-->
            <!--<span>Selected: {{ selected }}</span>-->
        </div>

    </div>

</template>

<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.0/vue.js"></script>-->
<script type="text/babel">
  import {mapGetters, mapActions} from 'vuex'
  import Spinner from './Spinner.vue'
  import house from './house.vue'
  import street from './street.vue'
  import group from './group.vue'
  import crud from '../mixin/crud'
  export default {
    mixins: [crud],
    data () {
      return {
        editMode: false,
        activedds: false,
        activeddg: false,
        selectedStreetId: '',
        selectedGroupId: '',
        selectedTitle: '',
        selectedMan: '',
        selectedPhone: '',
        selectedStartCounterValue: ''
      }
    },
    computed: mapGetters({
      houses: 'allHouses',
      groups: 'allGroups',
      streets: 'allStreets',
      mans: 'allMans',
      loaded: 'loadedHouse',
      loadedman: 'loadedMan',
      current: 'currentHouse',
      currentman: 'currentMan'
    }),
    methods: {
      ...mapActions([
        'selectHouse',
        'addHouse',
        'addMan'
      ]),
      doEdit () {
        this.editMode = !this.editMode
      },
      doneEdit (e) {
//        const value = e.target.value.trim()
        // todo добавить проверку пустых полей
        if (this.editMode) {
          this.addHouse({
            title: this.selectedTitle,
            street_id: this.selectedStreetId,
            group_id: this.selectedGroupId,
            fio: this.selectedMan,
            phone: this.selectedPhone,
            start_value: this.selectedStartCounterValue
          })
          this.addMan({
            fio: this.selectedMan,
            phone: this.selectedPhone
          })
        }
        this.cancelEdit()
      },
      cancelEdit () {
        this.editMode = false
      },
      selectStreetdd () {
//        this.activedds = !this.activedds
      },
      selectGroupdd () {
//        this.activeddg = !this.activeddg
      }
    },
    components: {Spinner, house, street, group}
  }
</script>


<style lang="scss" type="text/scss">
    .active {

    a {
        color: #fff;
    }

    }

    .fade-transition {
        opacity: 1;
        transition: all .45s linear;
    }

    .fade-enter, .fade-leave {
        opacity: 0;
    }

    .card-panel {

    li {
        list-style-type: none;
    }

    }

</style>
