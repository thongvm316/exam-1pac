import { createStore } from 'redux'
import countryBookMarkReducer from './reducer/countryBookMarkReducer'

const store = createStore(countryBookMarkReducer)

export default store
