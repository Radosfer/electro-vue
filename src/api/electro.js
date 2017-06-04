/* global fetch */

import 'whatwg-fetch'

let _streets = []
let _groups = []
let _houses = []
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
          console.log(json)
          cb(json)
        })
        .catch((ex) => console.log('ошибка получения списка улиц', ex))
    },
    addStreet (title, cb) {
      console.log(title)
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
        .then((response) => response.json())
        .then((json) => {
          _streets = json
          console.log(json)
          cb(json)
        })
        // .then(() => cb(true))
        .catch((ex) => console.log('ошибка добавления улиц', ex))
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
        .catch((ex) => console.log('ошибка редактирования улиц', ex))
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
        }).catch((ex) => console.log('ошибка получения списка домов данной улицы', ex))
    },
    deleteStreet (street, cb) {
      fetch(baseUrl + '/street/' + street.id, {
        method: 'DELETE'
      })
      // _streets.indexOf(street)
      // new list of streets
      // delay(1000)
        .then(() => cb(true))
        .catch((ex) => console.log('ошибка удаления улиц', ex))
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
        .catch((ex) => console.log('ошибка получения списка групп', ex))
    },
    addGroup (title, cb) {
      fetch(baseUrl + '/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          spent: 0,
          last_indication: 0
        })
      })
        .then((response) => response.json())
        .then((json) => {
          _groups = json
          cb(json)
        })
        // .then(() => cb(true))
        .catch((ex) => console.log('ошибка добавления групп', ex))
    },
    addGroupCounter (data, cb) {
      console.log(data)
      fetch(baseUrl + '/site/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group_id: data.groupId,
          created_at: Date(),
          value: data.value
        })
      })
        .then((response) => response.json())
        .then((json) => {
          cb(json)
        })
        // .then(() => cb(true))
        .catch((ex) => console.log('ошибка добавления счетчика группы', ex))
    },
    addGroupTestimony (data, cb) {
      console.log(data)
      fetch(baseUrl + '/site/group_testimony', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group_id: data.groupId,
          created_at: Date(),
          value: data.value
        })
      })
        .then((response) => response.json())
        .then((json) => {
          cb(json)
        })
        // .then(() => cb(true))
        .catch((ex) => console.log('ошибка добавления показаний счетчика группы', ex))
    },
    getGroupTestimony (groupId, cb) {
      fetch(baseUrl + '/site/testimony', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group_id: groupId
        })
      })
        .then((response) => response.json())
        .then((json) => {
          cb(json)
          // console.log(json)
        })
        .catch((ex) => console.log('ошибка получения показаний счетчика группы', ex))
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
        .catch((ex) => console.log('ошибка редактирования группы', ex))
    },
    filterHouses (json, group, cb) {
      var houses = json.filter((house) => house.group_id === group.id)
      // console.log(houses)
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
          // console.log(json)
          return this.filterHouses(json, street, cb)
        }).catch((ex) => console.log('ошибка получения списка домов данной группы', ex))
    },
    deleteGroup (group, cb) {
      fetch(baseUrl + '/group/' + group.id, {
        method: 'DELETE'
      })
      // _streets.indexOf(street)
      // new list of streets
      // delay(1000)
        .then(() => cb(true))
        .catch((ex) => console.log('ошибка удаления группы', ex))
    }
  },
  house: {
    addHouse (title, cb) {
      console.log(title)
      fetch(baseUrl + '/house', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(title)
      })
        .then((response) => response.json())
        .then((json) => {
          hid = json.id
          _houses = []
          cb(json)
        })

      // .then(() => cb(true))
      .catch((ex) => console.log('ошибка добавления нового дома', ex))
    },
    addCounter (data, cb) {
      fetch(baseUrl + '/site/counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          house_id: hid,
          created_at: Date(),
          value: data.start_value,
          finish_value: 0
        })
      })
      // _houses = []
        .then((response) => response.json())
        .then((json) => {
          _houses = []
          cb(json)
          console.log(json)
        })
        .catch((ex) => console.log('ошибка добавления первого счетчика дома', ex))
    },
    addNewCounter (data, cb) {
      console.log(data)
      fetch(baseUrl + '/site/counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          house_id: data.house_id,
          created_at: Date(),
          value: data.start_value,
          finish_value: 0
        })
      })

        .then((response) => response.json())
        .then((json) => {
          _houses = []
          cb(json)

          console.log(json)
        })
        .catch((ex) => console.log('ошибка добавления нового счетчика дома', ex))
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
          _houses = []
          cb(json)
        })
        .catch((ex) => console.log('ошибка редактирования дома', ex))
    },
    addPay (data, cb) {
      // console.log(title)
      fetch(baseUrl + '/site/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          house_id: data.houseId,
          created_at: Date(),
          price_id: data.priceId,
          amount: data.amount
        })
      })
        .then((response) => response.json())
        .then((json) => {
          _houses = []
          cb(json)
          // console.log(json)
        })
        .catch((ex) => console.log('ошибка выполения оплаты показаний', ex))
    },
    getHistory (house, cb) {
      console.log(house.id)
      fetch(baseUrl + '/site/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          house_id: house.id
        })
      })
        .then((response) => response.json())
        .then((json) => {
          cb(json)
          // console.log(json)
        })
        .catch((ex) => console.log('ошибка получения истории', ex))
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
        .catch((ex) => console.log('ошибка добавления тарифа', ex))
    },
    getTariffs (cb) {
      fetch(baseUrl + '/site/price')
        .then((response) => response.json())
        .then((json) => {
          cb(json)
        })
        .catch((ex) => console.log('ошибка получения тарифа', ex))
    }
  },
  testimony: {
    addHouseTestimony (data, cb) {
      console.log(data)
      // console.log(data.value)
      fetch(baseUrl + '/site/indication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // counter_id: counters[0].id,
          created_at: Date(),
          value: data.value,
          houseId: data.houseId
        })
      })
      // .then(() => cb(true))
        .then((response) => response.json())
        .then((json) => {
          _houses = []
          cb(json)
          console.log(json)
        })
        .catch((ex) => console.log('ошибка добавления показаний счетчика дома', ex))
    }
    // filterCounters (json, house, cb) {
    //   var counters = json.filter((counter) => counter.house_id === house.houseId)
    //   console.log(counters[0].id, house.value)
    //   this.addHouseTestimony(counters, house)
    //   return cb(counters)
    // },
    // getCounters (house, cb) {
    //   if (_counters.length > 0) {
    //     return this.filterCounters(_counters, house, cb)
    //   }
    //   fetch(baseUrl + '/counter')
    //     .then((response) => response.json())
    //     .then((json) => {
    //       _counters = json
    //       return this.filterCounters(json, house, cb)
    //     }).catch((ex) => console.log('houses parsing failed', ex))
    //   // this.addHouseTestimony(counters[0].id, house.value)
    // }
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

