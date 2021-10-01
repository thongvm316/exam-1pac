import React from 'react'
import axios from 'axios'
import moment from 'moment'
import queryString from 'query-string'

import Spinner from '../Spinner/Spinner'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import * as hcnd from 'highcharts/modules/no-data-to-display'

import '../../assets/scss/components/modal.scss'

const fakeData = {
  name: 'Germany',
  topLevelDomain: ['.de'],
  alpha2Code: 'DE',
  alpha3Code: 'DEU',
  callingCodes: ['49'],
  capital: 'Berlin',
  altSpellings: [
    'DE',
    'Federal Republic of Germany',
    'Bundesrepublik Deutschland',
  ],
  region: 'Europe',
  flag: 'https://flagcdn.com/w320/de.jpg',
}

hcnd(Highcharts)

const Modal = ({ setOpenModal, countryCode, countryName }) => {
  const [data, setData] = React.useState(fakeData)
  const [dataDetailCountry, setDataDetailCountry] = React.useState([])
  const [selectYear, setSelectYear] = React.useState('2021')
  const [loading, setLoading] = React.useState(true)
  const [loadingChart, setLoadingChart] = React.useState(false)

  const handleChangeSelect = (e) => {
    setSelectYear(e.target.value)
    setLoadingChart(true)
  }

  const options = React.useMemo(
    () => ({
      chart: {
        type: 'column',
      },
      title: {
        text: '',
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        crosshair: true,
      },
      tooltip: {
        shared: true,
      },
      yAxis: {
        title: {
          text: false,
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false,
          },
          enableMouseTracking: true,
          marker: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: 'Confirmed',
          data: dataDetailCountry.map((item) => item.Confirmed),
          color: '#FEB13B',
        },
        {
          name: 'Deaths',
          data: dataDetailCountry.map((item) => item.Deaths),
          color: '#e74c3c',
        },
        {
          name: 'Recovered',
          data: dataDetailCountry.map((item) => item.Recovered),
          color: '#27ae60',
        },
      ],
      lang: {
        noData: 'Can not get data because this API is broken',
      },
      noData: {
        style: {
          fontWeight: 'bold',
          fontSize: '15px',
          color: '#303030',
        },
      },
    }),
    [dataDetailCountry],
  )

  console.log(options)

  const formatConditionDate = (year, index) => {
    const format = `${year}-${index < 10 ? `0${index}` : index}`
    const endOfMonth = moment(format).endOf('month').format('DD')
    return `${format}-${endOfMonth}`
  } // eg: 2021-02-28

  const filterLastElOfEachMonth = (db) => {
    let arr = []

    const lastElOfData = db[db.length - 1]
    const currentMonth = parseInt(moment(lastElOfData['Date']).format('MM'))

    for (let index = 1; index <= currentMonth; index++) {
      const lastElOfEachMonth = db.find((item) => {
        const dateOfItem = moment(item['Date']).format('YYYY-MM-DD')
        const endOfDateInMonth = formatConditionDate(selectYear, index)

        if (index !== currentMonth) {
          return dateOfItem === endOfDateInMonth
        } else {
          return (
            dateOfItem === moment(lastElOfData['Date']).format('YYYY-MM-DD')
          )
        }
      })

      arr.push(lastElOfEachMonth)
    }

    return arr
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const url = `http://api.countrylayer.com/v2/alpha/${countryCode}?access_key=92835e4eeb6ba3f732cae29dabda6fed`
        const { data } = await axios.get(url)

        data[
          'flag'
        ] = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.jpg`
        setData(data)
      } catch (error) {
        setLoading(false)
        console.log(error.response)
      }
    }

    const getDetailCountrySituation = async () => {
      try {
        const currentYear = moment().format('YYYY')

        const startOfYearSelected = moment(selectYear)
          .startOf('year')
          .format('YYYY-MM-DD')
        const endOfYearSelected = moment(selectYear)
          .endOf('year')
          .format('YYYY-MM-DD')

        const currentDate = moment().format('YYYY-MM-DD')

        const params = {
          from: startOfYearSelected,
          to: selectYear === currentYear ? currentDate : endOfYearSelected,
        }

        const url = `https://api.covid19api.com/country/${countryName}?${queryString.stringify(
          params,
        )}`

        const { data } = await axios.get(url)
        setDataDetailCountry(filterLastElOfEachMonth(data))
        setLoading(false)
        setLoadingChart(false)
      } catch (error) {
        setLoading(false)
        setLoadingChart(false)
        console.log(error)
      }
    }

    // getData()
    getDetailCountrySituation()
  }, [selectYear])

  return (
    <div className='modal'>
      <div className='modal__container'>
        {loading ? (
          <Spinner className='modal__spinner' />
        ) : (
          <>
            <div className='modal__closeButton'>
              <button
                onClick={() => {
                  setOpenModal(false)
                }}
              >
                X
              </button>
            </div>

            <div className='modal__title'>
              <h1>{data?.name} Situation</h1>
            </div>

            <div className='modal__body'>
              <div className='modal__country-information'>
                <div className='modal__country-image'>
                  <img src={data?.flag} alt='country' />
                </div>

                <div className='modal__country-detail'>
                  <p>
                    Name: <span>{data?.name}</span>
                  </p>
                  <p>
                    Capital: <span>{data?.capital}</span>
                  </p>
                  <p>
                    Region: <span>{data?.region}</span>
                  </p>
                </div>
              </div>

              {loadingChart ? (
                <Spinner className='modal__spinner-chart' />
              ) : (
                <>
                  {' '}
                  <div className='modal__graph'>
                    <div className='modal__graph-title'>
                      <h4>Statistics</h4>
                      <select
                        className='modal__graph-dropdown'
                        value={selectYear}
                        onChange={handleChangeSelect}
                      >
                        <option value='2020'>2020</option>
                        <option value='2021'>2021</option>
                      </select>
                    </div>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={options}
                    />
                  </div>
                </>
              )}
            </div>

            <div className='modal__footer'>
              <button
                onClick={() => {
                  setOpenModal(false)
                }}
              >
                OK
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Modal
