import { combineReducers } from 'redux'
import counter, {CounterState} from './counter'
import hazard, {HazardState} from './hazard'
import user, {UserState} from './user'
import enterprise, {EnterpriseState} from './enterprise'

export default combineReducers({
  counter,
  hazard,
  user,
  enterprise
})



export interface RootState {
  counter: CounterState
  hazard: HazardState
  user: UserState
  enterprise: EnterpriseState
}
