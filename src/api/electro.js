/* global fetch */

import 'whatwg-fetch'
// import vswal from '../api/swal'

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

let doSwal = function (mes) {
  swal({
    title: 'Ошибка',
    text: mes,
    type: 'error',
    confirmButtonColor: '#ff0000',
    confirmButtonText: 'OK'
  })
}

export default {
  delay,
  street: {
    getStreets (cb) {
      if (_streets.length > 0) {
        return cb(_streets)
      }
      fetch(baseUrl + '/site/get_street')
        .then((response) => response.json())
        .then((json) => {
          _streets = json
          console.log('streets', json)
          cb(json)
        })
        .catch((ex) => console.log('ошибка получения списка улиц', ex))
    },
    addStreet (title, cb) {
      fetch(baseUrl + '/street', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title
        })
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          cb(json)
        })
        .catch((ex) => console.log('ошибка добавления новой улицы', ex))
    },
    editStreet (street, title, cb) {
      fetch(baseUrl + '/street/' + street.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title
        })
      })
        .then(() => cb({
          id: street.id,
          title: title
        }))
        .catch((ex) => console.log('ошибка редактирования улиц', ex))
    },
    filterHouses (json, street, cb) {
      var houses = json.filter((house) => house.street_id === street.id)
      return cb(houses)
    },
    getHouses (street, cb) {
      if (_houses.length > 0) {
        return this.filterHouses(_houses, street, cb)
      }
      // fetch(baseUrl + '/house')
      fetch(baseUrl + '/site/house')
        .then((response) => response.json())
        .then((json) => {
          // _houses = json
          return this.filterHouses(json, street, cb)
        }).catch((ex) => console.log('ошибка получения списка домов данной улицы', ex))
    },
    deleteStreet (street, cb) {
      fetch(baseUrl + '/street/' + street.id, {
        method: 'DELETE'
      })
        .then(() => cb(true))
        .catch((ex) => console.log('ошибка удаления улиц', ex))
    }
  },
  group: {
    getGroups (cb) {
      if (_groups.length > 0) {
        return cb(_groups)
      }
      fetch(baseUrl + '/site/get_group')
        .then((response) => response.json())
        .then((json) => {
          _groups = json
          console.log('groups', json)
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
          cb(json)
        })
        .catch((ex) => console.log('ошибка добавления новой группы', ex))
    },
    addGroupCounter (data, cb) {
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
        .catch((ex) => console.log('ошибка добавления нового счетчика группы', ex))
    },
    addGroupTestimony (data, cb) {
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
          // cb(json)
          if (json.hasOwnProperty('error')) {
            doSwal(json.error)
            cb(_groups)
          } else {
            cb(json)
          }
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
        })
        .catch((ex) => console.log('ошибка получения показаний счетчика группы', ex))
    },
    editGroup (group, title, cb) {
      fetch(baseUrl + '/group/' + group.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title
        })
      })
        .then(() => cb({
          id: group.id,
          title: title
        }))
        .catch((ex) => console.log('ошибка редактирования группы', ex))
    },
    filterHouses (json, group, cb) {
      var houses = json.filter((house) => house.group_id === group.id)
      return cb(houses)
    },
    getHouses (street, cb) {
      if (_houses.length > 0) {
        return this.filterHouses(_houses, street, cb)
      }
      // fetch(baseUrl + '/house')
      fetch(baseUrl + '/site/house')
        .then((response) => response.json())
        .then((json) => {
          // _houses = json
          return this.filterHouses(json, street, cb)
        }).catch((ex) => console.log('ошибка получения списка домов данной группы', ex))
    },
    deleteGroup (group, cb) {
      fetch(baseUrl + '/group/' + group.id, {
        method: 'DELETE'
      })
        .then(() => cb(true))
        .catch((ex) => console.log('ошибка удаления группы', ex))
    }
  },
  house: {
    addHouse (title, cb) {
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
        .then((response) => response.json())
        .then((json) => {
          _houses = []
          cb(json)
        })
        .catch((ex) => console.log('ошибка добавления первого счетчика дома', ex))
    },
    addNewCounter (data, cb) {
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
        })
        .catch((ex) => console.log('ошибка выполения оплаты показаний', ex))
    },
    getHistory (house, cb) {
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
        })
        .catch((ex) => console.log('ошибка получения истории', ex))
    }
  },
  tariff: {
    addTariff (title, cb) {
      fetch(baseUrl + '/site/add_price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          created_at: Date(),
          value: title
        })
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          cb(json)
        })
        .catch((ex) => console.log('ошибка добавления тарифа', ex))
    },
    getTariffs (cb) {
      fetch(baseUrl + '/site/price')
        .then((response) => response.json())
        .then((json) => {
          cb(json)
        })
        .catch((ex) => console.log('ошибка получения тарифа', ex))
    },
    getHouses (cb) {
      fetch(baseUrl + '/site/house')
        .then((response) => response.json())
        .then((json) => {
          cb(json)
        }).catch((ex) => console.log('ошибка получения списка домов', ex))
    }
  },
  testimony: {
    addHouseTestimony (data, cb) {
      fetch(baseUrl + '/site/indication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          created_at: Date(),
          value: data.value,
          houseId: data.houseId
        })
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.hasOwnProperty('error')) {
            doSwal(json.error)
          } else {
            _houses = []
            cb(json)
          }
        })
        .catch((ex) => console.log('ошибка добавления показаний счетчика дома', ex))
    }
  },
  getStreetById (id) {
    console.log('getStreetById', _streets)
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

