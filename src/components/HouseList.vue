<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-validate="http://www.w3.org/1999/xhtml">
    <div class="row">
        <div class="col s12">
            <div class="card-panel">
                <h5>
                    Дома
                    <a href="#!" class="green-text right" @click="doEdit()"><i class="tiny material-icons">add</i></a>
                </h5>
                <div class="row" v-show="loaded" >
                <div class="col s6"
                v-if="!editMode && !editMode2"
                v-for="p in houses"
                :class="{active: p === current}"
                transition="fade">

                <house :house="p"></house>
                </div>
                </div>

                <li class="collection-item" v-if="editMode">
                    <form @submit.prevent="validateBeforeSubmit">
                        <div class="row">
                            <div class="input-field col s12">
                                <label for="house">Введите номер дома</label>
                                <input
                                        id="house"
                                        name="humHouse"
                                        type="text"
                                        class="validate"
                                        v-model="selectedTitle"
                                        v-validate:humHouse.initial="'required'"
                                        :class="{'input': true, 'is-danger': errors.has('humHouse') }">
                                <span v-show="errors.has('humHouse')" class="help is-danger">{{ errors.first('humHouse') }}</span>

                            </div>
                            <!--<span>Выберите улицу</span>-->
                            <div class="input-field col s12">

                                <select class="browser-default"
                                        v-model="selectedStreetId"
                                        name="selStreet"
                                        v-validate:selStreet.initial="'required'"
                                        :class="{'input': true, 'is-danger': errors.has('selStreet') }">
                                    <option value="" disabled selected>Выберите улицу</option>
                                    <option v-for="p in streets" v-bind:value="p.id">
                                        {{p.title}}
                                    </option>
                                </select>
                                <span v-show="errors.has('selStreet')" class="help is-danger">{{ errors.first('selStreet') }}</span>
                                <!--<span>Selected: {{ selectedStreetId }}</span>-->

                            </div>
                            <div class="input-field col s12">
                                <select class="browser-default"
                                        v-model="selectedGroupId"
                                        name="selGroup"
                                        v-validate:selStreet.initial="'required'"
                                        :class="{'input': true, 'is-danger': errors.has('selStreet') }">
                                    <option value="" disabled selected>Выберите группу</option>
                                    <option v-for="p in groups" v-bind:value="p.id">
                                        {{p.title}}
                                    </option>
                                </select>
                                <span v-show="errors.has('selGroup')" class="help is-danger">{{ errors.first('selGroup') }}</span>
                                <!--<span>Selected: {{ selectedGroupId }}</span>-->
                            </div>


                            <div class="input-field col s12">
                                <label for="houseKeeperName">Введите фамилию, имя и отчество плательщика</label>
                                <input id="houseKeeperName"
                                       name="name"
                                       v-model="selectedMan"
                                       v-validate:name.initial="'required'"
                                       :class="{'input': true, 'is-danger': errors.has('name') }"
                                       type="text">
                                <span v-show="errors.has('name')"
                                      class="help is-danger">{{ errors.first('name') }}</span>
                            </div>
                            <div class="input-field col s12">
                                <label for="houseKeeperTel">Введите номер
                                    телефона плательщика</label>
                                <input id="houseKeeperTel"
                                       name="numPhone"
                                       type="text"
                                       class="validate"
                                       v-model="selectedPhone"
                                       v-validate:numPhone.initial="'required'"
                                       :class="{'input': true, 'is-danger': errors.has('numPhone') }">
                                <span v-show="errors.has('numPhone')" class="help is-danger">{{ errors.first('numPhone') }}</span>
                            </div>
                            <!--<div class="input-field col s12">-->
                            <!--<label for="startCounterValue">Введите начальное-->
                            <!--показание счетчика</label>-->
                            <!--<input id="startCounterValue"-->
                            <!--name="counterValue"-->
                            <!--type="text"-->
                            <!--class="validate"-->
                            <!--v-model="selectedStartCounterValue"-->
                            <!--v-validate:counterValue.initial="'required|numeric'"-->
                            <!--:class="{'input': true, 'is-danger': errors.has('counterValue') }">-->
                            <!--<span v-show="errors.has('counterValue')" class="help is-danger">{{ errors.first('counterValue') }}</span>-->
                            <!--</div>-->
                            <div class="input-field col s12">
                                <span class="left">
                                <button class="btn waves-effect waves-light"
                                        @click="cancelEdit">
                                    Отмена
                                    <i class="material-icons right"></i>
                                </button>
                                </span>

                                <span class="right">
                                <button class="btn waves-effect waves-light button is-primary"
                                        type="submit"
                                        @click="doEdit2()">
                                    Далее
                                    <i class="material-icons right">play_arrow</i>
                                </button>
                                </span>
                            </div>
                        </div>
                    </form>

                    <!--<spinner :loaded="loaded"></spinner>-->
                </li>
                <li class="collection-item" v-if="editMode2 && !editMode">
                    <form @submit.prevent="validateBeforeSubmit2">
                        <div class="row">
                            <div class="input-field col s12">
                                <label for="startCounterValue">Введите начальное
                                    показание счетчика дома №{{this.selectedTitle}}</label>
                                <input id="startCounterValue"
                                       name="counterValue"
                                       type="text"
                                       class="validate"
                                       v-model="selectedStartCounterValue"
                                       v-validate:counterValue.initial="'required|numeric'"
                                       :class="{'input': true, 'is-danger': errors.has('counterValue') }">
                                <span v-show="errors.has('counterValue')" class="help is-danger">{{ errors.first('counterValue') }}</span>
                            </div>
                            <span class="right">
                                <button class="btn waves-effect waves-light button is-primary">
                                    Готово
                                    <i class="material-icons right">done_all</i>
                                </button>
                                </span>
                        </div>
                    </form>
                </li>

            </div>
        </div>
    </div>
