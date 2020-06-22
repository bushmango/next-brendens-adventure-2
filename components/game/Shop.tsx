import _ from 'lodash'
import React from 'react'
import { LinkButton } from './LinkButton'
import { sosGame } from './sosGame-sidecar'
import { ILocation } from './locations'
import { displayId } from './displayId'
import { Gold } from './Gold'

export const Shop = (props: { location: ILocation }) => {
  let state = sosGame.useSubscribe()
  let { location } = props
  return (
    <div>
      {location && location.shop && (
        <div>
          <br />
          Buy ... <br />
          {_.map(location.shop, (c, cIdx) => (
            <div key={cIdx}>
              <LinkButton
                onClick={() => {
                  location && sosGame._buyItem(location, c)
                }}
              >
                {displayId(c.id)} <Gold gold={c.cost}  hasBackground={false} />
              </LinkButton>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
