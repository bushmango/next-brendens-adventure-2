import { sosGame } from './sosGame-sidecar'

export const TurnCounter = () => {
  let state = sosGame.useSubscribe()

  return <div>Turn {state.turnNumber}</div>
}
