import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import countryBookMarkReducer from './reducer/countryBookMarkReducer'

const store = createStore(
  countryBookMarkReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)

export default store
