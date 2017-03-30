/* global fetch */

import 'whatwg-fetch'

let _streets = []
let _groups = []
let _houses = []

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
      fetch(baseUrl + '/streets')
        .then((response) => response.json())
        .then((json) => {
          _streets = json
          cb(json)
        })
        .catch((ex) => console.log('street parsing failed', ex))
    },
    addStreet (title, cb) {
      fetch(baseUrl + '/streets', {
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
      fetch(baseUrl + '/streets/' + street.id, {
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
      return cb(houses)
    },
    getHouses (street, cb) {
      if (_houses.length > 0) {
        return this.filterHouses(_houses, street, cb)
      }
      fetch(baseUrl + '/houses')
        .then((response) => response.json())
        .then((json) => {
          _houses = json
          return this.filterHouses(json, street, cb)
        }).catch((ex) => console.log('houses parsing failed', ex))
    },
    deleteStreet (street, cb) {
      fetch(baseUrl + '/streets/' + street.id, {
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
      fetch(baseUrl + '/groups')
        .then((response) => response.json())
        .then((json) => {
          _groups = json
          cb(json)
        })
        .catch((ex) => console.log('groups parsing failed', ex))
    },
    addGroup (title, cb) {
      fetch(baseUrl + '/groups', {
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
      fetch(baseUrl + '/groups/' + group.id, {
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
      fetch(baseUrl + '/houses')
        .then((response) => response.json())
        .then((json) => {
          _houses = json
          return this.filterHouses(json, street, cb)
        }).catch((ex) => console.log('group parsing failed', ex))
    },
    deleteGroup (group, cb) {
      fetch(baseUrl + '/groups/' + group.id, {
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
      console.log(title)
      fetch(baseUrl + '/houses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(title)
      })
      // .then(() => cb(true))
      // .catch((ex) => console.log('house add failed', ex))
    },
    addMan (title, cb) {
      console.log(title)
      fetch(baseUrl + '/men', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(title)
      })
    },
    editHouse (house, fio, cb) {
      console.log(fio)
      fetch(baseUrl + '/houses/' + house.id, {
        method: 'PUT',
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fio: fio
        })
      })
      // delay(1000)
        .then(() => cb({
          fio: fio
        }))
        .then(() => cb(fio))
        .catch((ex) => console.log('street edit failed', ex))
    }
  },
  tariff: {
    addTariff (title, cb) {
      // console.log(title)
      fetch(baseUrl + '/prices', {
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

