import React from 'react'

import Container from './components/Container/Container'
import TotalConfirmed from './components/TotalConfirmed/TotalConfirmed'
import BookMarked from './components/BookMarked/BookMarked'
import Table from './components/Table/Table'

import './App.scss'

const data = [
  {
    id: 1,
    fullName: 'Jenny Chan',
    address: '3 waterfoot road',
    phoneNumber: '333-962-7516',
    email: 'jenny.chan@email.com',
  },
  {
    id: 2,
    fullName: 'Jessica warren',
    address: '4 tall town',
    phoneNumber: '011-211-7516',
    email: 'jessica.warren@email.com',
  },
  {
    id: 3,
    fullName: 'Tony Frank',
    address: '11 lesly road',
    phoneNumber: '788-962-7516',
    email: 'tony.frank@email.com',
  },
  {
    id: 4,
    fullName: 'Jeremy Clark',
    address: '333 miltown manor',
    phoneNumber: '011-962-111',
    email: 'jeremy.clark@email.com',
  },
  {
    id: 5,
    fullName: 'Raymond Edwards',
    address: '99 blue acres',
    phoneNumber: '3231-962-7516',
    email: 'raymon.edwards@email.com',
  },
]

const App = () => {
  const [contacts, setContacts] = React.useState(data)

  return (
    <div className='home'>
      <header className='header'>
        <Container>
          <h1 className='header__main-title'>COVID-19 Dashboard</h1>
        </Container>
      </header>

      <div className='total'>
        <Container>
          <h2 className='total__title'>Global Situation</h2>

          <div className='total__summary'>
            <TotalConfirmed
              title='Confirmed Cases'
              confirmed={7000000}
              className='total__detail'
            />
            <TotalConfirmed
              title='Confirmed Deaths'
              confirmed={49000000}
              className='total__detail'
            />
            <TotalConfirmed
              title='Total Recovered'
              confirmed={7000000}
              className='total__detail'
            />
          </div>
        </Container>
      </div>

      <div className='list-countries'>
        <Container>
          <h2 className='list-countries__title'>
            List of countries which are most affected by Covid- 19
          </h2>

          <div className='list-countries__bookmarked'>
            <h4 className='list-countries__bookmarked-title'>
              Bookmark Country:
            </h4>
            <div className='list-countries__bookmarked-list'>
              <BookMarked country='Korean' />
              <BookMarked country='VietNam' />
              <BookMarked country='Japan' />
              <BookMarked country='HongKong' />
            </div>
          </div>

          <div className='list-countries__table'>
            <Table rows={contacts} />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default App
