import React from 'react'

import '../../assets/scss/components/dropdown.scss'

const Dropdown = () => {
  const [select, setSelect] = React.useState('TotalConfirmed')

  const handleChange = (e) => {
    setSelect(e.target.value)
  }

  return (
    <select className='dropdown' value={select} onChange={handleChange}>
      <option className='test' value='TotalConfirmed'>
        The most total confirmed cases
      </option>
      <option value='TotalDeaths'>The highest number of deaths</option>
      <option value='TotalRecovered'>
        The least number of recovered cases
      </option>
    </select>
  )
}

export default Dropdown
