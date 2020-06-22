import _ from 'lodash'
import React from 'react'
import { LinkButton } from './LinkButton'
import { ILocation } from './locations'
import { sosGame } from './sosGame-sidecar'
import { displayId } from './displayId'

export const Location = (props: { location: ILocation }) => {
  let { location } = props
  return (
    <div>
      <strong>{displayId(location.id)}</strong>
      <div>{location.desc}</div>
      <div>
        <br />
        Go ... <br />
        {_.map(location.directions, (c, cIdx) => (
          <div key={cIdx}>
            <LinkButton
              onClick={() => {
                sosGame._navigateToDirection(c)
              }}
            >
              {displayId(c.id)}
            </LinkButton>
          </div>
        ))}
      </div>
    </div>
  )
}
