import React from 'react'

import '../../assets/scss/components/dropdown.scss'

const Dropdown = ({ setSelect, select, setAlertOpen }) => {
  const handleChange = (e) => {
    setSelect(e.target.value)
    if (e.target.value === 'leastNumberOfRecovered') setAlertOpen(true)
  }

  return (
    <select className='dropdown' value={select} onChange={handleChange}>
      <option value='mostAffectCountries'>
        The most total confirmed cases
      </option>
      <option value='highestDeaths'>The highest number of deaths</option>
      <option value='leastNumberOfRecovered'>
        The least number of recovered cases
      </option>
    </select>
  )
}

export default Dropdown