</template>

<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.2.0/vue.js"></script>-->
<script type="text/babel">
  import {mapGetters, mapActions} from 'vuex'
//  import api from '../../api/electro'
  import Spinner from './Spinner.vue'
  import house from './house.vue'
  import street from './street.vue'
  import group from './group.vue'
  import crud from '../mixin/crud'

  export default {
//    name: 'basic-example',
//    props: ['house'],
    mixins: [crud],
    data () {
      return {
        editMode: false,
        editMode2: false,
        activedds: false,
        activeddg: false,
        selectedStreetId: '',
        selectedGroupId: '',
        selectedTitle: '',
        selectedMan: '',
        selectedPhone: '',
        selectedStartCounterValue: '',
        formSubmitted: false,
        email: '',
        name: '',
        secret: '',
        phone: ''
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
      currentman: 'currentMan',
      counters: 'allCounters',
      loadedcounter: 'loadedCounter',
      currentcounter: 'currentCounter'
    }),
    methods: {
      ...mapActions([
        'selectHouse',
        'addHouse',
        'addMan',
        'addCounter'
      ]),
      doEdit () {
        this.editMode = !this.editMode
      },
      doEdit2 () {
        this.editMode2 = !this.editMode2
      },
      doneEdit (e) {
//        const value = e.target.value.trim()
        // todo добавить проверку пустых полей
        if (this.selectedTitle &&
          this.selectedStreetId &&
          this.selectedGroupId &&
          this.selectedMan &&
          this.selectedPhone &&
          this.editMode) {
          this.addHouse({
            title: this.selectedTitle,
            street_id: this.selectedStreetId,
            group_id: this.selectedGroupId,
            fio: this.selectedMan,
            phone: this.selectedPhone,
            start_value: '0'
          })
//          this.addCounter({
//            house_id: this.id,
//            start_value: this.selectedStartCounterValue
//          })
//            this.addMan({
//            fio: this.selectedMan,
//            phone: this.selectedPhone
//          })
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
      },
      validateBeforeSubmit (e) {
        this.$validator.validateAll().then(() => {
          // eslint-disable-next-line
//          alert('From Submitted!')
          this.doneEdit()
        }).catch(() => {
          // eslint-disable-next-line
//          alert('Correct them errors!')
          this.editMode2 = false
        })
      },
      validateBeforeSubmit2 (e) {
        this.$validator.validateAll().then(() => {
          // eslint-disable-next-line
//          alert('From Submitted!')
          this.addCounter({
            house_id: '1',
            start_value: this.selectedStartCounterValue
          })
          this.editMode2 = false
        }).catch(() => {
          // eslint-disable-next-line
//          alert('Correct them errors!')
        })
      }
    },

    components: {
      Spinner, house, street, group
    }
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

    span.is-danger {
        color: #ff0000;
    }

    select.browser-default {
        border-color: #9e9e9e;
    }


</style>

