import React from 'react'

import '../../assets/scss/components/container.scss'

const Container = ({ children }) => {
  return <div className='container container--maxWidth'>{children}</div>
}

export default Container
