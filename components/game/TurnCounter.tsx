import { sosGame } from './sosGame-sidecar'

export const TurnCounter = () => {
  let state = sosGame.useSubscribe()
  
  return <div>Turn {state.turnNumber + 1} | Day {state.day}| hour {state.hour}</div>
  
}
