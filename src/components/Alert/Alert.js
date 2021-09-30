import React from 'react'

import '../../assets/scss/components/alert.scss'

const Alert = ({ setAlertOpen }) => {
  return (
    <div className='alert'>
      <div className='alert__container'>
        <div className='alert__title'>
          <h2>Warning!</h2>
        </div>
        <div className='alert__content'>
          <p>
            All TotalRecovered fields always return 0 from API, so I can't sort
            this rule, but I did sort function for this rule, whenever
            TotalRecovered has real value, we can sort and see data.
          </p>
        </div>
        <div className='alert__footer'>
          <button
            onClick={() => {
              setAlertOpen(false)
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default Alert
