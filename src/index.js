import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
import store from './redux/store'

const RootApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

ReactDOM.render(<RootApp />, document.getElementById('root'))

reportWebVitals()
