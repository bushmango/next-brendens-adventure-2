import _ from 'lodash'
import { IItem } from './items'
import { ILocation } from './locations'

export function get() {
    let locations: ILocation[] = [
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
                return 'your-main-room'
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
            id: 'your-main-room',
            desc: 'it smells a little musty and needs some work, but it is yours. ',
            directions: [{ id: 'exit-to-road', toLocationId: 'road' }],
          },






    ]
    return locations
    
}