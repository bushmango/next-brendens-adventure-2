import React from 'react'
import { Layout } from '../layout/Layout'
import { DevTools } from './DevTools'
import { Inventory } from './Inventory'
import { Location } from './Location'
import { Shop } from './Shop'
import { sosGame } from './sosGame-sidecar'
import { TurnCounter } from './TurnCounter'

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
        <Location location={location} />

        <Shop location={location} />

        <Inventory />

        <br />
        <TurnCounter />
  =
        <DevTools />
      </div>
    </Layout>
  )
}
