<template>
    <div>
        <ul class="collection with-header z-depth-2 hoverable" v-show="loaded">
            <li class="collection-header">
                <h5>
                    Группы
                    <a href="#!" class="green-text right" @click="doEdit()"><i class="tiny material-icons">add</i></a>
                </h5>
            </li>
            <li
                    class="collection-item"
                    v-if="!editMode"
                    v-for="p in groups"
                    v-on:mouseover="mouseOver(p)"
                    v-on:mouseout="mouseOut()"
                    :class="{active: p === current, actions: p === actions}"
                    transition="fade">
                <group :group="p"></group>
            </li>
            <li class="collection-item" v-if="editMode">
                <form>
                    <div class="row">
                        <div class="input-field col s12">
                            <input
                                    id="street"
                                    type="text"
                                    class="validate"
                                    v-focus="editMode"
                                    @keyup.enter="doneEdit"
                                    @keyup.esc="cancelEdit">
                            <label for="street">Название</label>
                        </div>
                    </div>
                </form>
            </li>
        </ul>
        <spinner :loaded="loaded"></spinner>
    </div>
</template>

<script type="text/babel">
  import {mapGetters, mapActions} from 'vuex'
  import Spinner from './Spinner.vue'
  import group from './group.vue'
  import over from '../mixin/mouse'
  import crud from '../mixin/crud'
  export default {
    mixins: [over, crud],
    computed: mapGetters({
      groups: 'allGroups',
      loaded: 'loadedGroup',
      current: 'currentGroup'
    }),
    methods: {
      ...mapActions([
        'selectGroup',
        'addGroup'
      ]),
      doneEdit (e) {
        const value = e.target.value.trim()
        if (value && this.editMode) {
          this.addGroup(value)
        }
        this.cancelEdit()
      }
    },
    created () {
      this.$store.dispatch('getAllGroups')
    },
    components: {Spinner, group}
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

    .collection-item {

    a {
        white-space: nowrap;
    }

    }

</style>
