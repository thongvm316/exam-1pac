import React from 'react'

import SpinnerImg from '../../assets/img/Spinner.gif'

const Spinner = ({ className }) => {
  return (
    <div className={className}>
      <img width='50' height='50' src={SpinnerImg} alt='spinner' />
    </div>
  )
}

export default Spinner
