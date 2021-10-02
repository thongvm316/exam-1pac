import React from 'react'
import Dropdown from '../Dropdown/Dropdown'

import '../../assets/scss/components/table.scss'

const Row = ({
  row,
  index,
  select,
  addCountryBookMarkAction,
  removeCountryBookMarkAction,
  dispatch,
  setModalOpen,
  setCountryCode,
  setCountryName,
}) => {
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const renderTotals = (param) => {
    switch (param) {
      case 'mostAffectCountries':
        return formatNumber(row.TotalConfirmed)
      case 'highestDeaths':
        return formatNumber(row.TotalDeaths)
      case 'leastNumberOfRecovered':
        return formatNumber(row.TotalRecovered)
      default:
        break
    }
  }

  const handleClick = (e) => {
    setModalOpen(true)
    setCountryCode(row.CountryCode)
    setCountryName(row.Slug)
  }

  return (
    <tr>
      <td>
        <Checkbox
          row={row}
          addCountryBookMarkAction={addCountryBookMarkAction}
          removeCountryBookMarkAction={removeCountryBookMarkAction}
          dispatch={dispatch}
        />
      </td>
      <td>{index + 1}</td>
      <td onClick={handleClick}>{row?.Country}</td>
      <td>{renderTotals(select)}</td>
    </tr>
  )
}

const Checkbox = ({
  row,
  addCountryBookMarkAction,
  removeCountryBookMarkAction,
  dispatch,
}) => {
  const [checkbox, setCheckbox] = React.useState(false)

  const handleCheckbox = (e) => {
    const isChecked = e.target.checked
    setCheckbox(e.target.checked)
    isChecked
      ? dispatch(
          addCountryBookMarkAction({ id: row?.ID, country: row?.Country }),
        )
      : dispatch(removeCountryBookMarkAction(row?.ID))
  }

  return (
    <>
      <input type='checkbox' checked={checkbox} onChange={handleCheckbox} />
    </>
  )
}

const Table = ({
  rows,
  setSelect,
  select,
  addCountryBookMarkAction,
  removeCountryBookMarkAction,
  dispatch,
  setAlertOpen,
  setModalOpen,
  setCountryCode,
  setCountryName,
}) => {
  console.log(rows)

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>No</th>
            <th>Country</th>
            <th>
              <Dropdown
                setSelect={setSelect}
                select={select}
                setAlertOpen={setAlertOpen}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            return (
              <Row
                row={row}
                index={i}
                key={i}
                select={select}
                addCountryBookMarkAction={addCountryBookMarkAction}
                removeCountryBookMarkAction={removeCountryBookMarkAction}
                dispatch={dispatch}
                setModalOpen={setModalOpen}
                setCountryCode={setCountryCode}
                setCountryName={setCountryName}
              />
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table
