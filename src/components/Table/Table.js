import React from 'react'

import Dropdown from '../Dropdown/Dropdown'

import '../../assets/scss/components/table.scss'

const Row = ({ row: contact }) => {
  return (
    <tr>
      <td>
        <Checkbox />
      </td>
      <td>{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>{contact.phoneNumber}</td>
    </tr>
  )
}

const Checkbox = () => {
  return (
    <>
      <label class='container'>
        <input type='checkbox' />
        <span class='checkmark'></span>
      </label>
    </>
  )
}

const Table = ({ rows }) => {
  return (
    <div className='table'>
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
            return <Row row={row} key={i} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
