import _ from 'lodash'
import { IItem } from './items'

export interface ILocationDirection {
  id: string
  toLocationId?: string
  action?: (inventory: IItem[]) => string
}
export interface ILocationShop {
  id: string
  cost: number
}

export interface ILocation {
  id: string
  desc: string
  directions: ILocationDirection[]
  shop?: ILocationShop[]
}

export function initLocations() {
  let locations: ILocation[] = [
    {
      id: 'error',
      desc: 'You should not be here!',
      directions: [{ id: 'start-over', toLocationId: 'road' }],
    },
    {
      id: 'road',
      desc: `You are on a plain dirt road.
      You see a farm to the south.
      To the north, you see an old-castle.
      To the west, a small-path leads into a dark forest.`,
      directions: [
        { id: 'south-along-the-road', toLocationId: 'farm' },
        { id: 'north-along-the-road', toLocationId: 'old-castle' },
        { id: 'west-along-small-path', toLocationId: 'forest-entrance' },
      ],
    },
    {
      id: 'farm',
      desc: 'You are at a blueberry farm. There is a small house in the distance.',
      directions: [{ id: 'exit-to-road', toLocationId: 'road' },
      { id: 'walk-to-the-house', toLocationId: 'farm-house' },
      
    
      ]
    },

    {
      id: 'farm-house',
      desc: 'You have arived at the farm house. You knock and the farmer invites you inside',
      directions: [{ id: 'exit-to-road', toLocationId: 'road' },
      {
        id: 'walk-into-the-house',
        action: (inventory: IItem[]) => {
          let deed = _.find(inventory, (c) => c.id === 'farm-deed')
          
          if (
            deed 
          ) {
            return 'forest'
          }
          return 'main-room'
        },
      },
      ]
    },

    {
      id: 'main-room',
      desc: 'it smells a little musty and the farmer offers to sell you the farm. ',
      directions: [{ id: 'exit-to-road', toLocationId: 'road' }],
      shop: [
        { id: 'farm-deed', cost: 5 },
      
      ],
    },



    {
      id: 'forest-monster',
      desc: 'You are in a dangerous forest. A monster eats you!',
      directions: [{ id: 'you die...', toLocationId: '_restart' }],
    },
    {
      id: 'forest-entrance',
      desc:
        'You come across the entrance to a dark and forbidding forest. A chill wind blows.',
      directions: [
        { id: 'small-path', toLocationId: 'road' },
        {
          id: 'enter-forest',
          action: (inventory: IItem[]) => {
            let sword = _.find(inventory, (c) => c.id === 'wooden-sword')
            let shield = _.find(inventory, (c) => c.id === 'shield')

            if (
              sword &&
              sword.isEquipped === true &&
              shield &&
              shield.isEquipped === true
            ) {
              return 'forest'
            }
            return 'forest-monster'
          },
        },
      ],
    },
    {
      id: 'forest',
      desc: 'You are in a dangerous forest. You hear sticks snapping.',
      directions: [
        { id: 'small-path', toLocationId: 'road' },
        { id: 'ruins', toLocationId: 'ruins' },
      ],
    },
    {
      id: 'ruins',
      desc: `There's a treasure chest inside the ruins. You have enough money to win!`,
      directions: [{ id: 'Victory!', toLocationId: '_restart' }],
    },
    {
      id: 'old-castle',
      desc: 'You are in an old-castle.',
      directions: [
        { id: 'exit-to-road', toLocationId: 'road' },
        { id: 'enter-mysterious-building', toLocationId: 'castle-shop' },
      ],
    },
    {
      id: 'castle-shop',
      desc: `It is old but there are a few things left to buy.
      There's an old man behind a counter.`,
      directions: [{ id: 'exit-to-castle', toLocationId: 'old-castle' }],
      shop: [
        { id: 'shield', cost: 2 },
        { id: 'wooden-sword', cost: 1 },
      ],
    },
  ]
  return locations
}
