import React from 'react'

import '../../assets/scss/components/total-confirmed.scss'

const TotalConfirmed = (props) => {
  const { title, confirmed, className } = props

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <div className={className}>
      <h4>{title}</h4>
      <p>{formatNumber(confirmed)}</p>
    </div>
  )
}

export default TotalConfirmed
