import React from 'react'
import { LinkButton } from './LinkButton'
import { sosGame } from './sosGame-sidecar'

export const DevTools = () => {
  return (
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
  )
}
