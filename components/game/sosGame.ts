import l from 'lodash'
import {
  initLocations,
  ILocation,
  ILocationDirection,
  ILocationShop,
} from './locations'
import { initItems, IItem } from './items'
import { sos } from '../lib/sos-sidecar'
import _ from 'lodash'

let locations: ILocation[]
export function getLocations() {
  return locations
}

let items: IItem[]
export function getItems() {
  return items
}

export interface IState {
  text: string
  locationId: string
  inventory: IItem[]
  gold: number
}

export const getSos = sos.createLazySos<IState>('sosGame', 1, () => ({
  text: { default: '' },
  locationId: { default: '' },
  inventory: { default: [] },
  gold: { default: 0 },
}))
export const useSubscribe = sos.createUseSubscribe(getSos)

export function gameRestart() {
  locations = initLocations()
  items = initItems()
  getSos().change((ds) => {
    ds.locationId = 'road'
    ds.inventory = []
    ds.gold = 5
  })
}

export function _navigateToDirection(direction: ILocationDirection) {
  let state = getSos().getState()

  let nextLoc = direction.toLocationId
  if (direction.action) {
    nextLoc = direction.action(state.inventory)
  }

  if (nextLoc === '_restart') {
    gameRestart()
  } else {
    getSos().change((ds) => {
      ds.locationId = nextLoc || ''
    })
  }
}

export function _lookupItem(itemId: string): IItem {
  let item = _.find(items, (c) => c.id === itemId)
  if (!item) {
    _.find(items, (c) => c.id === 'error')
  }
  if (!item) {
    throw new Error('fatal: item not found')
  }
  return item
}

export function _buyItem(location: ILocation, itemInfo: ILocationShop) {
  let state = getSos().getState()

  if (state.gold >= itemInfo.cost) {
    getSos().change((ds) => {
      ds.gold = ds.gold - itemInfo.cost
      ds.inventory = _.cloneDeep(state.inventory)
      let item = _lookupItem(itemInfo.id)
      ds.inventory.push(item)

      // TODO: locations as part of state?
      _.remove(location.shop || [], itemInfo)
    })
  }
}

export function _equip(item: IItem) {
  getSos().change((ds) => {
    l.forEach(ds.inventory, (c) => {
      if (c.id === item.id) {
        c.isEquipped = true
      }
    })
  })
}

export function _unequip(item: IItem) {
  getSos().change((ds) => {
    l.forEach(ds.inventory, (c) => {
      if (c.id === item.id) {
        c.isEquipped = false
      }
    })
  })
}

export function getCurrentLocation() {
  let state = getSos().getState()
  let location = _.find(locations, (c) => c.id === state.locationId)
  if (!location) {
    location = _.find(locations, (c) => c.id === 'error')
  }
  return location || null
}
