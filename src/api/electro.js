/* global fetch */

import 'whatwg-fetch'

let _streets = []
let _groups = []
let _houses = []
let _counters = []
let hid = 0

let baseUrl = 'http://electro.dev'

let delay = function (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

export default {
  delay,
  street: {
    getStreets (cb) {
      if (_streets.length > 0) {
        return cb(_streets)
      }
      fetch(baseUrl + '/street')
        .then((response) => response.json())
        .then((json) => {
          _streets = json
          cb(json)
        })
        .catch((ex) => console.log('street parsing failed', ex))
    },
    addStreet (title, cb) {
      fetch(baseUrl + '/street', {
        method: 'POST',
        // mode: 'cors',
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title
        })
      })
        .then(() => cb(true))
        .catch((ex) => console.log('street adding failed', ex))
    },
    editStreet (street, title, cb) {
      fetch(baseUrl + '/street/' + street.id, {
        method: 'PUT',
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title
        })
      })
      // delay(1000)
        .then(() => cb({
          id: street.id,
          title: title
        }))
        .catch((ex) => console.log('street edit failed', ex))
    },
    filterHouses (json, street, cb) {
      var houses = json.filter((house) => house.street_id === street.id)
      // console.log(houses)
      return cb(houses)
    },
    getHouses (street, cb) {
      // console.log(street)
      if (_houses.length > 0) {
        return this.filterHouses(_houses, street, cb)
      }
      fetch(baseUrl + '/house')
        .then((response) => response.json())
        .then((json) => {
          _houses = json
          return this.filterHouses(json, street, cb)
        }).catch((ex) => console.log('houses parsing failed', ex))
    },
    deleteStreet (street, cb) {
      fetch(baseUrl + '/street/' + street.id, {
        method: 'DELETE'
      })
      // _streets.indexOf(street)
      // new list of streets
      // delay(1000)
        .then(() => cb(true))
        .catch((ex) => console.log('street delete failed', ex))
    }
  },
  group: {
    getGroups (cb) {
      if (_groups.length > 0) {
        return cb(_groups)
      }
      fetch(baseUrl + '/group')
        .then((response) => response.json())
        .then((json) => {
          _groups = json
          cb(json)
        })
        .catch((ex) => console.log('groups parsing failed', ex))
    },
    addGroup (title, cb) {
      fetch(baseUrl + '/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title
        })
      })
        .then(() => cb(true))
        .catch((ex) => console.log('street adding failed', ex))
    },
    editGroup (group, title, cb) {
      fetch(baseUrl + '/group/' + group.id, {
        method: 'PUT',
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title
        })
      })
      // delay(1000)
        .then(() => cb({
          id: group.id,
          title: title
        }))
        .catch((ex) => console.log('group edit failed', ex))
    },
    filterHouses (json, group, cb) {
      var houses = json.filter((house) => house.group_id === group.id)
      return cb(houses)
    },
    getHouses (street, cb) {
      if (_houses.length > 0) {
        return this.filterHouses(_houses, street, cb)
      }
      fetch(baseUrl + '/house')
        .then((response) => response.json())
        .then((json) => {
          _houses = json
          return this.filterHouses(json, street, cb)
        }).catch((ex) => console.log('group parsing failed', ex))
    },
    deleteGroup (group, cb) {
      fetch(baseUrl + '/group/' + group.id, {
        method: 'DELETE'
      })
      // _streets.indexOf(street)
      // new list of streets
      // delay(1000)
        .then(() => cb(true))
        .catch((ex) => console.log('group delete failed', ex))
    }
  },
  house: {
    addHouse (title, cb) {
      // console.log(title)
      fetch(baseUrl + '/house', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(title)
      })
        .then((response) => response.json())
        .then((json) => {
          cb(json)
          hid = json.id
        })

      // .then(() => cb(true))
      // .catch((ex) => console.log('house add failed', ex))
    },
    addMan (title, cb) {
      // console.log(title)
      fetch(baseUrl + '/man', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(title)
      })
    },
    addCounter (data, cb) {
      fetch(baseUrl + '/counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          house_id: hid,
          created_at: Date(),
          value: data.start_value
        })
      })
    },
    editHouse (house, fio, phone, cb) {
      fetch(baseUrl + '/house/' + house.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fio: fio,
          phone: phone
        })
      })
        .then((response) => response.json())
        .then((json) => {
          cb(json)
        })
        .catch((ex) => console.log('editHouse edit failed', ex))
    }
  },
  tariff: {
    addTariff (title, cb) {
      fetch(baseUrl + '/price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          created_at: Date(),
          value: title
        })
      })
        .then(() => cb({
          // value: title
        }))
        .catch((ex) => console.log('street adding failed', ex))
    },
    getTariffs (cb) {
      fetch(baseUrl + '/site/price')
        .then((response) => response.json())
        .then((json) => {
          cb(json)
        })
        .catch((ex) => console.log('street parsing failed', ex))
    }
  },
  testimony: {
    addHouseTestimony (house, cb) {
      console.log(house)
      fetch(baseUrl + '/indication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          counter_id: house.houseId,
          created_at: Date(),
          value: house.value
        })
      })
        .then(() => cb({
          // value: title
        }))
        .catch((ex) => console.log('street adding failed', ex))
    },
    filterCounters (json, house, cb) {
      var counters = json.filter((counter) => counter.house_id === house.houseId)
      // console.log(house.houseId)
      return cb(counters)
    },
    getCounters (house, cb) {
      if (_counters.length > 0) {
        return this.filterCounters(_counters, house, cb)
      }
      fetch(baseUrl + '/counter')
        .then((response) => response.json())
        .then((json) => {
          _counters = json
          return this.filterCounters(json, house, cb)
        }).catch((ex) => console.log('houses parsing failed', ex))
      this.addHouseTestimony(house)
    }
    // getHouseTestimony (cb) {
    //   fetch(baseUrl + '/site/price')
    //     .then((response) => response.json())
    //     .then((json) => {
    //       cb(json)
    //     })
    //     .catch((ex) => console.log('street parsing failed', ex))
    // }
  },
  getStreetById (id) {
    let street = _streets.find((element) => {
      return element.id === id
    })
    if (street !== undefined) {
      return street
    }
    return {
      title: ''
    }
  },
  getGroupById (id) {
    let group = _groups.find((element) => {
      return element.id === id
    })
    if (group !== undefined) {
      return group
    }
    return {
      title: ''
    }
  }
  // getHouseById (id) {
  //   let house = _houses.find((element) => {
  //     return element.id === id
  //   })
  //   if (house !== undefined) {
  //     return house
  //   }
  //   return {
  //     title: ''
  //   }
  // }
}

