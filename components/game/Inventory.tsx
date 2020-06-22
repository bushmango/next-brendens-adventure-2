import _ from 'lodash'
import React from 'react'
import { LinkButton } from './LinkButton'
import { sosGame } from './sosGame-sidecar'
import { Gold } from './Gold'

export const Inventory = () => {
  let state = sosGame.useSubscribe()

  return (
    <div>
      <br />
      You have
      <Gold gold={state.gold} hasBackground={true} />
      and ... <br />
      {state.inventory.length === 0 ? 'no items' : ''}
      {_.map(state.inventory, (c, cIdx) => (
        <div key={cIdx}>
          <LinkButton onClick={() => {}}>{c.id}</LinkButton>
          {c.equippable && !c.isEquipped ? (
            <span>
              {' '}
              unequipped{' '}
              <LinkButton
                onClick={() => {
                  sosGame._equip(c)
                }}
              >
                (equip)
              </LinkButton>
            </span>
          ) : (
            ''
          )}
          {c.equippable && c.isEquipped ? (
            <span>
              {' '}
              equipped{' '}
              <LinkButton
                onClick={() => {
                  sosGame._unequip(c)
                }}
              >
                (unequip)
              </LinkButton>
            </span>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  )
}
