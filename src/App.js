import React from 'react'
import axios from 'axios'

import Container from './components/Container/Container'
import TotalConfirmed from './components/TotalConfirmed/TotalConfirmed'
import BookMarked from './components/BookMarked/BookMarked'
import Table from './components/Table/Table'
import Modal from './components/Modal/Modal'
import Spinner from './components/Spinner/Spinner'

import './App.scss'

const App = () => {
  const [data, setData] = React.useState({})
  const [mostAffectCountries, setMostAffectCountries] = React.useState([])
  const [modalOpen, setModalOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const { Global } = data

  const findIndicesOfMax = (inp, count) => {
    let outp = []
    for (let i = 0; i < inp.length; i++) {
      outp.push(i)
      if (outp.length > count) {
        outp.sort(function (a, b) {
          return inp[b] - inp[a]
        })
        outp.pop()
      }
    }
    return outp
  }

  const getMostAffectCountries = (data) => {
    const getTotalConfirmedCases = data.map((item, i) => item.TotalConfirmed)
    const indices = findIndicesOfMax(getTotalConfirmedCases, 15)
    const countries = []
    for (let i = 0; i < indices.length; i++) {
      countries.push(data[indices[i]])
    }

    return countries
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('https://api.covid19api.com/summary')
        setData(data)
        setMostAffectCountries(getMostAffectCountries(data?.Countries))
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
      {modalOpen && <Modal setOpenModal={setModalOpen} />}

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
                {' '}
                <TotalConfirmed
                  title='Confirmed Cases'
                  confirmed={Global ? Global.TotalConfirmed : 0}
                  className='total__detail'
                />
                <TotalConfirmed
                  title='Confirmed Deaths'
                  confirmed={Global ? Global.TotalDeaths : 0}
                  className='total__detail'
                />
                <TotalConfirmed
                  title='Total Recovered'
                  confirmed={Global ? Global.TotalRecovered : 0}
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
            <h4 className='list-countries__bookmarked-title'>
              Bookmark Country
            </h4>
            <div className='list-countries__bookmarked-list'>
              <BookMarked country='Korean' />
              <BookMarked country='VietNam' />
              <BookMarked country='Japan' />
              <BookMarked country='HongKong' />
            </div>
          </div>

          <div className='list-countries__table'>
            {loading ? (
              <Spinner className='list-countries__spinner' />
            ) : (
              <>
                {/* <Table rows={Countries ? Countries : []} /> */}
                <Table rows={mostAffectCountries} />
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
