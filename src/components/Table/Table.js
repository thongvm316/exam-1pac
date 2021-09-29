import React from 'react'

import Dropdown from '../Dropdown/Dropdown'

import '../../assets/scss/components/table.scss'

const Row = ({ row, index }) => {
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <tr>
      <td>
        <Checkbox />
      </td>
      <td>{index + 1}</td>
      <td>{row?.Country}</td>
      <td>{row && formatNumber(row?.TotalConfirmed)}</td>
    </tr>
  )
}

const Checkbox = () => {
  const [checkbox, setCheckbox] = React.useState(false)

  const handleCheckbox = (e) => {
    setCheckbox(e.target.checked)
  }

  return (
    <>
      <input type='checkbox' checked={checkbox} onChange={handleCheckbox} />
    </>
  )
}

const Table = ({ rows }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>No</th>
          <th>Country</th>
          <th>
            <Dropdown />
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          return <Row row={row} index={i} key={i} />
        })}
      </tbody>
    </table>
  )
}

export default Table
