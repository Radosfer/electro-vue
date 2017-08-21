<template>
    <div id="app">
        <a href="http://el.na-dachke.ru" >
            <i class="material-icons grey-text"
               style="font-size: 40px"
               title="Вернуться на el.na-dachke.ru">arrow_back</i>
        </a>
        <span></span>
        <div class="row">
            <div class="col s3">
                <tariff></tariff>
                <street-list></street-list>
                <group-list></group-list>
            </div>
            <div class="col s9">
                <house-list></house-list>

            </div>
        </div>
    </div>
</template>

<script type="text/babel">
  import StreetList from './StreetList.vue'
  import HouseList from './HouseList.vue'
  import GroupList from './GroupList.vue'
  import Tariff from './Tariff.vue'
  export default {
    components: {
      StreetList,
      HouseList,
      GroupList,
      Tariff
    }
  }
</script>

<style lang="scss" type="text/scss">
    .a {
        display: none;
    }
    .actions {

    .a {
        display: block;
    }

    }
</style>