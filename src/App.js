import React from 'react'
import axios from 'axios'

import Container from './components/Container/Container'
import TotalConfirmed from './components/TotalConfirmed/TotalConfirmed'
import BookMarked from './components/BookMarked/BookMarked'
import Table from './components/Table/Table'
import Spinner from './components/Spinner/Spinner'
import Alert from './components/Alert/Alert'
import Modal from './components/Modal/Modal'

import { useDispatch, useSelector } from 'react-redux'
import {
  addCountryBookMarkAction,
  removeCountryBookMarkAction,
} from './redux/action/countryBookMarkAction'

import './App.scss'

const App = () => {
  const dispatch = useDispatch()
  const { countryBookMark } = useSelector((state) => state)

  const [modalOpen, setModalOpen] = React.useState(false)
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [countryCode, setCountryCode] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [select, setSelect] = React.useState('mostAffectCountries')
  const [data, setData] = React.useState({
    globalSituation: null,
    mostAffectCountries: [],
    highestDeaths: [],
    leastNumberOfRecovered: [],
  })
  const { globalSituation } = data

  const filterDataByRules = (db, property, key) => {
    let filterData
    if (key === 'leastNumberOfRecovered') {
      filterData = db.sort((a, b) => a[property] - b[property]).slice(0, 15)
    } else {
      filterData = db.sort((a, b) => b[property] - a[property]).slice(0, 15)
    }

    setData((prev) => ({ ...prev, [key]: filterData }))
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data: summary } = await axios.get(
          'https://api.covid19api.com/summary',
        )
        setData({ ...data, globalSituation: summary.Global })
        filterDataByRules(
          summary.Countries,
          'TotalConfirmed',
          'mostAffectCountries',
        )
        filterDataByRules(summary.Countries, 'TotalDeaths', 'highestDeaths')
        filterDataByRules(
          summary.Countries,
          'TotalRecovered',
          'leastNumberOfRecovered',
        )
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error.response)
      }
    }

    getData()
  }, [])

  return (
    <div className='home'>
      {modalOpen && (
        <Modal countryCode={countryCode} setOpenModal={setModalOpen} />
      )}
      {alertOpen && <Alert setAlertOpen={setAlertOpen} />}

      <header className='header'>
        <Container>
          <h1 className='header__main-title'>COVID-19 Dashboard</h1>
        </Container>
      </header>

      <div className='total'>
        <Container>
          <h2 className='total__title'>Global Situation</h2>

          <div className='total__summary'>
            {loading ? (
              <Spinner className='total__spinner' />
            ) : (
              <>
                <TotalConfirmed
                  title='Confirmed Cases'
                  confirmed={
                    globalSituation ? globalSituation?.TotalConfirmed : 0
                  }
                  className='total__detail'
                />
                <TotalConfirmed
                  title='Confirmed Deaths'
                  confirmed={globalSituation ? globalSituation?.TotalDeaths : 0}
                  className='total__detail'
                />
                <TotalConfirmed
                  title='Total Recovered'
                  confirmed={
                    globalSituation ? globalSituation?.TotalRecovered : 0
                  }
                  className='total__detail'
                />
              </>
            )}
          </div>
        </Container>
      </div>

      <div className='list-countries'>
        <Container>
          <h2 className='list-countries__title'>Most-affected countries</h2>

          <div className='list-countries__bookmarked'>
            <div className='list-countries__bookmarked-list'>
              {countryBookMark.map((item, i) => (
                <BookMarked key={i} country={item.country} />
              ))}
            </div>
          </div>

          <div className='list-countries__table'>
            {loading ? (
              <Spinner className='list-countries__spinner' />
            ) : (
              <>
                <Table
                  rows={data[select]}
                  setSelect={setSelect}
                  select={select}
                  dispatch={dispatch}
                  addCountryBookMarkAction={addCountryBookMarkAction}
                  removeCountryBookMarkAction={removeCountryBookMarkAction}
                  setAlertOpen={setAlertOpen}
                  setModalOpen={setModalOpen}
                  setCountryCode={setCountryCode}
                />
              </>
            )}

            {/* <button
              className='openModalBtn'
              onClick={() => {
                setModalOpen(true)
              }}
            >
              Open
            </button> */}
          </div>
        </Container>
      </div>
    </div>
  )
}

export default App
