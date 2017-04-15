<template>
    <div id="app">
        <h1 class="header">
            <i class="medium material-icons teal-text">trending_up</i>
            Electra
        </h1>
        <div class="row">
            <div class="col s3">
                <tariff></tariff>
                <street-list></street-list>
                <group-list></group-list>
                <!--<a class="btn tooltipped" data-position="top" data-delay="50" data-tooltip="I am tooltip">Hover me!</a>-->
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