import _ from 'lodash'
import React from 'react'
import { Layout } from '../layout/Layout'
import { sosGame } from './sosGame-sidecar'

export const LinkButton = (props: {
  onClick: () => void
  children: React.ReactNode
}) => {
  return (
    <a style={{ color: 'blue', cursor: 'pointer' }} onClick={props.onClick}>
      {props.children}
    </a>
  )
}

export const GameBrendensAdventure = () => {
  let state = sosGame.useSubscribe()
  React.useEffect(() => {
    sosGame.gameRestart()
  }, [])

  let locations = sosGame.getLocations()
  let items = sosGame.getItems()

  let location = sosGame.getCurrentLocation() || null

  if (!location) {
    return <div>Error, no location!</div>
  }

  return (
    <Layout title={`Brenden's Adventure`}>
      <div style={{ fontSize: '2em', lineHeight: '1.25em' }}>
        <strong>{location.id}</strong>
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
                {c.id}
              </LinkButton>
            </div>
          ))}
        </div>

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
                  {c.id} ({c.cost} gold)
                </LinkButton>
              </div>
            ))}
          </div>
        )}

        <div>
          <br />
          You have {state.gold} coins and ... <br />
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

        <div style={{ marginTop: 200 }}>
          DevTools:{' '}
          <LinkButton
            onClick={() => {
              sosGame.gameRestart()
            }}
          >
            Restart
          </LinkButton>
        </div>
      </div>
    </Layout>
  )
}
