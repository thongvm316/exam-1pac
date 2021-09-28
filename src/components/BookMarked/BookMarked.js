import React from 'react'

import '../../assets/scss/components/bookmarked.scss'

const BookMarked = ({ country }) => {
  return (
    <p className='bookmarked'>
      {country}&nbsp;&nbsp;&nbsp;
      <span>x</span>
    </p>
  )
}

export default BookMarked
